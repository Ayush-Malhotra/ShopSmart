import React, { useContext } from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, ShopOutlined } from "@ant-design/icons";
import { Button } from "antd";
import LoginContext from "../../context/LoginContext";
function Header() {
  const { user, setUser } = useContext(LoginContext);

  const onClick = () => {
    setUser({});
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };
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
        {Object.keys(user).length === 0 ? (
          <Button type="link">
            <Link to="/login">Login</Link>
          </Button>
        ) : (
          <Button type="link">
            <Link to="/login">Logout</Link>
          </Button>
        )}
        {Object.keys(user).length === 0 ? (
          <Button type="link">
            <Link to="/signup">Signup</Link>
          </Button>
        ) : (
          <></>
        )}

        <Button type="link">
          <Link to="/cart">
            <ShoppingCartOutlined />
          </Link>
        </Button>
        {Object.keys(user).length > 0 ? (
          <Button type="link">
            <Link to="/profile">{user.name}</Link>
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
