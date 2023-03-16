import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // const navigate = useNavigate();
  const history = useHistory();


  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subTotal > 5000 ? 0 : 100;
  const tax = (subTotal / 1.13) * (13 / 100);
  const billingCost = subTotal / 1.13;
  const totalPrice = shippingCharges + tax + billingCost;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPay = () => {
    const data = {
      billingCost,
      totalPrice,
      tax,
      shippingCharges,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment/process");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.fullName}</span>
              </div>
              <div>
                <p>Contact:</p>
                <span>{shippingInfo.contactNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((items) => (
                  <div key={items.product}>
                    <img src={items.image} alt={items.name} />
                    <Link to={`/product/${items.product}`}>{items.name}</Link>
                    <span>
                      {items.quantity} X Nrs.{items.price} =
                      <b> Nrs.{items.price * items.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Nrs.{billingCost.toFixed(2)}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Nrs.{shippingCharges.toFixed(2)}</span>
              </div>
              <div>
                <p>13% Tax:</p>
                <span>Nrs.{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
                <span> Nrs.{totalPrice.toFixed(2)}</span>
              </p>
            </div>

            <button onClick={proceedToPay}>Proceed To Pay</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
