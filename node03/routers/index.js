const authRouter = require("./auth");
const postRouter = require("./post");
const userRouter = require("./user");
const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);
module.exports = router;
