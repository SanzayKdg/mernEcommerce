const app = require("./app");
const connectDB = require("./config/dbconfig");
const cloudinary = require("cloudinary");

// handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// condition used for config file for production mode
if(process.env.NODE_ENV !== "PRODUCTION"){
require("dotenv").config({ path: "backend/config/config.env" });
}

// for local host--- use this
// dotenv.config({ path: "backend/config/config.env" });


// connecting to database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// unhandled Promis Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

// backend 90% completed
