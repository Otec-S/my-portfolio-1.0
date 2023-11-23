import React from "react";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Main = ({ menuActive, setActive, isRegistered, isPromo }) => {
  return (
    <>
      <Header
        menuActive={menuActive}
        setActive={setActive}
        isRegistered={isRegistered}
        isPromo={isPromo}
      />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
};

export default Main;