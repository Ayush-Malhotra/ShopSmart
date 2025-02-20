import React from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

function Header() {
  return (
    <div className="heading">
      <div>SHOPSMART</div>
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/cart">
          <ShoppingCartOutlined />
        </Link>
      </div>
    </div>
  );
}

export default Header;
