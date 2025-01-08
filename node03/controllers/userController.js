const cloudinary = require("cloudinary").v2;
const Post = require("../models/Post");
const User = require("../models/User");
const { use } = require("../routers/user");
const { error, success } = require("../utils/responseWrapper");
const { mapPostOutput } = require("../utils/Utils");

const followOrUnfollowController = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const curUserId = req._id;

    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(curUserId);

    if (!userToFollow) {
      return res.send(error(500, "User not found to follow"));
    }

    if (curUserId == userIdToFollow) {
      return res.send(error(500, "User can not follow himself"));
    }

    if (curUser.followings.includes(userIdToFollow)) {
      const followingIndex = curUser.followings.indexOf(userIdToFollow);
      curUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(curUser);
      userToFollow.followers.splice(followerIndex, 1);
    } else {
      userToFollow.followers.push(curUserId);
      curUser.followings.push(userIdToFollow);
    }
    userToFollow.save();
    curUser.save();

    return res.send(success(200, { userToFollow }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getPostOfFollowers = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId).populate("followings");

    const fullPosts = await Post.find({
      owner: {
        $in: curUser.followings,
      },
    }).populate("owner");

    const posts = fullPosts
      .map((item) => mapPostOutput(item, req._id))
      .reverse();

    const followingIds = curUser.followings.map((item) => item._id);
    followingIds.push(curUserId);
    const suggestedUsers = await User.find({
      _id: {
        $nin: followingIds,
      },
    });

    return res.send(success(200, { ...curUser._doc, suggestedUsers, posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyPost = async (req, res) => {
  try {
    const curUserId = req._id;
    const allUserPosts = await Post.find({
      owner: curUserId,
    }).populate("likes");
    return res.send(success(200, { allUserPosts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserPost = async (req, res) => {
  try {
    const { userId } = req.body;
    const allUserPosts = await Post.find({
      owner: userId,
    }).populate("likes");
    return res.send(success(200, { allUserPosts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req._id);
    return res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId).populate({
      path: "posts",
      populate: {
        path: "owner",
      },
    });

    const fullPosts = user.posts;
    const posts = fullPosts
      .map((item) => mapPostOutput(item, req._id))
      .reverse();

    return res.send(success(200, { ...user._doc, posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, bio, image } = req.body;
    const user = await User.findById(req._id);

    if (name) {
      user.name = name;
    }
    if (bio) {
      user.bio = bio;
    }
    if (image) {
      const cloudImage = await cloudinary.uploader.upload(image, {
        folder: "profileImage",
      });
      user.avatar = {
        publicId: cloudImage.public_id,
        url: cloudImage.secure_url,
      };
    }
    await user.save();
    return res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(509, e.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);

    await Post.deleteMany({
      owner: curUserId,
    });

    //remove myself from follower's followings
    curUser.followers.forEach(async (followerId) => {
      const follower = await User.findById(followerId);
      const index = follower.followings.indexOf(curUserId);
      follower.followings.splice(index, 1);
      await follower.save();
    });

    //remove myself from my followings' followers
    curUser.followings.forEach(async (followingId) => {
      const following = await User.findById(followingId);
      const index = following.followers.indexOf(curUserId);
      following.followers.splice(index, 1);
      await following.save();
    });

    //remove myself from all post's likes
    const allPosts = await Post.find();
    allPosts.forEach(async (post) => {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
      await post.save();
    });

    await curUser.remove();

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });

    res.send(success(200, "User deleted Successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  followOrUnfollowController,
  getPostOfFollowers,
  getMyPost,
  getUserPost,
  deleteUser,
  getMyInfo,
  updateUser,
  getUserProfile,
};
