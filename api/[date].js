
// export default function handler(req, res) {
//     // Set CORS headers
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Content-Type', 'application/json');
    
//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//         return;
//     }

//     // Only handle GET requests
//     if (req.method !== 'GET') {
//         return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     try {
//         // Get the date parameter from the URL
//         const { date } = req.query;
//         let inputDate;

//         // If no date parameter provided or empty string, return current time
//         if (!date || date.trim() === '' || date === 'undefined') {
//             inputDate = new Date();
//         } else {
//             // Check if it's a Unix timestamp (all digits, possibly negative)
//             if (/^-?\d+$/.test(date.trim())) {
//                 const timestamp = parseInt(date.trim());
//                 inputDate = new Date(timestamp);
//             } else {
//                 // Try to parse as date string
//                 inputDate = new Date(date.trim());
//             }
//         }

//         // Check if the date is valid
//         if (isNaN(inputDate.getTime())) {
//             return res.status(200).json({ error: "Invalid Date" });
//         }

//         // Return the response with unix timestamp and UTC string
//         const response = {
//             unix: inputDate.getTime(),
//             utc: inputDate.toUTCString()
//         };
        
//         res.status(200).json(response);

//     } catch (error) {
//         // Handle any parsing errors
//         res.status(200).json({ error: "Invalid Date" });
//     }
// }

// api/[date].js - Vercel serverless function
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
        // Get the date parameter from the URL
        const { date } = req.query;
        let inputDate;

        // If no date parameter provided or empty string, return current time
        if (!date || date.trim() === '' || date === 'undefined') {
            inputDate = new Date();
        } else {
            // Check if it's a Unix timestamp (all digits, possibly negative)
            if (/^-?\d+$/.test(date.trim())) {
                const timestamp = parseInt(date.trim());
                inputDate = new Date(timestamp);
            } else {
                // Try to parse as date string
                inputDate = new Date(date.trim());
            }
        }

        // Check if the date is valid
        if (isNaN(inputDate.getTime())) {
            return res.status(200).json({ error: "Invalid Date" });
        }

        // Return the response with unix timestamp and UTC string
        const response = {
            unix: inputDate.getTime(),
            utc: inputDate.toUTCString()
        };
        
        res.status(200).json(response);

    } catch (error) {
        // Handle any parsing errors
        res.status(200).json({ error: "Invalid Date" });
    }
}