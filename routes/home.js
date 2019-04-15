const path = require("path");
const db = require("../models");

module.exports = app => {
    app.get("/", (req, res) => {
        if (!req.session.user) {
            res.sendFile(
                path.join(__dirname, "../public/hazmathub-signup.html")
            );
            return;
        }

        res.redirect("/tasks");
    });

    app.get("/tasks", validator, async (req, res) => {
        const { user: username } = req.session;

        const photo = await db.User.findOne({
            where: {
                username
            }
        });

       const data =  await db.Tasks.findAll({
            where: {
                UserUsername: req.session.user
            }
        });

        res.render("index", {
            data,
            helpers: {
                photo: photo.dataValues.picURL
            }
        });
    });

    app.get("/tasks/completed", validator, (req, res) => {
        db.Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
                UserUsername: req.session.user,
                completed: true
            },
            group: "category"
        }).then(result => res.json(result));
    });

    app.get("/tasks/all", validator, (req, res) => {
        db.Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
                UserUsername: req.session.user
            },
            group: "category"
        }).then(result => res.json(result));
    });

    app.get("/tasks/incomplete", validator, (req, res) => {
        db.Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
                UserUsername: req.session.user,
                completed: false
            },
            group: "category"
        }).then(result => res.json(result));
    });

    app.post("/api/users", (req, res) => {
        const { user: username, picURL } = req.body;

        db.User.findAndCountAll({
            where: {
                username
            }
        }).then(result => {
            if (!result.count != 0) {
                db.User.create({
                    username,
                    picURL
                });
                return;
            }

            req.session.user = username;
            res.send(200);
        });
    });

    app.post("/api/tasks", validator, (req, res) => {
        const {
            category,
            name: taskName,
            description,
            start,
            duration
        } = req.body;

        db.Tasks.create({
            category,
            taskName,
            description,
            start,
            duration,
            UserUsername: req.session.user
        });
    });

    app.post("/logout", (req, res) =>
        req.session.destroy(err => res.redirect("/"))
    );

    app.put("/tasks/update/:id", validator, (req, res) => {
        db.Tasks.update(
            {
                completed: true
            },
            {
                where: {
                    id: req.params.id,
                    UserUsername: req.session.user
                }
            }
        );
    });

    app.delete("/tasks/delete/:id", validator, (req, res) => {
        db.Tasks.destroy({
            where: {
                id: req.params.id,
                UserUsername: req.session.user
            }
        });
    });
};

function validator(req, res, next) {
    if (!req.session.user) {
        console.log("user must log in");
        res.redirect("/");
        return;
    }
    next();
}
