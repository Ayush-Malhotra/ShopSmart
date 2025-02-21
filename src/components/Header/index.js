import React from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, ShopOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Header() {
  return (
    <div className="heading">
      <Link to="/">
        <div>
          <ShopOutlined style={{ marginRight: 10 }} />
          SHOPSMART
        </div>
      </Link>
      <div className="nav-bar">
        <Button type="link">
          <Link to="/">Home</Link>
        </Button>
        <Button type="link">
          <Link to="/products">Products</Link>
        </Button>
        <Button type="link">
          <Link to="/login">Login</Link>
        </Button>
        <Button type="link">
          <Link to="/signup">Signup</Link>
        </Button>
        <Button type="link">
          <Link to="/cart">
            <ShoppingCartOutlined />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
