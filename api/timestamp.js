const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

module.exports = app;
module.exports.handler = serverless(app);
