// what a user in our database is
const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 20,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        maxLength: 50,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: ");
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 85,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL: " + value);
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
        minLength: 10,
        maxLength: 100,
    },
    skills: {
        type: [String],
        validate(value) {
            if (value.length > 10) {
                throw new Error("Skills cannot be more then 10");
            }
        },
    },
},
{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;