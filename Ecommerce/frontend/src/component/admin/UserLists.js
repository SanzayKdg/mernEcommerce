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
  getAllUsersAction,
  clearErrors,
  deleteUserAction,
} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserLists = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUserAction(id));
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
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsersAction());
  }, [dispatch, alert, error, history, isDeleted, message, deleteError]);

  const columns = [
    {
      field: "id",
      headerName: "User Id",
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item, index) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.fullName,
      });
    });

  return (
    <Fragment>
      <MetaData title="User Lists - Admin" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Users</h1>

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

export default UserLists;
