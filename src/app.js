const express = require('express');
const connectDB = require("./config/database");
const User = require('./models/user');
const app = express(); // new(web server) expressjs application
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        // Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password } = req.body;

        // Encrypt the Password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // Create a JWT Token
            const token = await user.getJWT();

            // Add the token to cookie and send the respose back to the user
            res.cookie("tokenShubham", token, {expires: new Date(Date.now() + 8 * 3600000)});
            res.send("Login Successful");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// Requesting to view own profile
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    // Sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstName + " sent the connection request!");
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(1234, () => {
        console.log("Server is successfully listening http://localhost:1234");
    });
}).catch(err => {
    console.error("Database NOT connected");
})
