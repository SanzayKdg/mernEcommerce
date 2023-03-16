import { Button } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  allOrdersAction,
  deleteOrderAction,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";



const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.order
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderAction(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
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

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

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
      history.push("/admin/orders");
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    
    }

    dispatch(allOrdersAction());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  return (
    <Fragment>
      <MetaData title="Order Lists - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList;
