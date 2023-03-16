import React from "react";
import playStore from "../../../image/playstore.png";
import appStore from "../../../image/Appstore.png";
import "./Footer.css";


const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer__leftFooter">
        <h4>Download our App</h4>
        <p>Download for Android and IOS</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="playstore" />
      </div>
      <div className="footer__midFooter">
        <h1>ECOMMERCE</h1>
        <p>High quality is our first priority</p>
        <p>CopyRight 2022 &copy; Sanjay Khadgi</p>
      </div>
      <div className="footer__rightFooter">
        <h4>Follow us on</h4>
        <a href="https://www.facebook.com/sanzaykhadgi1">Facebook</a>
        <a href="https://www.instagram.com/sanzay_khadgi/">Instagram</a>
        <a href="https://github.com/SanzayKdg/">Github</a>
      </div>
    </footer>
  );
};

export default Footer;
