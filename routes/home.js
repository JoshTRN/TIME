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

    app.get("/:username/tasks/completed", function (req, res) {
        if (req.session.user === req.params.username) {
            var countList = [],
                categoryList = [];

            db.Tasks.findAndCountAll({
                attributes: ['category'],
                where: {
                    UserUsername: req.session.user,
                    completed: true
                },
                group: 'category'
            }).then(function (result) {
                res.json(result)
            })
        }
    });

    app.get("/:username/tasks/all", function (req, res) {
        if (req.session.user === req.params.username) {
            var countList = [],
                categoryList = [];

            db.Tasks.findAndCountAll({
                attributes: ['category'],
                where: {
                    UserUsername: req.session.user
                },
                group: 'category'
            }).then(function (result) {
                res.json(result)
            })
        }
    });

    app.get("/:username/tasks/incomplete", function (req, res) {
        if (req.session.user === req.params.username) {
            var countList = [],
                categoryList = [];

            db.Tasks.findAndCountAll({
                attributes: ['category'],
                where: {
                    UserUsername: req.session.user,
                    completed: false
                },
                group: 'category'
            }).then(function (result) {
                res.json(result)
            })
        }
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
            countList = [],
            categoryList = [];

            db.User.findOne({
                where: {
                    username: req.session.user
                }
            }).then(function (info) {
                console.log(info.dataValues.picURL);
                photo = info.dataValues.picURL
            })

            db.Tasks.findAndCountAll({
                attributes: ['category'],
                where: {
                    UserUsername: req.session.user
                },
                group: 'category'
            }).then(function (result) {
                for (var i = 0; i < result.rows.length; i++) {
                    categoryList.push(result.rows[i].dataValues.category);
                    countList.push(result.count[i].count);
                }
                console.log(categoryList);
                console.log(countList);
            })

            db.Tasks.findAll({
                where: {
                    UserUsername: req.params.username
                }
            }).then(function (data) {
                res.render('index', {
                    data: data,
                    helpers: {
                        photo: photo,
                        countList: countList,
                        categoryList: categoryList
                    }
                })
            });
        } else {
            res.redirect('/');
        }
    })

    app.delete('/:username/tasks/delete/:id', function (req, res) {
        db.Tasks.destroy({
            where: {
                id: req.params.id
            }
        })
    })

    app.put("/tasks/update/:id", function (req, res) {

        db.Tasks.update({
            completed: true
        }, {
                where: {
                    id: req.params.id
                }
            })
    })
}