import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import ProductDetails from "./components/ProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}>
          <Route path=":id" element={<Cart />}></Route>
        </Route>
        <Route path="/login" element={<Account />}></Route>
        <Route path="/register" element={<Account />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
