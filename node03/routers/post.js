const {
  postController,
  createPostController,
  likeOrUnlike,
  updatePostController,
  deletePostController,
} = require("../controllers/postController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.get("/", requireUser, postController);
router.post("/create", requireUser, createPostController);
router.post("/like", requireUser, likeOrUnlike);
router.put("/update", requireUser, updatePostController);
router.delete("/delete", requireUser, deletePostController);

module.exports = router;
