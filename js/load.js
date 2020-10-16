/* eslint-disable object-shorthand */
"use strict";

(function () {

  window.utilityLoad = {

    URL: `https://21.javascript.pages.academy/keksobooking/data`,

    StatusCode: {
      OK: 200,
    },

    TIMEOUT_IN_MS: 10000,

    getXHRequest: function (onSuccess, onError) {
      // getXHR: function(listOfPins, pinTemplate) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;
      xhr.addEventListener(`load`, function () {
        console.log(xhr.status + ` ` + xhr.statusText);
        onSuccess(xhr.response);
      });
      xhr.open(`GET`, this.URL);
      xhr.send();

    }

  };

})();

