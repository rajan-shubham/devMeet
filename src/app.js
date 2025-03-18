const express = require('express');
const connectDB = require("./config/database");
const User = require('./models/user');
const app = express(); // new(web server) expressjs application

app.use(express.json());

app.post("/signup", async (req, res) => {
    // const userObj = {
    //     firstName: "rajan",
    //     lastName: "kumar",
    //     emailId: "axplusby",
    //     password: "pass",
    //     age: 18,
    //     gender: "male",
    // }
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error in saving the user:" + err.message);
    }
});

// get user by there email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0) {
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Sonething went wrong");
    }
});

// geed API GET /feed - get all the user form the database
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

// deleting a user by there id 
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send(user);
    }catch(err){
        res.status(400).send("User not found");
    }
})

// updating a user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "before"});
        console.log(user);
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("User not found");
    }
})

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(1234, () => {
        console.log("Server is successfully listening http://localhost:1234");
    });
}).catch(err => {
    console.error("Database NOT connected");
})
