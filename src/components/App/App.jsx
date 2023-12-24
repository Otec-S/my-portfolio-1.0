import React, { useState, useCallback, useEffect } from "react";

import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";
import { getAllMovies } from "../../utils/MoviesApi";
import { getAllSavedMovies } from "../../utils/MainApi";
import { useLocalStorageState } from "../../hooks";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
import * as auth from "../../utils/MainApi";
import ProtectedRouteElement from "../../utils/ProtectedRoute";
import { saveMovieOnServer, deleteMovieFromServer } from "../../utils/MainApi";
import { MOVIE_IMAGE_PATH } from "../../constants";

function App() {
  const navigate = useNavigate();

  /////////////
  // СТЕЙТЫ  //
  /////////////

  //стейты о пользователе
  const [userName, setUserName] = useLocalStorageState("userName", "");
  const [email, setEmail] = useLocalStorageState("email", "");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useLocalStorageState("userId", "");

  //стейты для проверки валидации
  const [isNameValid, setIsNameValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  //стейт для массива Всех фильмов
  const [allMovies, setAllMovies] = useState([]);

  //стейт для массива всех сохраненных фильмов
  const [allSavedMovies, setAllSavedMovies] = useState([]);

  //стейт для активации BurgerMenu
  const [isMenuActive, setIsMenuActive] = useState(false);

  //стейт для зарегистрированного пользователя
  const [isRegistered, setIsRegistered] = useLocalStorageState(
    "isRegistered",
    false
  );

  //стейт для стилизации Header и его наполнения
  const [isPromo, setIsPromo] = useState(false);

  //стейт для загрузки прелоадера
  const [isLoading, setIsLoading] = useState(false);

  //стейт для отфильтрованного поиском массива фильмов
  const [filteredMoviesArray, setFilteredMoviesArray] = useLocalStorageState(
    "filteredMoviesArray",
    ""
  );

  //стейт для отслеживания состояния строки запроса в форме ввода
  const [movieSearchQuery, setMovieSearchQuery] = useLocalStorageState(
    "movieSearchQuery",
    ""
  );

  //стейт для вывода на страницу ошибки при поиске фиьма
  const [isSearchErrored, setIsSearchErrored] = useState(false);

  //стейт для отслеживания состояния чекбокса, включен или нет
  const [isShortMovieChecked, setIsShortMovieChecked] = useLocalStorageState(
    "isShortMovieChecked",
    false
  );

  //стейт для отслеживания наличия поискового запроса в форме поиска
  const [isSearchFormEmpty, setIsSearchFormEmpty] = useState(false);

  //стейт для определения ширины видимой части страницы
  const [pageWidth, setPageWidth] = useState();

  //стейт видимого количества карточек на странице
  const [totalCardsOnPage, setTotalCardsOnPage] = useLocalStorageState(
    "totalCardsOnPage",
    ""
  );

  //стейт отображения кнопки Ещё
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);

  //стейт базового количества карточек на странице
  const [baseNumberOfCards, setBaseNumberOfCards] = useLocalStorageState(
    "baseNumberOfCards",
    "12"
  );

  //стейт для сообщения для ошибок с сервера
  const [errorServerMessage, setErrorServerMessage] = useState("");


  /////////////
  // ФУНКЦИИ //
  /////////////

  //валидирование форм ввода
  const handleFormValidation = (event) => {
    const { name, value } = event.target || event;

    switch (name) {
      case "userName":
        setUserName(value);
        setIsNameValid(value ? /^[a-zA-Zа-яА-Я\s-]+$/.test(value) : "");
        break;
      case "email":
        setEmail(value);
        setIsEmailValid(value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : "");
        break;
      case "password":
        setPassword(value);
        setIsPasswordValid(value ? value.length >= 4 : "");
        break;
      default:
        break;
    }
  };

  //функция изменяет состояние стейта чекбокса на противоположное
  const handleCheckboxChange = () => {
    setIsShortMovieChecked(!isShortMovieChecked);
  };

  //функция первоначального получения всех фильмов и записи их в стейт
  const initialSetAllMovies = () => {
    //запускаем Прелоадер
    setIsLoading(true);
    //получили все карточки из базы и записали их в стейт
    getAllMovies()
      .then((allMoviesData) => {
        //записываем результаты поиска из api в стейт с фильмами
        setAllMovies(allMoviesData);
        //первичный параллельный приск по фильмам из api для отображения на странице + прогон через проверку на включенный чекбокс
        searchMovies(allMoviesData);
      })
      .catch((err) => {
        //если ошибка соединения с базой Яндекса - устанавливается этот стейт и выводится сообщение через тернарный оператор в MoviesCardList
        setIsSearchErrored(true);
      })
      //выключили Прелоадер
      .finally(() => {
        setIsLoading(false);
      });
  };

  //функция фильтации входящего массива фильмов по слову из строки поиска и запись в стейт найденных фильмов
  const searchMovies = (array) => {
    const filtered = array.filter(
      (item) =>
        item.nameRU.toLowerCase().includes(movieSearchQuery.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(movieSearchQuery.toLowerCase())
    );
    // setFilteredMoviesArray(filterMoviesByDuration(filtered));
    setFilteredMoviesArray(filtered);
  };

  //функция срабатывает по клику на кнопку поиска - отправляется форма поиска
  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    if (movieSearchQuery) {
      setIsSearchFormEmpty(false);
    } else {
      return setIsSearchFormEmpty(true);
    }
    //отправка запроса в первый раз
    if (allMovies.length === 0) {
      initialSetAllMovies();
    }
    //отправка запроса во второй раз и далее
    else {
      searchMovies(allMovies);
    }
  };

  //функция для добавления новых рядов карточек
  const addCardRows = () => {
    setBaseNumberOfCards(baseNumberOfCards + (pageWidth > 1200 ? 3 : 2));
  };

  const showMoreButton = useCallback(() => {
    //фильтрация по признаку короткометражек
    const filterMoviesByDuration = () => {
      if (isShortMovieChecked) {
        return filteredMoviesArray.filter((array) => array.duration < 40);
      }
      return filteredMoviesArray;
    };
    filteredMoviesArray
      ? filterMoviesByDuration().length > totalCardsOnPage + 1
        ? setIsMoreButtonVisible(true)
        : setIsMoreButtonVisible(false)
      : setIsMoreButtonVisible(false);
  }, [filteredMoviesArray, totalCardsOnPage, isShortMovieChecked]);

  //функция управления стейтами количества карточек на странице
  const handleCardsOnPage = useCallback(() => {
    //устанавливаем ширину экрана в зависимости от видимой части
    setPageWidth(document.documentElement.clientWidth);
    //меняем количество карт в зависимости от ширины экрана
    if (pageWidth > 1200) {
      setTotalCardsOnPage(baseNumberOfCards);
    } else if (pageWidth >= 660 && pageWidth <= 1200) {
      setTotalCardsOnPage(baseNumberOfCards - 4);
    } else if (pageWidth < 660) {
      setTotalCardsOnPage(baseNumberOfCards - 7);
    }
  }, [baseNumberOfCards, pageWidth]);

  //по клику на кнопку поиска также сбрасываем до базового количество отражаемых на странице карточек
  const handleClick = () => {
    setBaseNumberOfCards(12);
  };

  //функция постоянной авторизации
  const tokenCheck = () => {
    //определяем текущее местрорасположение
    const currentPath = window.location.pathname;
    if (
      document.cookie.length > 0
      // isRegistered
      //  ||
      // (localStorage.getItem("email") &&
      //   localStorage.getItem("email") !== "" && //нужно это условие, если начальное значение стейта null?
      //   localStorage.getItem("email") !== "null" &&
      //   localStorage.getItem("email") !== "undefined")
    ) {
      // setIsRegistered(true);
      // console.log("yes");
      // console.log("localStorage.getItem(email)", localStorage.getItem("email"));
      navigate(currentPath, { replace: true });
    } else {
      setIsRegistered(false);
      setEmail("");
      navigate("/", { replace: true });
    }
  };

  //разлогирование
  const handleUnLogin = async () => {
    const response = await auth.signout();
    console.log("response", response);

    localStorage.clear();
    setAllMovies([]);
    setIsShortMovieChecked(false);
    setUserName("");
    setEmail("");
    setPassword("");
    setUserId("");
    setIsRegistered(false);
    setFilteredMoviesArray("");
    setMovieSearchQuery("");
    setTotalCardsOnPage("");
    setIsMoreButtonVisible(false);
    setBaseNumberOfCards("12");
    setErrorServerMessage("");
    setIsNameValid(null);
    setIsEmailValid(null);
    setIsPasswordValid(null);
    navigate("/", { replace: true });
  };


  // Обновление списка сохраненных фильмов в зависимости от действия пользователя
  const handleSaveStatusChange = (movie, isMovieSaved) => {
    //movie - это объект фильма, с которым производится действие добавления или удаления
    //isSaved - булевое значение. Если true - фильм сохраняется, если false — удаляется

    //обновляем массив сохраненных фильмов allSavedMovies в зависимости от действий пользователя
    if (isMovieSaved) {
      //если true и фильм сохранен, то добавляем фильм в массив allSavedMovies
      setAllSavedMovies((oldSavedMoviesArray) => [
        ...oldSavedMoviesArray,
        movie,
      ]);
    } else {
      //если false, то методом filter фильтруем массив, оставляя в нем только фильмы, movieId которых не совпадает с текущим movieId фильма
      setAllSavedMovies((oldSavedMoviesArray) =>
        oldSavedMoviesArray.filter(
          (savedMovie) => savedMovie.movieId !== movie.movieId
        )
      );
    }
  };

  /////////////
  // ЭФФЕКТЫ //
  /////////////

  //функция проверки токена, чтобы не вводить его повторно (при перезагрузке страницы например)
  useEffect(() => {
    tokenCheck();
  }, [isRegistered]);

  useEffect(() => {
    //отрисовываем карточки на странице в зависимости от ширины экрана
    handleCardsOnPage();
    //показываем или скрываем кнопку Ещё
    showMoreButton();
  }, [handleCardsOnPage, pageWidth, totalCardsOnPage, showMoreButton]);

  useEffect(() => {
    // Добавляем слушатель события изменения размера окна
    window.addEventListener("resize", () => {
      // Устанавливаем setTimeout, чтобы не вызывать слишком часто
      setTimeout(handleCardsOnPage, 200);
    });
    // Отписываемся от события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleCardsOnPage);
    };
  }, [totalCardsOnPage, baseNumberOfCards, pageWidth, handleCardsOnPage]);

  //запрос массива всех сохраненных фильмов
  useEffect(() => {
    const fetchSavedMovies = async () => {
      try {
        console.log("userId", userId);
        const response = await auth.getAllSavedMovies();
        //фетчим с сервера только те сохраненные там фильмы, owner которых совпадает с id текущего пользователя
        const currentUserSavedMovies = response?.filter(
          (item) => item.owner === userId
        );

        setAllSavedMovies(currentUserSavedMovies);
      } catch (error) {
        console.error(error);
      }
    };
    //фетчим только в случае, если пользователь зарегистрирован
    if (isRegistered) {
      fetchSavedMovies();
    }

    // console.log("allSavedMovies", allSavedMovies);
  }, [userId, isRegistered]);

  return (
    <div className="App">
      {/* <AppContext.Provider> */}
      <CurrentUserContext.Provider
        value={{ userName, email, password, userId }}
      >
        <Routes>
          <Route
            path="/signup"
            element={
              <ProtectedRouteElement
                isRegistered={!isRegistered}
                element={
                  <Register
                    isRegistered={isRegistered}
                    isNameValid={isNameValid}
                    isEmailValid={isEmailValid}
                    isPasswordValid={isPasswordValid}
                    handleFormValidation={handleFormValidation}
                    setUserId={setUserId}
                    setUserName={setUserName}
                    userName={userName}
                    email={email}
                    password={password}
                    userId={userId}
                    setEmail={setEmail}
                    setIsRegistered={setIsRegistered}
                    errorServerMessage={errorServerMessage}
                    setErrorServerMessage={setErrorServerMessage}
                  />
                }
              />
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRouteElement
                isRegistered={!isRegistered}
                element={
                  <Login
                    isNameValid={isNameValid}
                    isEmailValid={isEmailValid}
                    isPasswordValid={isPasswordValid}
                    isRegistered={isRegistered}
                    handleFormValidation={handleFormValidation}
                    setPassword={setPassword}
                    setUserId={setUserId}
                    setUserName={setUserName}
                    email={email}
                    password={password}
                    userId={userId}
                    setEmail={setEmail}
                    setIsRegistered={setIsRegistered}
                    errorServerMessage={errorServerMessage}
                    setErrorServerMessage={setErrorServerMessage}
                  />
                }
              />
            }
          />
          <Route
            path="/"
            element={
              <Main
                menuActive={isMenuActive}
                setActive={setIsMenuActive}
                isRegistered={isRegistered}
                isPromo={true}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                isRegistered={isRegistered}
                element={
                  <Profile
                    isRegistered={isRegistered}
                    menuActive={isMenuActive}
                    setActive={setIsMenuActive}
                    handleUnLogin={handleUnLogin}
                    isNameValid={isNameValid}
                    isEmailValid={isEmailValid}
                    isPasswordValid={isPasswordValid}
                    handleFormValidation={handleFormValidation}
                    errorServerMessage={errorServerMessage}
                    setErrorServerMessage={setErrorServerMessage}
                    setEmail={setEmail}
                    setUserName={setUserName}
                  />
                }
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                isRegistered={isRegistered}
                element={
                  <Movies
                    menuActive={isMenuActive}
                    setActive={setIsMenuActive}
                    isRegistered={isRegistered}
                    isPromo={false}
                    isLoading={isLoading}
                    filteredMoviesArray={filteredMoviesArray}
                    initialSetAllMovies={initialSetAllMovies}
                    movieSearchQuery={movieSearchQuery}
                    searchMovies={searchMovies}
                    setMovieSearchQuery={setMovieSearchQuery}
                    handleSearchFormSubmit={handleSearchFormSubmit}
                    isSearchErrored={isSearchErrored}
                    allMovies={allMovies}
                    handleCheckboxChange={handleCheckboxChange}
                    isSearchFormEmpty={isSearchFormEmpty}
                    isShortMovieChecked={isShortMovieChecked}
                    pageWidth={pageWidth}
                    totalCardsOnPage={totalCardsOnPage}
                    isMoreButtonVisible={isMoreButtonVisible}
                    addCardRows={addCardRows}
                    handleClick={handleClick}
                    // movieCardId={movieCardId}
                    // setMovieCardId={setMovieCardId}
                    // isChecked={isChecked}
                    // setIsChecked={setIsChecked}
                    handleSaveStatusChange={handleSaveStatusChange}
                    allSavedMovies={allSavedMovies}
                  />
                }
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                isRegistered={isRegistered}
                element={
                  <SavedMovies
                    menuActive={isMenuActive}
                    setActive={setIsMenuActive}
                    isRegistered={isRegistered}
                    isPromo={false}
                    allSavedMovies={allSavedMovies}
                    handleSaveStatusChange={handleSaveStatusChange}
                  />
                }
              />
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </CurrentUserContext.Provider>
      {/* </AppContext.Provider> */}
    </div>
  );
}

export default App;
