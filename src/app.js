const express = require('express');
const connectDB = require("./config/database");
const User = require('./models/user');
const app = express(); // new(web server) expressjs application

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "sonali",
        lastName: "kumari",
        emailId: "axplusby",
        password: "pass",
        age: 18,
        gender: "female",
    }
    const user = new User(userObj);
    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error in saving the user:" + err.message);
    }
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(1234, () => {
        console.log("Server is successfully listening http://localhost:1234");
    });
}).catch(err => {
    console.error("Database NOT connected");
})
