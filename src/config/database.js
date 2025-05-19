const mongoose = require('mongoose');

const connectDB = async () => { 
    await mongoose.connect("mongodb+srv://shubhamrajan:PgHhCpP8RI4a3klV@devMeet.su8vc.mongodb.net/devmeetMain");
};

module.exports = connectDB;

// "mongodb+srv://shubhamrajan:PLToJSvny58tOtsA@devMeet.su8vc.mongodb.net/devmeetMain"

// mongodb+srv://shubhamrajan:PLToJSvny58tOtsA@devmeet.su8vc.mongodb.net/?retryWrites=true&w=majority&appName=devMeet