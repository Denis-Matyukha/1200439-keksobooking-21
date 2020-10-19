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

