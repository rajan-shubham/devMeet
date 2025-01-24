const express = require('express');

const app = express(); // new(web server) expressjs application

// GET /users => middleware chain => request handler

app.use("/", (req, res, next) => {
    // res.send("Handeling / route"); 
    next();
});

app.get("/user",
    (req, res, next) => {
        console.log("Handeling /user route"); 
        next();
    },
    (req, res, next) => {
        res.send("1st Route Handeler");
    }
);

app.listen(1234, () => {
    console.log("Server is successfully listening http://localhost:1234");
});