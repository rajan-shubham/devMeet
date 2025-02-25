const express = require('express');
const connectDB = require("./config/database");
const app = express(); // new(web server) expressjs application

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(1234, () => {
        console.log("Server is successfully listening http://localhost:1234");
    });
}).catch(err => {
    console.error("Database NOT connected");
})
