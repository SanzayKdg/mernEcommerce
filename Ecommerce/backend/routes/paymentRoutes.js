const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");

const router = express.Router();

const { isLogin } = require("../middleware/auth");

router.route("/payment/process").post(isLogin, processPayment);
router.route("/stripeapikey").get(isLogin, sendStripeApiKey);

module.exports = router;