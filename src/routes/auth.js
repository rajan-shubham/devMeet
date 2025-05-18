const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
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

        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        res.cookie("tokenShubham", token, {expires: new Date(Date.now() + 8 * 3600000)})
        res.json({message : "User added successfully", data : savedUser});
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

router.post("/login", async (req, res) => {
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
            res.json(user);
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

router.post("/logout", async (req, res) => {
    res.cookie("tokenShubham", null, {expires: new Date(Date.now())});
    res.send("LogOut Successful");
});

module.exports = router;