const express = require("express");
const router = express.Router();
const lunchController = require('../../server/controllers/lunch')

router.get("/", lunchController.show);

router.get("/kitchen", lunchController.kitchen);


module.exports = router;
