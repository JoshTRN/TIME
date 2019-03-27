var path = require("path");
var db = require("../models");

module.exports = function(app) {
   app.get("/", function(req, res) {
      if (req.session.user) {
         res.redirect("/tasks");
      } else {
         res.sendFile(path.join(__dirname, "../public/hazmathub-signup.html"));
      }
   });

   app.get("/logout", function(req, res) {
      req.session.destroy(function(err) {
         res.redirect("/");
      });
   });

   app.get("/tasks/completed", function(req, res) {
      if (req.session.user) {
         db.Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
               UserUsername: req.session.user,
               completed: true
            },
            group: "category"
         }).then(function(result) {
            res.json(result);
         });
      }
   });

   app.post("/api/users", function(req, res) {
      const username = req.body.user;

      db.User.findAndCountAll({
         where: {
            username
         }
      }).then(function(result) {
         if (result.count != 0) {
            console.log("User exists");
         } else {
            console.log("creating user");
            db.User.create({
               username,
               picURL: req.body.picURL
            });
         }

         req.session.user = username;
         res.send(200);
      });
   });

   app.post("/api/tasks", function(req, res) {
      db.Tasks.create({
         category: req.body.category,
         taskName: req.body.name,
         description: req.body.description,
         start: req.body.start,
         duration: req.body.duration,
         UserUsername: req.session.user
      });
   });

   app.get("/tasks", function(req, res) {
      if (!req.session.user) {
         res.redirect("/");
      }

      let photo,
         countList = [],
         categoryList = [];

      db.User.findOne({
         where: {
            username: req.session.user
         }
      }).then(function(info) {
         photo = info.dataValues.picURL;
      });

      db.Tasks.findAndCountAll({
         attributes: ["category"],
         where: {
            UserUsername: req.session.user
         },
         group: "category"
      }).then(function(result) {
         for (var i = 0; i < result.rows.length; i++) {
            categoryList.push(result.rows[i].dataValues.category);
            countList.push(result.count[i].count);
         }
      });

      db.Tasks.findAll({
         where: {
            UserUsername: req.session.user
         }
      }).then(function(data) {
         res.render("index", {
            data: data,
            helpers: {
               photo,
               countList,
               categoryList
            }
         });
      });
   });

   app.delete("/tasks/delete/:id", function(req, res) {
      if (req.session.user) {
         db.Tasks.destroy({
            where: {
               id: req.params.id,
               UserUsername: req.session.user
            }
         });
      }
   });

   app.put("/tasks/update/:id", function(req, res) {
      if (req.session.user) {
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
      }
   });
};
