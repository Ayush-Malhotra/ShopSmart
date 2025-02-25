import React, { useState, useEffect } from "react";
import "./signup.styles.css";
import CustomInput from "../../components/Input";
import { validate, requiredValidate } from "../../utils/helper";
import { Button } from "antd";
import { createUser, getTokens, createSession } from "../../api/productApi";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import { useContext } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    // confirmpassword: "",
    avatar: "https://picsum.photos/800",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
    let tempError = { ...errors };
    tempError = validate(name, value, tempError);
    setErrors({ ...tempError });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("My Data", userData);
    let tempError = { ...errors };
    console.log(tempError.name === "");
    tempError = requiredValidate(userData, tempError);
    setErrors({ ...tempError });
    console.log(errors);
    for (const key in errors) {
      if (errors[key] !== "") {
        alert(`Form is incorrectly filled`);
        console.log("Error Occured");
        return;
      }
    }
    for (const key in tempError) {
      if (tempError[key] !== "") {
        alert(`Form is incorrectly filled`);
        console.log("Error Occured");
        setLoading(false);
        return;
      }
    }
    try {
      const res = await createUser(userData);
      console.log(res, res.data);
      toast.success(`Welcome to ShopSmart! ${userData.name} `);
      console.log("data submitted", userData);
      const res2 = await getTokens({
        email: userData.email,
        password: userData.password,
      });
      console.log("response : ", res2);
      localStorage.setItem("access_token", res2.data.access_token);
      localStorage.setItem("refresh_token", res2.data.refresh_token);
      let userSession = await createSession(res2.data.access_token);
      setUser(userSession.data);
      toast.success(`You have successfully logged in!`);
      console.log(userSession);
      navigate("/login");
    } catch (err) {
      toast.error("Wrong details. Please try Again");
      console.log("error occured", err);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (userData.password !== userData.confirmpassword) {
  //     console.log(userData.password, userData.confirmpassword);
  //     setErrors({ ...errors, confirmpassword: "Match Not Found" });
  //   } else {
  //     setErrors({ ...errors, confirmpassword: "" });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userData.password, userData.confirmpassword]);

  return (
    <div className="signup">
      <div className="title">Signup</div>
      <form className="form" onSubmit={handleSubmit}>
        <CustomInput
          label="Name"
          name="name"
          onChange={onChange}
          value={userData.name}
          error={errors?.name}
        />

        <CustomInput
          label="Email"
          name="email"
          onChange={onChange}
          value={userData.email}
          error={errors?.email}
        />

        <CustomInput
          label="Password"
          name="password"
          onChange={onChange}
          value={userData.password}
          error={errors?.password}
        />

        {/* <CustomInput
          label="Confirm Password"
          name="confirmpassword"
          onChange={onChange}
          value={userData.confirmpassword}
          error={errors?.confirmpassword}
        /> */}

        {/* <CustomInput
          label="Password"
          name="password"
          onChange={onChange}
          value={userData.password}
          error={errors?.password}
        /> */}

        <Button
          type="primary"
          htmlType="submit"
          // className="submit-btn"
          // classNames="submit-btn"
          size="large"
          loading={loading}
        >
          REGISTER
        </Button>
      </form>
      <div style={{ marginTop: 50 }}>
        <span>Already a user?</span>
        <span>
          <Link to="/login" className="login-link">
            login
          </Link>
        </span>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Signup;
