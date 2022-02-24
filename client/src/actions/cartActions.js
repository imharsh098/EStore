import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../types";
import axios from "axios";
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  const newLoad = getState().cart.cartItems.filter(
    (item) => item.product != id
  );
  console.log(newLoad);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: newLoad,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
