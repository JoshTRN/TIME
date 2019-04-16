const router = require('express').Router();
const tasks = require('./tasks');

router.use('/tasks', validator, tasks);


function validator(req, res, next) {
    if (!req.session.user) {
        console.log("user must log in");
        res.redirect("/");
        return;
    }
    next();
}


module.exports = router