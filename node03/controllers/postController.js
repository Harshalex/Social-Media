const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const { success, error } = require("../utils/responseWrapper");
const { mapPostOutput } = require("../utils/Utils");

const postController = async (req, res) => {
  console.log("The id of the user is : ", req._id);
  return res.send(success(200, "You can see all the post"));
};

const createPostController = async (req, res) => {
  try {
    console.log("we are in create post");
    const { caption, postImage } = req.body;
    const owner = req._id;
    // console.log(caption, postImage);
    if (!caption || !postImage) {
      return res.send(error(409, "Caption and post image is required"));
    }
    const cloudImage = await cloudinary.uploader.upload(postImage, {
      folder: "myposts",
    });
    const user = await User.findById(req._id);
    const post = await Post.create({
      owner,
      caption,
      image: { publicId: cloudImage.public_id, url: cloudImage.url },
    });
    // console.log(post);
    user.posts.push(post._id);
    await user.save();

    res.send(success(200, { post }));
  } catch (e) {
    console.log(e.message);
    res.send(error(500, e.message));
  }
};

const likeOrUnlike = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;
    const post = await Post.findById(postId).populate("owner");
    console.log(post.likes);
    if (!post) {
      return res.send(error(500, "POST NOT AVAILABLE"));
    }

    if (post.likes.includes(curUserId)) {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1); // Remove the current user from likes array
    } else {
      post.likes.push(curUserId); // Add the current user to likes array
    }
    await post.save(); // Save the post after unliking
    return res.send(success(200, { post: mapPostOutput(post, req._id) }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.send(error(500, "Post not found"));
    }

    if (post.owner.toString() !== curUserId) {
      console.log(post.owner.toString);
      console.log(curUserId);
      return res.send(error(500, "Only oweners can update post"));
    }

    if (caption) {
      post.caption = caption;
    }

    await post.save();
    return res.send(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const curUser = await User.findById(req._id);
    const post = await Post.findById(postId);

    if (!post) {
      return res.send(error(500, "Post not found"));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(500, "Only oweners can delete post"));
    }
    console.log(curUser.posts);
    const index = curUser.posts.indexOf(postId);
    curUser.posts.splice(index, 1);
    console.log(post);
    await post.deleteOne();
    await curUser.save();

    return res.send(success(200, "User deleted the post successfully"));
  } catch (e) {
    console.log(e.message);
    return res.send(error(500, e.message));
  }
};

module.exports = {
  postController,
  createPostController,
  likeOrUnlike,
  updatePostController,
  deletePostController,
};
