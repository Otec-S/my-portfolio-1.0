import React from "react";
import "./AboutMe.css";
import { Link } from "react-router-dom";
import profilePhoto from "../../../images/profilePhoto.jpg";
import aboutMeArrow from "../../../images/aboutMeArrow.svg";
import SubTitle from "../SubTitle/SubTitle";

const AboutMe = () => {
  return (
    <section className="about-me">
      <SubTitle text="Обо мне" />

      <div className="about-me__info">
        <div className="about-me__description">
          <h3 className="about-me__name">Сергей</h3>
          <p className="about-me__text about-me__personal-info">
            Фронтенд-разработчик
          </p>
          <p className="about-me__biography">
          Читаю Habr и книги про Java Script, привык анализировать большое количество информации, постоянно обучаюсь, имею высшую степень самоорганизованности, разговариваю с бизнесом "на одном языке". <br/><br/>
          Хобби: современные настольные игры (Twilight Imperium, Forbidden Stars, Brass...), бег на длинные дистанции.
          </p>
          <Link
            className="about-me__github-link"
            to="https://github.com/Otec-S/my-portfolio-1.0.git"
            target="_blank"
          >
            Код проекта на GitHub
          </Link>
        </div>
        <img src={profilePhoto} className="about-me__photo" alt="Фото Сергея" />
      </div>

      <div className="about-me__portfolio">
        <h3 className="about-me__portfolio-title">Другие проекты из портфолио</h3>

        <Link
          className="about-me__portfolio-site-link"
          to="https://otec-s.github.io/russian-travel"
          target="_blank"
        >
          <div className="about-me__portfolio-site">
            <h4 className="about-me__portfolio-site-name">Статичный сайт</h4>
            <img
              src={aboutMeArrow}
              alt="Указатель на сайт"
              className="about-me__portfolio-site-arrow"
            />
          </div>
        </Link>

        <div className="about-me__line about-me__line_lightgrey" />

        <Link
          className="about-me__portfolio-site-link"
          to="https://www.adviser-spb.ru"
          target="_blank"
        >
          <div className="about-me__portfolio-site">
            <h4 className="about-me__portfolio-site-name">Адаптивный сайт</h4>
            <img
              src={aboutMeArrow}
              alt="Указатель на сайт"
              className="about-me__portfolio-site-arrow"
            />
          </div>
        </Link>

        <div className="about-me__line about-me__line_lightgrey" />

        <Link
          className="about-me__portfolio-site-link"
          to="https://otec-s.students.nomoredomainsrocks.ru"
          target="_blank"
        >
          <div className="about-me__portfolio-site">
            <h4 className="about-me__portfolio-site-name">
              Одностраничное приложение
            </h4>
            <img
              src={aboutMeArrow}
              alt="Указатель на сайт"
              className="about-me__portfolio-site-arrow"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default AboutMe;
