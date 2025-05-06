const { log } = require('console');
const express = require('express');
const HTTP_SERVER = express();
const { logReqResponceMiddleware } = require('./Middlewares/loging');
const booksRouter = require('./Router/router.books')

HTTP_SERVER.use(express.json()); // Enables JSON body parsing
HTTP_SERVER.use(logReqResponceMiddleware); // Log Middleware
HTTP_SERVER.use('/', booksRouter)


// Start server
HTTP_SERVER.listen(3000, (err) => {
    if (err) {
        console.error('Server Error:', err);
    } else {
        console.log('Service started at port 3000');
    }
});
