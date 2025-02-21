const express = require('express');

const app = express(); // new(web server) expressjs application

const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle Auth Middleware for all GET, POST, PUT, DELETE
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
    res.send("User logged in successfully");
});

app.get("/user/data", userAuth, (req, res) => {
    res.send("User Data Sent");
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
})

app.listen(1234, () => {
    console.log("Server is successfully listening http://localhost:1234");
});