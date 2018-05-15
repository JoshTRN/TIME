var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
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
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

require('./routes/home.js')(app);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on http://localhost:" + PORT);
    });
  });