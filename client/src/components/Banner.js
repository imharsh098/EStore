import React from "react";

function Banner() {
  return (
    <div className="offer">
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <img src="images/exclusive.png" className="offer-img" />
          </div>
          <div className="col-2">
            <p>Exclusively Available on RedStore</p>
            <h1>Smart Band 4</h1>
            <small>
              The Mi Smart Band 4 fearures a 39.9%larger (than Mi Band 3) AMOLED
              color full-touch display with adjustable brightness, so everything
              is clear as can be.
              <br />
            </small>
            <a href="products.html" className="btn">
              Buy Now &#8594;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
