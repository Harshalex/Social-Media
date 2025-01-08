const User = require("../../node03/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  console.log("Sign up controller is called");
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const bio = req.body.bio;

    if (!email || !password) {
      return res.send(error(400, "Please enter email and password"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(error(409, "User already exist"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, bio });
    await newUser.save();

    return res.send(success(200, { newUser }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "User logout successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const loginController = async (req, res) => {
  const ACCESS_KEY = process.env.ACCESS_TOKEN_KEY;
  console.log("Login controller is called");
  console.log(ACCESS_KEY);

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.send(error(400, "Please enter email and password"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.send(error(409, "Please Signup first"));
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return res.send(error(409, "Incorrect password"));
  }

  const generateAccessToken = (data) => {
    try {
      const token = jwt.sign(data, ACCESS_KEY, { expiresIn: "10h" });
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  const generateRefreshToken = (data) => {
    try {
      const token = jwt.sign(data, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "1d",
      });
      console.log(token);
      console.log("Refresh Token is called ", token);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  const accessToken = generateAccessToken({ _id: user._id });
  const refreshToken = generateRefreshToken({ _id: user._id });
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
  });

  res.send(success(200, { accessToken }));
};

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies) {
    return res.send(error(401, "Authentication is required"));
  }

  const refreshToken = cookies.jwt;

  if (!refreshToken) {
    return res.send(error(401, "Required refresh token"));
  }

  const generateAccessToken = (data) => {
    try {
      const token = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "8h",
      });
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });
    res.send(success(200, { accessToken }));
  } catch (err) {
    console.log(err);
    res.send(error(409, "Invalid access key is passed"));
  }
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
  logoutController,
};
