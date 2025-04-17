const express = require('express');
const router = express.Router();
const { userAuth } = require("../middlewares/auth");

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    // Sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstName + " sent the connection request!");
});

module.exports = router;