const express = require("express");
const passport = require("passport");
const { dashboard } = require("../controller/dashBoardController");
const { downloadCSVReport } = require("../controller/reportController");

// requiring files
const {
  profile,
  updateUser,
  signIn,
  signUp,
  create,
  createSession,
  destroySession,
} = require("../controller/userController");
const router = express.Router();

// router for checking up the profile
router.get("/profile", passport.checkAuthentication, profile);

//updating user profile
router.post("/update", passport.checkAuthentication, updateUser);

// route for dashboard
router.get("/dashboard", dashboard);

// router for sign in page
router.get("/", signIn);

// route for sign up page
router.get("/sign-up", signUp);

// route for creating a new User
router.post("/create", create);

// use passport as middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  createSession
);

// route for logout button
router.get("/sign-out", destroySession);

// route for downloading csv reports
router.get("/download", downloadCSVReport);

module.exports = router;












// const express = require("express");
// const passport=require("passport");
// const reportController = require("../controller/reportController");


// const {
//     profile,
//     updateUser,
//     signIn,
//     signUp,
//     create,
//     createSession,
//     destroySession,
//     dashboard,
 
// }=require("../controller/userController");
// const router = express.Router();

// // router for checking up the profile
// router.get("/profile",passport.checkAuthentication,profile);

// //updating user profile
// router.post('/update',passport.checkAuthentication,updateUser);

// // route for dashboard
// router.get("/dashboard",dashboard);

// // router for sign in page
// router.get('/',signIn);

// // router for sign up page
// router.get('/sign-up',signUp);

// // route for creating a new User
// router.post("/create",create);

// // use passport as middleware to authenticate
// router.post(
//     '/create-session',
//     passport.authenticate("local",{failureRedirect:'/'}),
//     createSession
// );

// // route for logout button
// router.get('/sign-out',destroySession);

// // route for downloading csv reports
// router.get('/download',reportController.downloadCSVReport);


// module.exports=router;