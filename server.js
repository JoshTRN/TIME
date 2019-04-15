require('dotenv').config();

const bodyParser = require("body-parser"),
      express    = require("express"),
      session    = require("express-session"),
      exphbs     = require("express-handlebars"),
      path       = require('path'); 
      db         = require("./models");

const app  = express(),
      PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static(path.join(__dirname,"/public")));

//session for verification
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 600000 } }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/home.js")(app);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log(`App listening on http://localhost:${PORT}`);
    });
});