const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/timestamp", (req, res) => {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get("/api/timestamp/:date", (req, res) => {
  const dateParam = req.params.date;

  let dateObj;
  if (/^\d+$/.test(dateParam)) {
    const intVal = Number(dateParam);
    dateObj = new Date(intVal);
  } else {
    dateObj = new Date(dateParam);
  }

  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Timestamp Microservice running on port ${PORT}`);
});
