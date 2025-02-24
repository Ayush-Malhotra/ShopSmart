function isEmail(value) {
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    return true;
  }

  return false;
}

function isPassword(value) {
  if (
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value
    )
  ) {
    return true;
  }

  return false;
}

export function validate(name, value, tempError) {
  if (name === "name") {
    tempError = {
      ...tempError,
      [name]: value ? "" : "Name is mandatory",
    };
  } else if (name === "email") {
    tempError = {
      ...tempError,
      [name]: isEmail(value) ? "" : "Invaid email address",
    };
  }
  // else if (name === "password") {
  //   tempError = {
  //     ...tempError,
  //     [name]: isPassword(value)
  //       ? ""
  //       : "Password must have atleast 8 chars , 1 sp. char and 1 digit.",
  //   };
  // }
  return tempError;
}

export function requiredValidate(userdata, tempError) {
  if (userdata.name === "") {
    tempError = { ...tempError, name: "Name is mandatory" };
  }

  if (userdata.email === "") {
    tempError = { ...tempError, email: "Email is mandatory" };
  }

  if (userdata.password === "") {
    tempError = { ...tempError, password: "Password is Mandatoy" };
  }

  return tempError;
}
