const validator = require("validator");
const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name field shouldn't be Empty");
    } else if (firstName.length < 4 || firstName.length > 30) {
        throw new Error("First Name should be 4-30 characters");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is Not Valid : " + emailId);
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter a Strong Password");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "age", "gender", "about", "skills", "photoUrl"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
}