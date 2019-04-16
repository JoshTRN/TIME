module.exports = function validator(req, res, next) {
    if (!req.session.user) {
        res.redirect("/");
        return;
    }
    next();
};
