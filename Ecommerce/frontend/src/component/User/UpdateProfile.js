import React, { Fragment, useEffect, useState } from "react";
import Loading from "../layout/Loader/Loading";
import "./UpdateProfile.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const alert = useAlert();
  // const navigate = useNavigate();
  const history = useHistory();

  // UseState
  const [avatar, setAvatar] = useState("./Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Capitalized name
  let capitalizedName =
    fullName.charAt(0).toUpperCase() +
    fullName.slice(1, 7) +
    fullName.charAt(7).toUpperCase() +
    fullName.slice(8);

  // useDispatch & useSelectors
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  // useEffect
  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Successfully Updated Profile.");
      dispatch(loadUser());
      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, history, user]);

  // Form submit
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("fullName", fullName);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  //   onChange Functions
  const updateProfileOnChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    name="fullName"
                    value={capitalizedName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileOnChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update Profile"
                  className="updateProfileBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
