const fs = require("fs");
const csv = require("csv-parser");
const randomWords = require("random-words");
const users = [];

const createStream = async () => {
  let user;
  fs.createReadStream("./flights.csv")
    .pipe(csv())
    .on("data", function (row) {
      user = {
        name: row.name || " ",
        description: row.description || " ",
        tessellate: row.tessellate || " ",
        wkt: row.WKT || " ",
      };

      user.wkt = JSON.parse(
        `[${user.wkt
          .replaceAll("(", "")
          .split(",")
          .map((item) => item.trim())
          .map((item) => `[${item}]`)
          .map((item) => item.replaceAll(" ", ","))}]`
      );
      user.wkt = user.wkt.map((item) => {
        item.splice(0, 2);
      });
      fs.appendFile("datfa.json", JSON.stringify(user), function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
};

const func = async () => {
  await createStream();
};
func();
