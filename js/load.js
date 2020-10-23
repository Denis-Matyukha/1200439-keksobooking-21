/* eslint-disable object-shorthand */
"use strict";

(function () {

  window.utilityLoad = {

    Url: `https://21.javascript.pages.academy/keksobooking/data`,
    TimeOutInMs: 10000,
    StatusCode: {
      Ok: 200,
      WrongRequest: 400,
      UserNotRegistered: 401,
      NotFound: 404,
    },
    ErrorWindowStyle: `
      z-index: 100;
      margin: 0 auto;
      text-align: center;
      background-color: wheat;
      position: absolute;
      padding: 0.5em;
      top: 40vh;
      left: 20vw;
      right: 20vw;
      font-size: 20px;
      font-family: Roboto", "Arial", sans-serif;
      color: #353535;
      border: 1px solid #ffaa99;
      border-radius: 8px;
      box-shadow: 0 0 2px 2px #ff6547;
    `,

    getXHRequest: function (onSuccess, onError) {

      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;
      xhr.addEventListener(`load`, function () {

        let error;
        switch (xhr.status) {
          case window.utilityLoad.StatusCode.Ok:
            onSuccess(xhr.response);
            break;
          case window.utilityLoad.StatusCode.WrongRequest:
            error = `ошибка: Неверный запрос`;
            break;
          case window.utilityLoad.StatusCode.UserNotRegistered:
            error = `ошибка: Пользователь не авторизован`;
            break;
          case window.utilityLoad.StatusCode.NotFound:
            error = `ошибка: Ничего не удалось найти =^⌒^=`;
            break;
          default:
            error = `ошибка: Cтатус ответа ${xhr.status} ${xhr.statusText}`;
        }

        if (error) {
          onError(error);
        }

      });

      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });

      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ' + ${xhr.timeout} + мс`);
      });

      xhr.timeout = this.TimeOutInMs;
      xhr.open(`GET`, this.Url);
      xhr.send();

    }
  };

})();

