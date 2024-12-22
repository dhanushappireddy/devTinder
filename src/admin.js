const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "xyzj";
    const isAdminAuthenticated = token === "xyz";
    if(!isAdminAuthenticated) {
        console.log("Admin Auth failed");
        next();
    } else {
        console.log("Admin Auth Succeeded");
        res.send("Admin Auth Succeeded");
    }
}
const userAuth = (req, res, next) => {
    console.log("User Auth is getting checked");
    const token = "xyzl";
    const isUserAuthenticated = token === "xyz";
    if(!isUserAuthenticated) {
        console.log("User Auth failed");
        res.status(401).send("Unauthorized user access");
    } else {
        res.send("User Auth Succeeded");
        next();
    }
}
module.exports = {
   adminAuth, userAuth
}