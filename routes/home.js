var path = require('path');

module.exports = function (app) {

    app.get("/", function (req, res) {
        if (req.session.user) {
            res.redirect('/home')
        } else {
            res.sendFile(path.join(__dirname, "../index.html"));
        }
    });

    app.get("/logout", function (req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        })
    });

    app.post("/api/users", function (req, res) {
        console.log(req.body.user);
        req.session.user = req.body.user
        res.send(200);
    });
}