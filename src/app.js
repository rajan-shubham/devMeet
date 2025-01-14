const express = require('express');

const app = express(); // new(web server) expressjs application

// This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({ firstName: "Shubham", lastName: "Rajan" });
});

app.post("/user", (req, res) => { 
    // saving data to DB
    res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
    res.send("Data Deleted Successfully");
});

// this will match all the HTTP method calls to /test
app.use("/test", (req, res) => { 
    res.send("Hello from SERVER");
});

app.listen(1234, () => {
    console.log("Server is successfully listening http://localhost:1234");
});