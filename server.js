const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice Running");
});

// API route
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  // If no parameter, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // If numeric string, parse as Unix timestamp
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
