const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
} = require("../controllers/productController");
const { isLogin, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(getAdminProducts, isLogin, authorizedRoles("admin"));

router
  .route("/admin/product/new")
  .post(isLogin, authorizedRoles("admin"), createProduct);

  router
  .route("/admin/products/:id")
  .put(isLogin, authorizedRoles("admin"), updateProducts)
  .delete(isLogin, authorizedRoles("admin"), deleteProducts);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isLogin, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isLogin, deleteProductReviews);

module.exports = router;
