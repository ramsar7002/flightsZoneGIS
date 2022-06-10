var express = require("express");
var router = express.Router();
const app = express();
const cors = require("cors");

const file = require("../../client/src/data/data.json"); // path of your json file\
app.use(function (req, res, next) {
  res.render("index", { title: "Blog", message: "fd" });

  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(file);
});

module.exports = router;
