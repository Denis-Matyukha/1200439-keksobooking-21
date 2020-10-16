"use strict";

const mapBlock = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainFormElement = document.querySelector(`.ad-form`);
const formInputs = mainFormElement.querySelectorAll(`fieldset`);
const mapFilterForm = document.querySelector(`.map__filters`);
const mapSelects = mapFilterForm.querySelectorAll(`select`);
const adressInput = mainFormElement.querySelector(`#address`);
const roomsQuantity = mainFormElement.querySelector(`#room_number`);
const priceElem = mainFormElement.querySelector(`#price`);
const guestsQuantity = mainFormElement.querySelector(`#capacity`);
const publishButton = mainFormElement.querySelector(`.ad-form__submit`);
const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarListOfPins = document.querySelector(`.map__pins`);
// !!! mockup array here
// let fragmentWithPins = window.utilityGenerateMockup.getRandomAdvsInFragment(8, similarPinTemplate);
let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkValidity(priceElem, roomsQuantity, guestsQuantity);
};

// !!!
// const activatePage = function (evt) {

//   if (evt.button === window.utilityData.EVENT_CODE.MOUSE_LEFT_BTN ||
//       evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ENTER ||
//       evt.code === window.utilityData.EVENT_CODE.KEYBOARD_NUMPAD_ENTER) {

//     if (!activateFlag) {
//       window.utilityMap.renderFragment(similarListOfPins, fragmentWithPins);
//       window.utilityForm.toggleDisableAttr(mapSelects);
//       window.utilityForm.toggleDisableAttr(formInputs);
//       activateFlag = true;
//     }

//     mapBlock.classList.remove(`map--faded`);
//     mainFormElement.classList.remove(`ad-form--disabled`);
//     window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
//   }
// };
// !!!
const activatePage = function (evt) {

  if (evt.button === window.utilityData.EVENT_CODE.MOUSE_LEFT_BTN ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ENTER ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_NUMPAD_ENTER) {

    // if (!activateFlag) {

    //   window.utilityMap.renderFragment(similarListOfPins, fragmentWithPins);

    //   window.utilityForm.toggleDisableAttr(mapSelects);
    //   window.utilityForm.toggleDisableAttr(formInputs);
    //   activateFlag = true;
    if (!activateFlag) {

      // MODULE load START
      window.utilityLoad.getXHR();
      // MODULE load END

        // link fragmentWithServerPins with window utilyty
      // window.utilityMap.renderFragment(similarListOfPins, fragmentWithServerPins);
      window.utilityForm.toggleDisableAttr(mapSelects);
      window.utilityForm.toggleDisableAttr(formInputs);

      activateFlag = true;
    }

    mapBlock.classList.remove(`map--faded`);
    mainFormElement.classList.remove(`ad-form--disabled`);
    window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
  }
};
// !!!

// initializing primary disabled condition
window.utilityForm.toggleDisableAttr(mapSelects);
window.utilityForm.toggleDisableAttr(formInputs);

window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

mainPin.addEventListener(`mousedown`, function (evt) {
  activatePage(evt);
  window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
});

mainPin.addEventListener(`keydown`, activatePage);

publishButton.addEventListener(`click`, checkForm);


/*
Задания модуля 6 и алгоритм действий:

[ ] Создайте новый модуль и опишите в нем функции взаимодействия удалённым сервером через XHR.
    В этом задании ограничимся получением данных с сервера при помощи объекта XMLHttpRequest.

[ ] Подключите модуль в index.html и протестируйте решение.

[ ] Доработайте модуль для отрисовки меток на карте так, чтобы в качестве данных
    использовались не случайно сгенерированные объекты, а те данные, которые вы загрузите
    с сервера: https://21.javascript.pages.academy/keksobooking/data.

[ ] Добавьте обработку возможных ошибок при загрузке: создайте DOM-элемент,
    который будет показывать сообщения об ошибках, произошедших по ходу загрузки данных.
    Дизайн DOM-элемента предлагается придумать самостоятельно.

[ ] Переписать модули через this и проверить работоспособность

[ ] Вызов стрелочной функции => поменять на function

[ ] Посмотреть где вызов отрисовки и где вызов отрисовки без аргумента количества 8

[ ] В коде протестировать удаление слешателей событий (чз dev tools)

[ ] Посмотреть в коде где применяются замыкания return function

[ ] В коде модуля 6 сделать const ответов сервера (см конспект курса js)

[ ]
 */

/*
     // _________________________________ для справки 1

  'use strict';
  (function () {
    var URL = 'https://21.javascript.pages.academy/code-and-magick/data';

    window.load = function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

      xhr.send();
    };
  })();

_____________
  var URL = 'https://21.javascript.pages.academy/code-and-magick/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
_____________

  window.load(function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  }, function() {});

____________
Вынесём для удобства обработчик успешной загрузки и обработчик ошибки в переменные.
____________
var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
____________

     // _________________________________ для справки 2

    xhr.addEventListener('load', function () {
      console.log(xhr.status + ' ' + xhr.statusText);
    });

    Мы рассчитываем на то, что сервер пришлёт в ответе JSON, но может случиться, что
    данные будут некорректными. В этом случае вызов JSON.parse выдаст ошибку.
    Чтобы ошибка не остановила выполнение программы, обернём вызов JSON.parse в try...catch.

    xhr.addEventListener('load', function () {
      try {
        console.log(JSON.parse(xhr.responseText));
      } catch (err) {
        console.error(err.message);
      }
    });

    Чтобы не нужно было явно вызывать JSON.parse и каждый раз оборачивать его в try...catch, можно
    воспользоваться полем responseType, чтобы браузер произвёл необходимые трансформации сам, а мы
    получили бы только результат в поле xhr.response.

    Однако, в таком случае должна быть 100% гарантия, что сервер вернёт данные в указанном формате.
    Иначе в свойстве response будет null.

    'use strict';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      console.log(xhr.status + ' ' + xhr.statusText);
      console.log(xhr.response);
    });

    xhr.open('GET', 'https://up.htmlacademy.ru/assets/javascript/demo/8-xhr/data.json');

    xhr.send();

    Мы рассмотрели только хороший случай, когда данные у нас есть и они правильные.
    Но что произойдёт, если адрес, по которому мы запрашиваем данные, вернёт ошибку?

    В таком случае ошибку нужно обработать... например, в уже знакомой вам конструкции switch
    в зависимости от кода ошибки показать понятное человеку сообщение.

    'use strict';

    var onError = function (message) {
      console.error(message);
    };

    var onSuccess = function (animals) {
      console.log(animals);
    };

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000;

    xhr.open('GET', 'https://up.htmlacademy.ru/assets/javascript/demo/8-xhr/unknownfile.json');

    xhr.send();

    // _________________________________
    Кстати, если чуть-чуть переименовать переменные и подрефакторить, код по загрузке данных
    можно сделать универсальным, и тогда его можно вынести в отдельный модуль.

    'use strict';

    (function () {
      window.load = function (url, onSuccess, onError) {
        var xhr = new XMLHttpRequest();

        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            var error;
            switch (xhr.status) {
                case 200:
                    onSuccess(xhr.response);
                    break;

                case 400:
                    error = 'Неверный запрос';
                    break;
                case 401:
                    error = 'Пользователь не авторизован';
                    break;
                case 404:
                    error = 'Ничего не найдено';
                    break;

                default:
                    error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
            }

            if (error) {
                onError(error);
            }
        });

        xhr.addEventListener('error', function () {
          onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', function () {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });

        xhr.timeout = 10000; // 10s

        xhr.open('GET', url);
        xhr.send();
      }
    })();

    // _________________________________
 */
