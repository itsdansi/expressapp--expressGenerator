var express = require("express");
var router = express.Router();

/* GET product data */
router.get("/", function (req, res, next) {
  res.send("Hello from about us page");
});

module.exports = router;
