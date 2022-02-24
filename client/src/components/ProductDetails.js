import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading.js";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions.js";
function ProductDetails() {
  const history = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, []);
  const cartHandler = (e) => {
    history(`/cart/${id}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2 style={{ color: "red" }}>{error}</h2>
      ) : (
        <div className="small-container single-product">
          <div className="row">
            <div className="col-2">
              <img src={product.image} width="100%" id="ProductImg" />
            </div>
            <div className="col-2">
              <p>
                <Link to="/" style={{ color: "red" }}>
                  {" "}
                  Home{" "}
                </Link>{" "}
                / {product.name}
              </p>
              <h1>{product.name}</h1>
              <Rating rating={product.rating} />
              <h3 style={{ color: "#ff523b" }}>
                {product.rating} from {product.numReviews} reviews
              </h3>
              <h4>${product.price}</h4>
              {product.countInStock > 0 ? (
                <>
                  <select
                    type="number"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock)].map((x, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>

                  <button onClick={cartHandler} className="btn">
                    Add To Cart
                  </button>
                </>
              ) : (
                <h4>Product Out of Stock</h4>
              )}
              <h3>
                Product Details <i className="fa fa-indent"></i>
              </h3>
              <br />
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
