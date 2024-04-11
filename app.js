const express = require("express");
const app = express();
const routerApp = require('./src/routes/index')

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(routerApp)

app.listen(3000, (req, res) => {
  console.log("listening on", 3000);
});
