/* eslint-disable object-shorthand */
"use strict";

(function () {

  window.utilityLoad = {

    URL: `https://21.javascript.pages.academy/keksobooking/data`,
    TIMEOUT_IN_MS: 10000,
    STATUS_CODE: {
      OK: 200,
      WRONG_REQUEST: 400,
      USER_NOT_REGISTERED: 401,
      NOT_FOUND: 404,
    },

    getXHRequest: function (onSuccess, onError) {

      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;
      xhr.addEventListener(`load`, function () {

        let error;
        switch (xhr.status) {
          case window.utilityLoad.STATUS_CODE.OK:
            onSuccess(xhr.response);
            break;
          case window.utilityLoad.STATUS_CODE.WRONG_REQUEST:
            error = `ошибка: Неверный запрос`;
            break;
          case window.utilityLoad.STATUS_CODE.USER_NOT_REGISTERED:
            error = `ошибка: Пользователь не авторизован`;
            break;
          case window.utilityLoad.STATUS_CODE.NOT_FOUND:
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

      xhr.timeout = this.TIMEOUT_IN_MS;
      xhr.open(`GET`, this.URL);
      xhr.send();

    }
  };

})();

