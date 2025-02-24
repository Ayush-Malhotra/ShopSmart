import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import LoginContextProvider from "./context/LoginContextProvider";

function App() {
  return (
    <LoginContextProvider>
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </LoginContextProvider>
  );
}

export default App;
