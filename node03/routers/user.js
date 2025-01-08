const {
  followOrUnfollowController,
  getPostOfFollowers,
  getMyPost,
  getUserPost,
  deleteUser,
  getMyInfo,
  updateUser,
  getUserProfile,
} = require("../controllers/userController");
const requireUser = require("../middlewares/requireUser");
const router = require("express").Router();

router.post("/followorunfollow", requireUser, followOrUnfollowController);
router.get("/getfeed", requireUser, getPostOfFollowers);
router.get("/mypost", requireUser, getMyPost);
router.get("/userpost", requireUser, getUserPost);
router.delete("/deleteuser", requireUser, deleteUser);
router.put("/update", requireUser, updateUser);
router.get("/getmyinfo", requireUser, getMyInfo);
router.post("/getuserprofile", requireUser, getUserProfile);

module.exports = router;
