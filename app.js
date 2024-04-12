const express = require("express");
const app = express();
const routerApp = require('./src/routes/index')

const appid = process.env.APPID || 3000

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(routerApp)

app.listen(appid, (req, res) => {
  console.log("listening on", appid);
});
