import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetailsAction,
  updateUserAction,
  clearErrors,
} from "../../actions/userAction";
import Loading from "../layout/Loader/Loading";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.profile);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetailsAction(userId));
    } else {
      setFullName(user.fullName);
      setEmail(user.email);
      setRole(user.role);
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
      alert.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myFormData = new FormData();
    myFormData.set("fullName", fullName);
    myFormData.set("email", email);
    myFormData.set("role", role);

    dispatch(updateUserAction(userId, myFormData));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <form
              encType="multipart/form-data"
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  palceholder="User Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  name="fullName"
                />
              </div>

              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  palceholder="User Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
