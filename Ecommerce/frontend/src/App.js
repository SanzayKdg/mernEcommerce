import "./App.css";
import Header from "./component/layout/Header/Header";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import { useSelector } from "react-redux";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import CheckOut from "./component/Cart/CheckOut.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import PaymentProcess from "./component/Cart/PaymentProcess.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UserLists from "./component/admin/UserLists";
import UpdateUser from "./component/admin/UpdateUser";
import ReviewLists from "./component/admin/ReviewLists";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import NotFound from "./component/layout/NotFound/NotFound";

function App() {
  const { isLogin, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // to disable right click on websites pages
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isLogin && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute
            exact
            path="/payment/process"
            component={PaymentProcess}
          />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />

        {/* Alternate link to proceed */}
        {/* {isLogin && <Route exact path="/account" component={Profile} />} */}

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute
          exact
          path="/profile/update"
          component={UpdateProfile}
        />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <ProtectedRoute exact path="/checkout" component={CheckOut} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={ProductList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={UserLists}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ReviewLists}
        />
        {/* <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        /> */}

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;

// 5 : 17 : 56
// 5 : 43 : 28
// 7 : 00 : 00
// 8 : 00 : 00
// 8 : 27 : 50
// 9 : 11 : 21
// 9 : 22 : 25
// 9 : 46 : 49
// 10 : 44 : 26
// 11 : 04: 07
// 11 : 31 : 17
// 12 : 05 : 09
// 12 : 37 : 43
// 12 : 56 : 31
// 13 : 25 : 12
// 13 : 59 : 52
// 14 : 24 : 42
// 15 : 36 : 40
