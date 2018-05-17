var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
var exphbs = require("express-handlebars");
var db = require("./models");

console.log('this')

var app = express();
var PORT = process.env.PORT || 8080;

// var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static(__dirname + '/public'));

//session for verification
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes/home.js')(app);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on http://localhost:" + PORT);
    });
  });