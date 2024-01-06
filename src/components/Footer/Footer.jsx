import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text footer__text-yandex">
        Пет-проект Movie Explorer.
      </p>

      <div className="footer__line" />

      <div className="footer__lowest-block">
        <p className="footer__text footer__lowest-block__year">© 2023</p>
        <div className="footer__lowest-block__about-yandex">
          <p className="footer__text footer__lowest-block__about-yandex-text">
            
          </p>

          <Link
            className="footer__text footer__lowest-block__about-yandex-githublink"
            to="https://github.com/Otec-S"
            target="_blank"
          >
            Мой GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
