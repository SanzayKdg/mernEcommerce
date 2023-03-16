import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from "../layout/Loader/Loading";
import MetaData from "../layout/MetaData";
import "./Profile.css";

const Profile = () => {
  // const navigate = useNavigate();
  const history = useHistory();

  const { user, loading, isLogin } = useSelector((state) => state.user);
 
  
  useEffect(() => {
    if (isLogin === false) {
      history.push("/login");
    }
  }, [history, isLogin]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`${user.fullName}`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.fullName} />
              <Link to="/profile/update">Edit Profile</Link>
            </div>

            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.fullName}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
