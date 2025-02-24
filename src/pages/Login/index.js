import { Button, Input } from "antd";
import "./login.styles.css";
import React, { useContext, useState } from "react";
import { createSession, getTokens } from "../../api/productApi";
import LoginContext from "../../context/LoginContext";
import CustomInput from "../../components/Input";
import { validate } from "../../utils/helper";

function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [userInvalid, setUserInvalid] = useState(false);
  const { user, setUser } = useContext(LoginContext);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserLogin({ ...userLogin, [name]: value });

    let tempError = { ...errors };
    tempError = validate(name, value, tempError);
    setErrors({ ...tempError });
  };

  const onClick = () => {
    setUser({});
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getTokens(userLogin);
      console.log("response : ", res);
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      let userSession = await createSession(res.data.access_token);
      setUser(userSession.data);
      setUserInvalid(false);
      console.log(userSession);
      // navigate("/profile");
    } catch (err) {
      console.log("err", err);
      if (err.status === 401) {
        setUserInvalid(true);
      }
      console.log("User failed to Login");
    }
  };

  return (
    <div className="login-page">
      <div className="login2">
        <div className="login-title">Login</div>
        {userInvalid ? (
          <div style={{ color: "red", marginTop: 10 }}>Invalid Credentials</div>
        ) : (
          <></>
        )}
        <div className="error"></div>
        {Object.keys(user).length === 0 ? (
          <form onSubmit={handleSubmit} className="form">
            <CustomInput
              label="Email"
              name="email"
              onChange={onChange}
              value={userLogin.email}
              error={errors?.email}
            />

            <CustomInput
              label="Password"
              name="password"
              onChange={onChange}
              value={userLogin.password}
              error={errors?.password}
            />
            <Button type="primary" htmlType="submit" size="large">
              Login
            </Button>
          </form>
        ) : (
          <div className="logout-page">
            <div>You have successfully Logged In!</div>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "red" }}
              onClick={onClick}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
