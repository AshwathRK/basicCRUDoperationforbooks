const { log } = require('console');
const express = require('express');
require("./db");
const HTTP_SERVER = express();
const { logReqResponceMiddleware } = require('./Middlewares/loging');
const booksRouter = require('./Router/router.books');
const path = require('path');

HTTP_SERVER.use(express.json()); // Enables JSON body parsing
HTTP_SERVER.use(logReqResponceMiddleware); // Log Middleware
HTTP_SERVER.use('/', booksRouter)

HTTP_SERVER.use('/home', (req, res, next)=>{
    res.sendFile(path.resolve('./home'))
})


// Start server
HTTP_SERVER.listen(3000, (err) => {
    if (err) {
        console.error('Server Error:', err);
    } else {
        console.log('Service started at port 3000');
    }
});
