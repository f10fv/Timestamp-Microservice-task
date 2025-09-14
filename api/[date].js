// api/[date].js - Vercel serverless function
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Get the date parameter from the URL
        const { date } = req.query;
        let inputDate;

        // If no date parameter provided, return current time
        if (!date || date.length === 0) {
            inputDate = new Date();
        } else {
            // Check if it's a Unix timestamp (all digits)
            if (/^\d+$/.test(date)) {
                const timestamp = parseInt(date);
                inputDate = new Date(timestamp);
            } else {
                // Try to parse as date string
                inputDate = new Date(date);
            }
        }

        // Check if the date is valid
        if (isNaN(inputDate.getTime())) {
            return res.status(200).json({ error: "Invalid Date" });
        }

        // Return the response with unix timestamp and UTC string
        res.status(200).json({
            unix: inputDate.getTime(),
            utc: inputDate.toUTCString()
        });

    } catch (error) {
        // Handle any parsing errors
        res.status(200).json({ error: "Invalid Date" });
    }
}