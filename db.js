// db.js
const mongoose = require('mongoose');

const CONNECTION_URI = 'mongodb://localhost:27017/bookify';

mongoose.connect(CONNECTION_URI)
    .then(() => {
        console.log('MongoDB connection successful');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
