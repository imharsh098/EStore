import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/userActions";
function NavBar() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  const menuToggle = () => {
    setToggle(!toggle);
  };
  return (
    //something wrong with navbar width
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="../images/logo.png" alt="logo" width="125px" />
          </Link>
        </div>
        <nav>
          <ul
            id="MenuItems"
            style={toggle ? { maxHeight: "200px" } : { maxHeight: "0px" }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            {userInfo ? (
              <li>
                <Link to="/login" onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            )}
          </ul>
        </nav>
        <Link to="/">
          <img src="../images/cart.png" width="30px" height="30px" />
        </Link>
        <img
          src="../images/menu.png"
          className="menu-icon"
          onClick={menuToggle}
        />
      </div>
    </div>
  );
}

export default NavBar;
