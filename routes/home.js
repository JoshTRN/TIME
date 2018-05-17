var path = require('path');
var db = require('../models');

module.exports = function (app) {

    app.get("/", function (req, res) {

        if (req.session.user) {
            res.redirect('/' + req.session.user + '/tasks')
        } else {
            res.sendFile(path.join(__dirname, "../public/hazmathub-signup.html"));
        }
    });

    app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
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
                    username: username,
                    picURL: req.body.picURL
                });
            }

            req.session.user = req.body.user
            res.send(200);

        });

    })

    app.post('/api/tasks', function (req, res) {

        db.Tasks.create({
            category: req.body.category,
            taskName: req.body.name,
            description: req.body.description,
            start: req.body.start,
            duration: req.body.duration,
            UserUsername: req.session.user
        })
    });


    app.get('/:username/tasks', function (req, res) {

        if (req.session.user === req.params.username) {

            var photo;

            db.User.findOne({
                where: {
                    username: req.session.user
                }
            }).then(function (info) {
                console.log(info.dataValues.picURL);
                photo = info.dataValues.picURL
            })

            db.Tasks.findAll({}).then(function (data) {
                res.render('index', {
                    data: data,
                    helpers: {
                        photo: photo
                    }
                })
            });
        } else {
            res.redirect('/');
        }
    })

    app.delete('/:username/tasks/delete/:id', function (req, res) {
        console.log('hitting')
        db.Tasks.destroy({
            where: {
                id: req.params.id
            }
        })
    })
}