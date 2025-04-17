const express = require('express');
const connectDB = require("./config/database");
const app = express(); // new(web server) expressjs application
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(1234, () => {
        console.log("Server is successfully listening http://localhost:1234");
    });
}).catch(err => {
    console.error("Database NOT connected");
})
