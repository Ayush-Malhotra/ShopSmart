import React from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="heading">
      <div>SHOPCART</div>
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Header;
