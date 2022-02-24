import React from "react";

function Header() {
  return (
    <div className="hero">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <h1>
              Give Your Life <br /> A New Style!
            </h1>
            <p>
              Success isn't always about greatness. It;s about consistency.
              Consistent <br /> hard work gains success. Greatness will come.
            </p>
            <a href="" className="btn">
              Explore Now;
            </a>
          </div>
          <div className="col-2">
            <img src="images/dresses/herodress.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
