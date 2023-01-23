const express = require("express")
const router = express.Router();
const {
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserDetails, 
    userPasswordChange, 
    userProfileUpdate, 
    getAllUsers, 
    getSingleUser, 
    updateUserRole, 
    deleteUser} = require("../controllers/userControllers");
const { 
    isAuthenticatedUser, 
    isAuthorisedRole } = require("../middleware/auth");


router.route("/register")
.post(registerUser)

router.route("/login")
.post(loginUser)

router.route("/password/forgot")
.post(forgotPassword)

router.route("/password/reset/:token")
.put(resetPassword)

router.route("/logout")
.get(logout)

router.route("/me")
.get(isAuthenticatedUser,getUserDetails)

router.route("/password/update")
.put(isAuthenticatedUser,userPasswordChange)

router.route("/me/update")
.put(isAuthenticatedUser,userProfileUpdate)

router.route("/admin/users")
.get(isAuthenticatedUser,isAuthorisedRole("admin"),getAllUsers)

router.route("/admin/user/:id")
.get(isAuthenticatedUser,isAuthorisedRole("admin"),getSingleUser)
.delete(isAuthenticatedUser,isAuthorisedRole("admin"),deleteUser)
.put(isAuthenticatedUser,isAuthorisedRole("admin"),updateUserRole)



module.exports = router;