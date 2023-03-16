import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckOutSteps from "../Cart/CheckOutSteps";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "./Sidebar";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import {
  clearErrors,
  getOrderDetails,
  updateOrderAction,
} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loading from "../layout/Loader/Loading";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import "./ProcessOrder.css";
const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Processed Successfully");
      history.push("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, updateError, isUpdated]);

  const processOrder = (e) => {
    e.preventDefault();

    const myFormData = new FormData();

    myFormData.set("status", status);

    dispatch(updateOrderAction(id, myFormData));
  };

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span> {order.user && order.user.fullName}</span>
                    </div>
                    <div>
                      <p>Contact:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.contactNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order &&
                          order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country},`}
                      </span>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "Paid"
                          : "Payment Due"}
                      </p>
                    </div>

                    <div>
                      <p>Amount</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      {" "}
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((items) => (
                        <div key={items.product}>
                          <img src={items.image} alt={items.name} />
                          <Link to={`/product/${items.product}`}>
                            {items.name}
                          </Link>
                          <span>
                            {items.quantity} X Nrs.{items.price} =
                            <b> Nrs.{items.price * items.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  encType="multipart/form-data"
                  className="updateOrderForm"
                  onSubmit={processOrder}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Choose Order Status</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process Order
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
