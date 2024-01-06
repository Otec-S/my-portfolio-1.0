import React from "react";
import "./Promo.css";
import promoLogo from "../../../images/promoLogo.png";

const Promo = ({ onButtonClick }) => {
  return (
    <section className="promo">
      <div className="promo__block">
        {/* <h1 className="promo__title">
          {" "}
          Пет-проект&ensp;
          <span className="promo__title_nowrap">"Movies Explorer"</span>
        </h1> */}
        <h1 className="promo__title">
          <span className="promo__title_line">Пет-проект</span>
          <span className="promo__title_nowrap">Movies Explorer</span>
        </h1>

        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект, а также посмотреть другие проекты моего портфолио.
        </p>
        <button className="promo__button" onClick={onButtonClick}>
          Узнать больше
        </button>
      </div>
      <img src={promoLogo} className="promo__logo" alt="Логотип с планетой" />
    </section>
  );
};

export default Promo;
