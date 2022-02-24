import React, { useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link, useNavigate } from "react-router-dom";
import { loginAction, logoutAction } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
const Account = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction(log.email, log.password));
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history("/admin");
    }
    if (userInfo && !userInfo.isAdmin) {
      history("/");
    }
  }, [userLogin]);
  const strong = {
    backgroundColor: "green",
    width: "100%",
  };
  const good = {
    backgroundColor: "skyblue",
    width: "75%",
  };
  const average = {
    backgroundColor: "gold",
    width: "55%",
  };
  const weak = {
    backgroundColor: "red",
    width: "25%",
  };
  const [access, setAccess] = useState(true);
  const register = () => {
    setAccess(false);
  };
  const login = () => {
    setAccess(true);
  };
  const [reg, setReg] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [bar, setBar] = useState(false);
  const [style, setStyle] = useState({});
  const [log, setLog] = useState({
    email: "",
    password: "",
  });

  function passwordStrength(val) {
    if (val.length >= 6) {
      setBar(true);
      let combo = val;
      let lowerCase = combo.split("").some((ele) => {
        return /^[a-z]*$/.test(ele);
      });
      let upperCase = combo.split("").some((ele) => {
        return /^[A-Z]*$/.test(ele);
      });
      let numbers = combo.split("").some((ele) => {
        return /^[0-9]*$/.test(ele);
      });
      let specials = combo.split("").some((ele) => {
        return /^[!@#$%^&*)(+=._-]*$/.test(ele);
      });
      if (upperCase && lowerCase && numbers && specials) {
        setStyle(strong);
      } else if (
        (lowerCase && numbers && upperCase) ||
        (lowerCase && specials && upperCase) ||
        (specials && numbers && upperCase) ||
        (lowerCase && numbers && specials)
      ) {
        setStyle(good);
      } else if (
        (lowerCase && numbers) ||
        (numbers && specials) ||
        (lowerCase && specials) ||
        (upperCase && numbers) ||
        (upperCase && lowerCase) ||
        (upperCase && specials)
      ) {
        setStyle(average);
      } else if (lowerCase || upperCase || numbers || specials) {
        setStyle(weak);
      }
    } else {
      setBar(false);
    }
  }

  const registration = (e) => {
    if (e.target.id == "password") {
      setReg({ ...reg, [e.target.id]: e.target.value });
      passwordStrength(e.target.value);
    } else {
      setReg({ ...reg, [e.target.id]: e.target.value });
    }
  };
  const loggingIn = (e) => {
    setLog({ ...log, [e.target.id]: e.target.value });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="account-page">
          <div className="container">
            <div className="row">
              <div className="col-2">
                <img src="images/image1.png" alt="Logo" width="100%" />
              </div>
              <div className="col-2">
                <div className="form-container">
                  <div className="form-btn">
                    <Link to="/login">
                      <span onClick={login}>Login</span>
                    </Link>
                    <Link to="/register">
                      <span onClick={register}>Register</span>
                    </Link>{" "}
                    <hr
                      id="Indicator"
                      style={
                        access
                          ? { transform: "translateX(0px)" }
                          : { transform: "translateX(100px)" }
                      }
                    />
                  </div>
                  {error && <h4 style={{ color: "red" }}>{error}</h4>}

                  <form
                    id="LoginForm"
                    style={
                      access
                        ? { transform: "translateX(300px)" }
                        : { transform: "translateX(0px)" }
                    }
                    onChange={loggingIn}
                    onSubmit={handleLogin}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={log.email}
                    />
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={log.password}
                    />
                    <button type="submit" className="btn">
                      Login
                    </button>
                    <a href="">Forget Password</a>
                  </form>

                  <form
                    id="RegForm"
                    style={
                      access
                        ? { transform: "translateX(300px)" }
                        : { transform: "translateX(0px)" }
                    }
                    onChange={registration}
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      id="name"
                      value={reg.name}
                    />
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={reg.email}
                    />
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={reg.password}
                      onChange={(e) => {
                        if (e.target.value.length >= 6) {
                          setBar(true);
                        } else {
                          setBar(false);
                        }
                      }}
                    />
                    {bar && (
                      <div
                        id="bar"
                        style={{
                          border: "1.5px solid gray",
                          borderRadius: "5px",
                          height: "10px",
                        }}
                      >
                        <div
                          id="status"
                          style={{
                            transition: "all ease-in-out 450ms",
                            height: "100%",
                            borderRadius: "12px",
                            ...style,
                          }}
                        ></div>
                      </div>
                    )}
                    {/* {bar && <PasswordStrengthBar password={reg.password} />} */}
                    <button type="submit" className="btn">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
