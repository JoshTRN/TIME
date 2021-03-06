const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
    if (!req.session.user) {
        res.sendFile(path.join(__dirname, "../public/hazmathub-signup.html"));
        return;
    }

    res.redirect("/tasks");
});

router.post("/api/users", (req, res) => {
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

router.post("/api/tasks", validator, (req, res) => {
    const { category, name: taskName, description, start, duration } = req.body;

    db.Tasks.create({
        category,
        taskName,
        description,
        start,
        duration,
        UserUsername: req.session.user
    });
});

router.post("/logout", (req, res) =>
    req.session.destroy(err => res.redirect("/"))
);

function validator(req, res, next) {
    if (!req.session.user) {
        res.redirect("/");
        return;
    }
    next();
}

module.exports = router;
