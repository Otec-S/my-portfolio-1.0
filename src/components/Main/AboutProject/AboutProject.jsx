import React from "react";
import "./AboutProject.css";
import SubTitle from "../SubTitle/SubTitle";

const AboutProject = ({ refProp }) => {
  return (
    <section className="about-project" ref={refProp}>
      <SubTitle text="О проекте" />
      <article className="about-project__description">
        <div className="about-project__description-block">
          <p className="about-project__description-block-title">
            Подготовка Пет-проекта включала 5 этапов
          </p>
          <p className="about-project__description-block-text about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__description-block about-project__description-block-padding">
          <p className="about-project__description-block-title">
            На выполнение проекта ушло 5 недель
          </p>
          <p className="about-project__description-block-text about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы уложиться в поставленный срок.
          </p>
        </div>
      </article>

      <div className="about-project__timeline">
        <div className="about-project__timeline-backend about-project__text">
          1 неделя
        </div>
        <div className="about-project__timeline-frontend about-project__text">
          4 недели
        </div>
      </div>

      <div className="about-project__timeline">
        <div className="about-project__timeline-backend  about-project__timeline_explanation about-project__text">
          Back-end
        </div>
        <div className="about-project__timeline-frontend about-project__timeline_explanation about-project__text">
          Front-end
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
