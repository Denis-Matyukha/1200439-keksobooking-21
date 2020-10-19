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

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkValidity(priceElem, roomsQuantity, guestsQuantity);
};

const successHandler = function (advertisementArray) {
  // console.log(advertisementArray);
  let fragmentWithServerPins = window.utilityGenerateMockup.getReceivedAdvsInFragment(advertisementArray, similarPinTemplate);
  window.utilityMap.renderFragment(similarListOfPins, fragmentWithServerPins);
};

const errorHandler = function (errorMessage) {
  let node = document.createElement(`div`);
  node.style = `
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
    `;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const activatePage = function (evt) {

  if (evt.button === window.utilityData.EVENT_CODE.MOUSE_LEFT_BTN ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ENTER ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_NUMPAD_ENTER) {

    if (!activateFlag) {

      // function (onSuccess, onError)
      window.utilityLoad.getXHRequest(successHandler, errorHandler);

      window.utilityForm.toggleDisableAttr(mapSelects);
      window.utilityForm.toggleDisableAttr(formInputs);

      activateFlag = true;
    }

    mapBlock.classList.remove(`map--faded`);
    mainFormElement.classList.remove(`ad-form--disabled`);
    window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
  }
};

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
