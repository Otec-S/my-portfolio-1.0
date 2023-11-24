import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ isSaved, allMovies }) => {
  return (
    <section className="movies-card-section">
      <ul className="movies-card-list">
        {allMovies.map((item) => {
          return (
            <MoviesCard
              isSaved={isSaved}
              name={item.nameRU}
              duration={item.duration}
              image={item.image.url}
            />
          );
        })}

        {/* <li>
          <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li>
        <li>
        <MoviesCard isSaved={isSaved}/>
        </li> */}
      </ul>
    </section>
  );
};

export default MoviesCardList;
