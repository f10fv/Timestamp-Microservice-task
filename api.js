// api.js - Handle requests to /api (no trailing slash, no parameters)
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
        // Return current time - this is for the empty parameter test
        const now = new Date();
        
        res.status(200).json({
            unix: now.getTime(),
            utc: now.toUTCString()
        });

    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}