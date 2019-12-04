const express = require("express");
const orm = require("./config/orm.js");
const routes = require('./routes')
const PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
let app = express();
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//declares primary template language and primary view
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//links express to routes
app.use(routes);

//callback listening for port connection, once made, logs connection port
app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});