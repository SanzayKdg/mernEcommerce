import React, { Fragment, useEffect, useState } from "react";
import Loading from "../layout/Loader/Loading";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./ResetPassword.css";
import { useParams } from "react-router-dom";

const ResetPassword = ({ history, match }) => {
  const alert = useAlert();
  history = useHistory();
  match = useParams();
  // UseState
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useDispatch & useSelectors
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  // Form submit
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.token, myForm));
  };

  // useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Successfully Reset Password.");
      history.push("/login");
    }
  }, [dispatch, alert, error, success, history]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="changePassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="changePassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Reset Password"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
