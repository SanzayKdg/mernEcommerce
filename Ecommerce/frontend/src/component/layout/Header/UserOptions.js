import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  // const navigate = useNavigate();
  const history = useHistory();

  const dispatch = useDispatch();
  const alert = useAlert();
  // UseState
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: profile },
    {
      icon: <ShoppingCartIcon style={{color:cartItems.length > 0 ? "tomato" : "unset"}}/>,
      name: `Cart(${cartItems.length})`,
      func: cart,
    },

    { icon: <ExitToAppIcon />, name: "Logout", func: logOut },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  // functions for menu options
  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }

  function cart() {
    history.push("/cart");
  }

  function profile() {
    history.push("/account");
  }

  function logOut() {
    dispatch(logout());
    alert.success("Logged out successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: 11 }}
        className="speedDial"
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "./Profile.png"}
            alt="Profile Icon"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            key={item.name}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
