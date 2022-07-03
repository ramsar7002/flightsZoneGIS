var express = require("express");
var router = express.Router();
const app = express();
const cors = require("cors");

const data = require("../data/cities.json"); // path of your json file\
app.use(function (req, res, next) {
  res.render("index", { title: "Blog", message: "fd" });

  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  const result = data.find((d) => d.city_name.includs(cityName));
  res.send("bla");
});

module.exports = router;
