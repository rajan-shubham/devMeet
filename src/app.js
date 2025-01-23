const express = require('express');

const app = express(); // new(web server) expressjs application

app.use("/user",
    [
    (req, res, next) => { 
        console.log("Hadeling the route 1");
        next();
        // res.send("Response!!"); 
    },
    (req, res, next) => {
        console.log("Handeling the route 2!!");
        // res.send("2nd Response!!");
        next();
    },
    (req, res) => {
        console.log("Handeling the route 3!!");
        res.send("3rd Response!!");
    }
]
);

app.listen(1234, () => {
    console.log("Server is successfully listening http://localhost:1234");
});