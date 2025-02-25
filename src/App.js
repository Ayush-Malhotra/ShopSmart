import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import LoginContextProvider from "./context/LoginContextProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <LoginContextProvider>
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <ToastContainer />
    </LoginContextProvider>
  );
}

export default App;
