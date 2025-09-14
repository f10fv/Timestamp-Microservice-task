const express = require("express");
const app = express();

// Enable CORS for FCC testing
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running");
});

// API route
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // If no date provided, use current date
  let date = dateParam ? new Date(dateParam) : new Date();

  // If dateParam is a number string (unix timestamp), parse it as int
  if (dateParam && /^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
