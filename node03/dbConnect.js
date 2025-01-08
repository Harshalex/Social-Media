const mongoose = require("mongoose");

function dbConnect() {
  const mongoUri =
    "mongodb+srv://hs452544:harshrajput@cluster0.vkyic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));

  async function createUser(newUser) {
    const user = new User(newUser);
    const data = await user.save();
    console.log("Data", data);
  }
}

module.exports = dbConnect;
