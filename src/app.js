const express = require('express');

const app = express(); // new(web server) expressjs application

app.use("/dashboard", (req, res) => {
    res.send("Server Dashboard");
});

app.use("/hello", (req, res) => {
    res.send("Hello from SERVER");
});

app.use("/", (req, res) => {
    res.send("Hello from Rajan!");
});

app.listen(1234, () => {
    console.log("Server is successfully listening http://localhost:1234");
});