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
    
    app.get("/logout", (req, res) => req.session.destroy(err => res.redirect("/")));
    
    app.get("/tasks", (req, res) => {
        const { user: username } = req.session;
        if (!username) {
            res.redirect("/");
            return;
        }
    
        let photo,
            countList = [],
            categoryList = [];
    
        db.User.findOne({
            where: {
                username
            }
        }).then(info => (photo = info.dataValues.picURL));
    
        db.Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
                UserUsername: username
            },
            group: "category"
        }).then(result => {
            categoryList = result.rows.map(item => item.dataValues.category);
            countList = result.count.map(item => item.count);
        });
    
        db.Tasks.findAll({
            where: {
                UserUsername: req.session.user
            }
        }).then(data => {
            res.render("index", {
                data,
                helpers: {
                    photo,
                    countList,
                    categoryList
                }
            });
        });
    });

    app.get("/tasks/completed", (req, res) => {
        if (!req.session.user) {
            return;
        }
        db.Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
                UserUsername: req.session.user,
                completed: true
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
                console.log("creating user");
                db.User.create({
                    username,
                    picURL
                });
            } else {
                console.log("User exists");
            }

            req.session.user = username;
            res.send(200);
        });
    });

    app.post("/api/tasks", (req, res) => {
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

    app.put("/tasks/update/:id", (req, res) => {
        if (!req.session.user) {
            return;
        }
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
        
    app.delete("/tasks/delete/:id", (req, res) => {
            if (!req.session.user) {
                return;
            }
            db.Tasks.destroy({
                where: {
                    id: req.params.id,
                    UserUsername: req.session.user
                }
            });
    });
    
};
