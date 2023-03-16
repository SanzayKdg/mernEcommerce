import { Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Sidebar from "./Sidebar";
import { Doughnut, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { getProductsAdmin } from "../../actions/productActions";
import { allOrdersAction } from "../../actions/orderAction";
import { getAllUsersAction } from "../../actions/userAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  
  
  const dispatch = useDispatch();
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getProductsAdmin());
    dispatch(allOrdersAction());
    dispatch(getAllUsersAction())
  }, [dispatch]);

  let totalAmt = 0;
  orders && orders.forEach((item)=>{
    totalAmt += item.totalPrice
  })
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmt.toFixed(2)],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],

        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> Nrs.{totalAmt.toFixed(2)}
              </p>
            </div>

            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
