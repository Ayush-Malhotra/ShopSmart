import React, { useState } from "react";
import "./signup.styles.css";
import Input from "../../components/Input";
import { validate, requiredValidate } from "../../utils/helper";
function Signup() {
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
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

  function handleSubmit(e) {
    e.preventDefault();
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
    alert(`Form is successfully submitted by ${userData.name}`);
    console.log("data submitted", userData);
  }

  return (
    <div className="signup" onSubmit={handleSubmit}>
      <div className="title">Signup</div>
      <form className="form">
        <Input
          label="Name"
          name="name"
          onChange={onChange}
          value={userData.name}
          error={errors?.name}
        />

        <Input
          label="Email"
          name="email"
          onChange={onChange}
          value={userData.email}
          error={errors?.email}
        />

        <Input
          label="Password"
          name="password"
          onChange={onChange}
          value={userData.password}
          error={errors?.password}
        />

        <button type="submit" className="submit-btn">
          REGISTER
        </button>
      </form>
    </div>
  );
}

export default Signup;
