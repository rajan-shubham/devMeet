const adminAuth = (req, res, next) => {
    // Logic of checking if the request is authorized
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    // Logic of checking if the request is authorized
    console.log("User auth is getting checked!!");
    const token = "xyz";
    const isUserAuthorized = token === "xyz";
    if (!isUserAuthorized) {
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};

module.exports = { adminAuth, userAuth };