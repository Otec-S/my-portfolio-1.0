import React, { useState, useContext } from "react";
import WelcomeForm from "../WelcomeForm/WelcomeForm";
import { useNavigate } from "react-router-dom";
import * as auth from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Login({
  isNameValid,
  isEmailValid,
  isPasswordValid,
  handleFormValidation,
  userName,
  email,
  password,
  userId,
  setUserId,
  setPassword,
  setUserName,
  setEmail,
  setIsRegistered,
  errorServerMessage,
  setErrorServerMessage,
}) {
  // const { userName, email, password, userId } = useContext(CurrentUserContext);

  //стейт для формы логирования
  // const [formValue, setFormValue] = useState({
  //   email: "",
  //   password: "",
  // });

  const navigate = useNavigate();

  // function handleChange(event) {
  //   const { name, value } = event.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   });
  // }

  async function handleUserFormSubmit(e) {
    e.preventDefault();

    try {
      if (!email || !password) {
        return;
      }
      //получение и запись в data данных с сервера
      const data = await auth.authorize(email, password);
      console.log("data", data);

      //записываем полученные в ответе сервера пароль и _id в стейты
      setPassword(data.password);
      setEmail(data.email);
      setUserId(data._id);
      //стейт isRegistered в положение true
      setIsRegistered(true);
      //перевод на страницу фильмы
      navigate("/movies", { replace: true });
    }
    catch (error) {
      console.error('error:', error);
      // Обработка ошибок, например, уведомление пользователя
      setErrorServerMessage("Вы ввели неправильный логин или пароль.");
      
    }
  }

  return (
    <WelcomeForm
      greetings="Рады видеть!"
      isNewUser={false}
      buttonText="Войти"
      welcomeQuestion="Ещё не зарегистрированы?"
      welcomeLinkName="Регистрация"
      welcomeLink="/signup"
      isNameValid={isNameValid}
      isEmailValid={isEmailValid}
      isPasswordValid={isPasswordValid}
      handleFormValidation={handleFormValidation}
      handleUserFormSubmit={handleUserFormSubmit}
      errorServerMessage={errorServerMessage}
    />
  );
}
