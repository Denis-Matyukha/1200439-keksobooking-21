'use strict';

(function () {

  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.utilityUpload = function (data, onSuccess) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      onSuccess(xhr);
    });
    xhr.open(`POST`, URL);
    xhr.send(data);
  };

})();
