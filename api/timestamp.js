// api/timestamp.js - Alternative endpoint for current timestamp
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
        const currentTime = new Date();
        
        res.status(200).json({
            unix: currentTime.getTime(),
            utc: currentTime.toUTCString()
        });

    } catch (error) {
        res.status(200).json({ error: "Invalid Date" });
    }
}