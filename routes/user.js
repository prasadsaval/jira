//!========================================================================================
const { Router } = require("express");
const { Signup, SignIn } = require("../Controllers/Users.js");
// const { Protected } = require("../middlewares/");
const router = Router();

router.route("/Signup").post(Signup);
router.route("/SignIn").post(SignIn);

module.exports = router;
