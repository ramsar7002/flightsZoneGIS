var express = require("express");
var router = express.Router();
const app = express();
const cors = require("cors");

const data = require("../data/cities.json"); // path of your json file\
app.use(function (req, res, next) {
  res.render("index", { title: "Blog", message: "fd" });
  console.log(data);

  next();
});

/* GET home page. */
router.get("/:cityName", function (req, res, next) {
  const data = require("../data/cities.json");
  let result = data.streets.filter((d) =>
    d.city_name.includes(req.params.cityName)
  );
  console.log(result);
  const cities = [];
  result.forEach((res) => {
    if (!cities.includes(res.city_name)) cities.push(res.city_name);
  });

  if (cities) {
    res.status(200).send(cities);
  } else {
    res.status(200).send("not found");
  }
});

module.exports = router;
