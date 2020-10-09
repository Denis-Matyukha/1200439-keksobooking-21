
`use strict`;
//module 4 task 1
// const MAX_PRICE_AVAILABLE = 1000000;
// const MIN_PRICE_AVAILABLE = 1000;
//     const MAIN_PIN_SIZE = {
//       width: 65,
//       height: 87
//     };
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
let activateFlag = false;

const toggleDisableAttr = function (collectedElements) {
    for (let i = 0; i < collectedElements.length; i++) {
      collectedElements[i].toggleAttribute(`disabled`);
    }
};

const activatePage = function (evt) {
  if (!activateFlag) {
    //rendering mook data document fragment from another module
    similarListOfPins.appendChild(fragmentWithPins);

    toggleDisableAttr(mapSelects);
    toggleDisableAttr(formInputs);
    activateFlag = true;
  };
  if (evt.button === 0 || evt.code === `Enter`) {
    mapBlock.classList.remove(`map--faded`);
    mainFormElement.classList.remove(`ad-form--disabled`);
    setMainPinCords(evt);
  }
};

const setMainPinCords = function () {
  adressInput.value =
`${Math.floor(parseInt(mainPin.style.left) + window.dataUtil.MAIN_PIN_SIZE.width * 0.5)} ,
 ${Math.floor(parseInt(mainPin.style.top) + window.dataUtil.MAIN_PIN_SIZE.height)}`;
};

const setBorderErrorStyle = function (elem) {
  elem.style.border = `4px solid #ff7a60`;
  elem.style.transition = `0.5s`;
  setTimeout( function () {
    elem.style.border = ``;
  },3500);
};

const checkValidity = function () {
  if (priceElem.value < window.dataUtil.MIN_PRICE_AVAILABLE || priceElem.value > window.dataUtil.MAX_PRICE_AVAILABLE) {
    setBorderErrorStyle(priceElem);
    priceElem.setCustomValidity(`  Пожалуйста, укажите сумму от 1000 до миллиона =^_^=  `);
  } else {
    priceElem.setCustomValidity(``);
  };
  if (roomsQuantity.value !== guestsQuantity.value) {
    setBorderErrorStyle(roomsQuantity);
    setBorderErrorStyle(guestsQuantity);
    roomsQuantity.setCustomValidity(`  Количество комнат и количество мест должны совпадать =^_^=  `);
  } else {
    roomsQuantity.setCustomValidity(``);
  };
};

toggleDisableAttr(mapSelects);
toggleDisableAttr(formInputs);
setMainPinCords();

mainPin.addEventListener(`mousedown`, function (evt) {
  activatePage(evt);
  setMainPinCords(evt);
});

mainPin.addEventListener(`keydown`, activatePage);

publishButton.addEventListener(`click`, checkValidity);
