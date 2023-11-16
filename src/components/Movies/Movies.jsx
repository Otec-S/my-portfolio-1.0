import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import MoreButton from "./MoreButton/MoreButton";


const Movies = ({ menuActive, setActive, isRegistered, isPromo }) => {
  return (
    <main>
      <Header
        isRegistered={isRegistered}
        menuActive={menuActive}
        setActive={setActive}
        isPromo={isPromo}
      />
      <SearchForm />
      <MoviesCardList/>
      <MoreButton/>
    </main>
  );
};

export default Movies;
