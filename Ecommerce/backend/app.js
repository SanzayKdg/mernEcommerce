const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleWare = require("./middleware/error");
const cors = require("cors");
const path = require("path");

// condition used for config file for production mode
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// for local host--- use this
// dotenv.config({ path: "backend/config/config.env" });

// MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

// Route imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// deployment
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// middleware for Errors
app.use(errorMiddleWare);

module.exports = app;

// now to run only run in backend --- http://localhost:9000/
