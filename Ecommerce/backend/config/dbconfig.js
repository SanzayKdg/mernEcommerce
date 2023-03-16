const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `MongoDB is connected successfully on server : ${data.connection.host}`
      );
    })
};

module.exports = connectDB;
