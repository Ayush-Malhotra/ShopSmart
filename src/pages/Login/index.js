import { Button, Input } from "antd";
import "./login.styles.css";
import React, { useContext, useState } from "react";
import { createSession, getTokens, includeAuth } from "../../api/productApi";
import LoginContext from "../../context/LoginContext";

function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const { tokens, setTokens } = useContext(LoginContext);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await getTokens(userLogin);
    console.log("response : ", res);
    setTokens(res.data);
    console.log(tokens);
    includeAuth(res.data);
  };

  return (
    <div className="login2">
      <div className="login-title">Login</div>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <Input
          type="email"
          name="email"
          value={userLogin.email}
          onChange={onChange}
        />
        <label>Password</label>
        <Input
          type="password"
          name="password"
          value={userLogin.password}
          onChange={onChange}
        />
        <Button type="primary" htmlType="submit" className="login-btn">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
