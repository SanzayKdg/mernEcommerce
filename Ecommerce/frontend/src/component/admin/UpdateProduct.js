import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateProductAction,
  getProductDetails,
} from "../../actions/productActions";
import MetaData from "../layout/MetaData";
import "./NewProduct.css";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import StorageIcon from "@mui/icons-material/Storage";
import { Button } from "@mui/material";

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

const categories = [smartPhonesCategories, laptopCategories];

const UpdateProduct = ({ history, match }) => {
  //   const categories = ["Samsung", "Apple", "Xiaomi", "One Plus", "Oppo", "Vivo"];
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    error: updateError,
    isUpdated,
    loading,
    success,
  } = useSelector((state) => state.productUD);
  const { error, product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const productId = match.params.id;
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setCategory(product.category);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    updateError,
    isUpdated,
    product,
    productId,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myFormData = new FormData();
    myFormData.set("name", name);
    myFormData.set("price", price);
    myFormData.set("description", description);
    myFormData.set("category", category);
    myFormData.set("stock", stock);

    images.forEach((image) => {
      myFormData.append("images", image);
    });
    dispatch(updateProductAction(productId, myFormData));
   
  };

  const updateProductImagesOnchange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            encType="multipart/form-data"
            className="createProductForm"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                palceholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                palceholder="Product Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                palceholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                name="description"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Product Category</option>
                <optgroup label="SmartPhones">
                  {categories[0].map((cate) => (
                    <option value={cate} key={cate}>
                      {cate}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Laptops">
                  {categories[1].map((cate) => (
                    <option value={cate} key={cate}>
                      {cate}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesOnchange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Image" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="New Product Image" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
