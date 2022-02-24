import React from "react";
import Header from "./Header.js";
import Products from "./Products";
import Banner from "./Banner";
import Testimonials from "./Testimonials";

function HomeScreen() {
  return (
    <div>
      <Header />
      <Products />
      <Banner />
      <Testimonials />
    </div>
  );
}

export default HomeScreen;
