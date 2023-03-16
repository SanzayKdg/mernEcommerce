const productModel = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create Prodcut ---Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      publicId: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products --- user
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 12;
  const productsCount = await productModel.countDocuments();
  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  // let products = await apiFeature.query;
  // const filteredProductsCount = products.length;
  // apiFeature.pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  });
});

// get all products --- admin
exports.getAdminProducts = catchAsyncError(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// get single product or product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// update products --admin route
exports.updateProducts = catchAsyncError(async (req, res, next) => {
  let updateProduct = await productModel.findById(req.params.id);

  if (!updateProduct) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Get images after fetching products
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images from cloudinary
    for (i = 0; i < updateProduct.images.length; i++) {
      await cloudinary.v2.uploader.destroy(updateProduct.images[i].publicId);
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        publicId: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;
  }

  updateProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    updateProduct,
  });
});

// Delete Products -- admin-
exports.deleteProducts = catchAsyncError(async (req, res, next) => {
  const deleteProduct = await productModel.findById(req.params.id);
  if (!deleteProduct) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Deleting images from cloudinary
  for (i = 0; i < deleteProduct.images.length; i++) {
    await cloudinary.v2.uploader.destroy(deleteProduct.images[i].publicId);
  }

  await deleteProduct.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Create new review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.fullName,
    rating: Number(rating),
    comment,
  };
  const product = await productModel.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// get all reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete reviews
exports.deleteProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
