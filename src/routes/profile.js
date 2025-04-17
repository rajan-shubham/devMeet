const express = require('express');
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

// Requesting to view own profile
router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, Your Profile Updated Successfully`,
            data: loggedInUser,
        })
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

router.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (currentPassword == null || newPassword == null) throw new Error("Both fields are Mandatory");
        const loggedInUser = req.user;
        const isPasswordValid = await loggedInUser.validatePassword(currentPassword);
        if (isPasswordValid) {
            if (!validator.isStrongPassword(newPassword)) {
                throw new Error("New password is not strong enough. It should include at least 1 lowercase, 1 uppercase, 1 number, 1 symbol and be at least 8 characters long.");

            }
            const passwordHash = await bcrypt.hash(newPassword, 10);

            loggedInUser.password = passwordHash; 

            await loggedInUser.save();
            res.json({
                message: `${loggedInUser.firstName}, Your Password Updated Successfully`,
                data: loggedInUser,
            })
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = router;