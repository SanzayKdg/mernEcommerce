const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrders,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isLogin, authorizedRoles } = require("../middleware/auth");

router.route("/order/new").post(isLogin, newOrder);

router.route("/order/:id").get(isLogin, getSingleOrder);

router.route("/orders/my_orders").get(isLogin, myOrders);

router
  .route("/admin/orders")
  .get(isLogin, authorizedRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isLogin, authorizedRoles("admin"), updateOrders)
  .delete(isLogin, authorizedRoles("admin"), deleteOrder);

module.exports = router;
