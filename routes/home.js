var path = require('path');
var db = require('../models');

module.exports = function (app) {

    app.get("/", function (req, res) {
        console.log(req.session.user)
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
            res.sendFile(path.join(__dirname, '../public/cuto-portal.html'));
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

        app.post('/api/tasks', function( req, res) {

            db.Tasks.create({
                category: req.body.category,
                taskName: req.body.name,
                description: req.body.description,
                start: req.body.start,
                duration: req.body.duration
            })
        });


        app.get('/:username/tasks', function(req, res) {
            console.log(req.body)
            res.send('hi');
        }) 

        req.session.user = req.body.user
        res.send(200);
    });

}