import React from "react";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download Our App</h3>
              <p>Download App for Android and ios mobile phone.</p>
              <div className="app-logo">
                <img src="../images/play-store.png" alt="" />
                <img src="../images/app-store.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <p className="copyright">Copyright 2022 - The Hacking School</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
