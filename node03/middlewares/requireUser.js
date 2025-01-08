const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");

module.exports = async (req, res, next) => {
  // Check if authorization header is present and starts with "Bearer"
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).send("Authorization header is required");
  }

  // Extract the token from the "Authorization" header
  const accessToken = req.headers.authorization.split(" ")[1];
  // console.log("Access Token inside Middleware", accessToken);

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
    req._id = decoded._id;
    next();
  } catch (err) {
    console.log(err);
    res.send(error(401, "Invalid access key is passed"));
  }
};
