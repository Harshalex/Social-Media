const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routers/index");
const cookieparser = require("cookie-parser");
const dbConnect = require("./dbConnect");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
dotenv.config({ path: "./.env" });

const app = express();
app.use(cookieparser());
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: "https://client-side-cyl9.onrender.com", credentials: true }));
dbConnect();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

app.use(morgan("common"));
app.use("/", router);
app.get("/", (req, res) => {
  res.send("Our server is live!!");
});
app.get("/home", (req, res) => {
  res.send("We are on Home page");
});

const PORT = process.env.PORT;

app.listen(PORT);
