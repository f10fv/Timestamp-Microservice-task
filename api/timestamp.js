export default function handler(req, res) {
  const { date } = req.query; // Vercel exposes path/query differently

  let dateObj;

  if (!date) {
    dateObj = new Date();
  } else if (/^\d+$/.test(date)) {
    dateObj = new Date(parseInt(date));
  } else {
    dateObj = new Date(date);
  }

  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
}
