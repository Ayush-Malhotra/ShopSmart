import React, { useState, useEffect } from "react";
import "./signup.styles.css";
import CustomInput from "../../components/Input";
import { validate, requiredValidate } from "../../utils/helper";
import { Button } from "antd";
import { createUser } from "../../api/productApi";
import { Link } from "react-router-dom";
function Signup() {
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    // confirmpassword: "",
    avatar: "https://picsum.photos/800",
  });

  let [errors, setErrors] = useState({});

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
        return;
      }
    }

    const res = await createUser(userData);
    console.log(res, res.data);
    alert(`Form is successfully submitted by ${userData.name}`);
    console.log("data submitted", userData);
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
    </div>
  );
}

export default Signup;
