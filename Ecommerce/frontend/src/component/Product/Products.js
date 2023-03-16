import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loading from "../layout/Loader/Loading";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

// Categories Lists
const smartPhonesCategories = [
  "Samsung",
  "Apple",
  "Xiaomi",
  "One Plus",
  "Oppo",
  "Vivo",
];
const laptopCategories = [
  "Asus Laptops",
  "Acer Laptops",
  "Dell Laptops",
  "HP Laptops",
  "Samsung Laptops",
  "Apple Laptops",
  "Xiaomi Laptops",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();

  // UseState
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0, 250000]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  // UseSelector
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  // UseEffects
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>

          <MetaData title="Products Lists -- Ecommerce"/>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />
            <Typography variant="h5">Categories</Typography>
            <Typography mt={4}>SmartPhones</Typography>
            <ul className="categoryBox">
              {smartPhonesCategories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <Typography mt={4}>Laptops</Typography>
            <ul className="categoryBox">
              {laptopCategories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
