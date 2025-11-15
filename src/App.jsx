import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import About from "./pages/AboutUs";
import ForgotPassword from "./pages/ForgetPassword";
import Product from "./pages/Product";
function App() {
  return (
    <>
      <Routes>
        {/* Pages with Header and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
        </Route>
        {/* Pages without Header and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget_password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
