const fs = require('fs');
const path = require('path');

const logReqResponceMiddleware =  (req, res, next)=>{

    // Define the folder name and file name
const folderName = 'logs';
const fileName = 'service.txt';

// Create the folder if it doesn't exist
const folderPath = path.join(__dirname, folderName);
const filePath = path.join(folderPath, fileName);

fs.mkdirSync(folderPath, { recursive: true }); // Synchronous to ensure it's ready

// Logging Middleware
    const originalSend = res.send;
    res.send = function (body) {
        const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Response: ${typeof body === 'object' ? JSON.stringify(body) : body}\n`;

        const folderPath = path.join(__dirname, 'logs');
        const filePath = path.join(folderPath, 'service.txt');

        // Check if the folder exists; create if it doesn't
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Append the log to the file
        try {
            fs.appendFileSync(filePath, logMessage);
        } catch (err) {
            console.error('Error writing to log file:', err);
        }

        originalSend.call(this, body);
    };
    next();
}

module.exports = {
    logReqResponceMiddleware,
}