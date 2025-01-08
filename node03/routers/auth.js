const {
  signupController,
  loginController,
  refreshAccessTokenController,
  logoutController,
} = require("../controllers/auth");
const requireUser = require("../middlewares/requireUser");
// const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/refresh", refreshAccessTokenController);
router.post("/logout", requireUser, logoutController);

module.exports = router;
