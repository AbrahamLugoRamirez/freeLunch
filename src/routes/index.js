const express = require("express");
const { run } = require("../controllers/app");
const router = express.Router();
const lunchController = require('../controllers/lunch')

router.get("/", lunchController.mostrar);

router.post("/kitchen", lunchController.kitchen);


module.exports = router;
