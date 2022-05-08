const express = require("express");
const app = express();
const port = 3001;
const file = require("../src/data/data.json"); // path of your json file
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  console.log("dsd");
  res.json(file);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
