import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";


const Cart = () => {
  const history = useHistory();
 
  // useSelector and useDispatch
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=checkout");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Products Added To Cart Yet.</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product} className="cartContainer">
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() => decreaseQty(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <input readOnly type="text" value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`Nrs.${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Total</p>
                <p>{`Nrs.${cartItems.reduce(
                  // acc => every one object
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
