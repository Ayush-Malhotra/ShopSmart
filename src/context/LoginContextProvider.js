import React, { useState } from "react";
import LoginContext from "./LoginContext";

function LoginContextProvider({ children }) {
  const [tokens, setTokens] = useState();
  return (
    <LoginContext.Provider value={{ tokens, setTokens }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
