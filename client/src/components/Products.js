import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading.js";
import Product from "./Product.js";
import { listProducts } from "../actions/productActions.js";
const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div className="small-container">
      <h1 className="title">Featured Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : (
        <div className="row">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
