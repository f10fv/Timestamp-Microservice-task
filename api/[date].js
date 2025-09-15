// api/[date].js - Handle all API requests including empty parameters
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        // Get the date parameter from the URL
        let { date } = req.query;
        
        // Handle various empty parameter cases
        if (!date || 
            date === '' || 
            date === 'undefined' || 
            date === 'null' ||
            (Array.isArray(date) && date.length === 0) ||
            (Array.isArray(date) && date[0] === '')) {
            
            // Return current time for empty parameter
            const now = new Date();
            return res.status(200).json({
                unix: now.getTime(),
                utc: now.toUTCString()
            });
        }

        // If date is an array, take the first element
        if (Array.isArray(date)) {
            date = date[0];
        }

        let inputDate;

        // Check if it's a Unix timestamp (all digits, possibly negative)
        if (/^-?\d+$/.test(date.toString().trim())) {
            const timestamp = parseInt(date.toString().trim());
            inputDate = new Date(timestamp);
        } else {
            // Try to parse as date string
            inputDate = new Date(date.toString().trim());
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