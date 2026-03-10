const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body


// app.get(path, function(req,res))
app.get("/", function (req, res) {
  res.send("Welcome to our Hotel");
});


// Importing the router files
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// Importing the router files
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);

// Room number of our building
// is telling us that at 3000 our server is active.
// a arrow function with message
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
