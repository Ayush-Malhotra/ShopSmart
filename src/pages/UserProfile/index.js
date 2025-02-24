import React, { useContext } from "react";
import LoginContext from "../../context/LoginContext";
import "./userprofile.styles.css";
function UserProfile() {
  let { user, setUser } = useContext(LoginContext);
  console.log(user);
  return (
    <div className="profile-page">
      <div className="user-card">
        <div className="profile-title">Your Profile</div>
        <div>Name : {user.name}</div>
        <div>Email : {user.email}</div>
        <div>Role : {user.role}</div>
      </div>
    </div>
  );
}

export default UserProfile;
