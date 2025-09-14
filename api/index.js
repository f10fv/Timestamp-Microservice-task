// // api/index.js - Handle requests to /api/ (empty date parameter)
// export default function handler(req, res) {
//     // Set CORS headers
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//         return;
//     }

//     try {
//         // Return current time when no date parameter is provided
//         const currentTime = new Date();
        
//         res.status(200).json({
//             unix: currentTime.getTime(),
//             utc: currentTime.toUTCString()
//         });

//     } catch (error) {
//         res.status(200).json({ error: "Invalid Date" });
//     }
// }

// api/index.js - Handle requests to /api/ (empty date parameter)
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only handle GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        // Always return current time for /api/ endpoint
        const currentTime = new Date();
        
        const response = {
            unix: currentTime.getTime(),
            utc: currentTime.toUTCString()
        };
        
        res.status(200).json(response);

    } catch (error) {
        res.status(200).json({ error: "Invalid Date" });
    }
}