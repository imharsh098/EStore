import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Product({ product }) {
  return (
    <div className="col-3">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} />

        <h2>{product.name}</h2>
        <h3 style={{ color: "#ff235b" }}>
          {product.rating} from {product.numReviews}
        </h3>
        <Rating rating={product.rating} />
        <h1>${product.price}</h1>
      </Link>
    </div>
  );
}

export default Product;
