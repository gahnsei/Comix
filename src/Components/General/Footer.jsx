import React from "react";
import logo from "../../logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="logo">
        <img src={logo} alt="COMIX" />
        <span>COMIX</span>
      </div>
      <div className="footer-info-container">
        <div className="footer-info-div">
          <h3 className="footer-info-label">Legal Info</h3>
          <span>Terms and Conditions</span>
          <span>Cookies</span>
          <span>Privacy Policy</span>
        </div>
        <div className="footer-info-div">
          <h3 className="footer-info-label">Get In Touch</h3>
          <span>gahnseiwebdev@gmail.com</span>
          <span>+1 (234) 567-8910</span>
        </div>
        <div className="footer-info-div">
          <h3 className="footer-info-label">Follow Me</h3>
          <span>Twitter</span>
          <span>Discord</span>
          <span>Github</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
