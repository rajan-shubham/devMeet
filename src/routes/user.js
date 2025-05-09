const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequests = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "about", "skills"];

// Get all the pending connection requests for the loggedIn user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequests.find({ toUserId: loggedInUser._id, status: "interested" }).populate("fromUserId", USER_SAFE_DATA);
        res.json({
            message: "Pending Connection Requests",
            data: connectionRequests,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        // aman => rajan => accepted
        // rajan => sonali => accepted
        const connectionRequests = await ConnectionRequests.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ message: "Your Connections", data });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequest = await ConnectionRequests.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ],
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        // console.log(hideUsersFromFeed);

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({ message: "Your Feed", data: users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = userRouter;