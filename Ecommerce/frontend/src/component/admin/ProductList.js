import { Button } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import {
  clearErrors,
  getProductsAdmin,
  deleteProductAction,
} from "../../actions/productActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstant";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.productUD
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProductAction(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    dispatch(getProductsAdmin());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      type: "number",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item, index) => {
      rows.push({
        id: item._id,
        stock: item.stock < 1 ? 0 : item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title="Product Lists - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={25}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
