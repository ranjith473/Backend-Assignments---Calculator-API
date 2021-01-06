const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// your code goes here
app.post("/add", (req, res) => {
  const obj1 = {
    status: "",
    message: "",
    sum: 0
  };
  if (
    typeof req.body.num1 === "string" ||
    req.body.num1 instanceof String ||
    typeof req.body.num2 === "string" ||
    req.body.num2 instanceof String
  ) {
    obj1.status = "error";
    obj1.message = "Invalid data types";
  } else {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    if (isNaN(num1) || isNaN(num2)) {
      obj1.status = "error";
      obj1.message = "Invalid data type";
    } else {
      let result = num1 + num2;
      if (num1 < -1000000 || num2 < -1000000 || result < -1000000) {
        obj1.status = "error";
        obj1.message = "Underflow";
      } else if (num1 > 1000000 || num2 > 1000000 || result > 1000000) {
        obj1.status = "error";
        obj1.message = "Overflow";
      } else {
        obj1.status = "success";
        obj1.message = "the sum of given two numbers";
        obj1.sum = result;
      }
    }
  }

  res.send(obj1);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
