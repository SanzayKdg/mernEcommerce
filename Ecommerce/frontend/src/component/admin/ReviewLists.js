import { Button } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductReviews.css";
import { DataGrid } from "@material-ui/data-grid";
import {
  clearErrors,
  allReviewAction,
  deleteReviewAction,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
import Star from "@mui/icons-material/Star";

const ReviewLists = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, reviews, loading } = useSelector((state) => state.allReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const [productId, setProductId] = useState("");

  const deleteReviewsHandler = (reviewId) => {
    dispatch(deleteReviewAction(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(allReviewAction(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(allReviewAction(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Reviews Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    // dispatch(getProductsAdmin());
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  const columns = [
    {
      field: "id",
      headerName: "Review Id",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      type: "number",
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewsHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  reviews &&
    reviews.forEach((item, index) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title="Reviews Lists - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            encType="multipart/form-data"
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                maxLength={24}
                palceholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={25}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Yet</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ReviewLists;
