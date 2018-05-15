var path = require('path');
var db = require('../models');

module.exports = function (app) {

    app.get("/", function (req, res) {
        if (req.session.user) {
            res.redirect('/home')
        } else {
            res.sendFile(path.join(__dirname, "../public/hazmathub-signup.html"));
        }
    });

    app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        })
    });

    app.get("/home", function (req, res) {
        db.Tasks.findAll({}).then(function(result){
            console.log(result);
            res.json(result);
        })
    });

    app.post("/api/users", function (req, res) {
        var username = req.body.user
        db.User.findAndCountAll({
            where: {
                username: username
            }
        }).then(function (result) {
            if (result.count != 0) {
                console.log('User exists')
            } else {
                console.log('creating user')
                db.User.create({
                    username: username
                });
            }
        });


        req.session.user = req.body.user
        res.send(200);
    });
}