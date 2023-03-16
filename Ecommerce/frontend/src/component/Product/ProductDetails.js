import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReviewAction,
} from "../../actions/productActions";
import ReviewCard from "./ReviewCard.js";
import Loading from "../layout/Loader/Loading";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));

    alert.success("Item Added To Cart");
  };

  // post ratings
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);
    dispatch(newReviewAction(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, success, reviewError]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- Ecommerce`} />

          <div className="ProductDetails">
            <div>
              <Carousel className="carouselImage">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      src={item.url}
                      key={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span ">
                  ({product.noOfReviews} Reviews)
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`Nrs. ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQty}>-</button>
                    <input readOnly value={quantity} type="text" />
                    <button onClick={increaseQty}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={Number(rating)}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <DialogActions>
                <Button color="error" onClick={submitReviewToggle}>
                  Cancel
                </Button>
                <Button color="success" onClick={reviewSubmitHandler}>
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet!</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
