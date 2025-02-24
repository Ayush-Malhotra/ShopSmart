import React, { useState } from "react";
import LoginContext from "./LoginContext";

function LoginContextProvider({ children }) {
  const [user, setUser] = useState({});
  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
