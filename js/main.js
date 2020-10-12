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
let fragmentWithPins = window.utilityGenerateMockup.getRandomAdvsInFragment(8, similarPinTemplate);
let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkValidity(priceElem, roomsQuantity, guestsQuantity);
};

const activatePage = function (evt) {
  if (!activateFlag) {
    // window.utilityGenerateMockup.renderMap(similarListOfPins, fragmentWithPins);
    window.utilityMap.renderFragment(similarListOfPins, fragmentWithPins);
    window.utilityForm.toggleDisableAttr(mapSelects);
    window.utilityForm.toggleDisableAttr(formInputs);
    activateFlag = true;
  }

  if (evt.button === 0 || evt.code === `Enter`) {
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

// ОТКЛЮЧИТЬ АВТОЗАПОЛНЕНИЕ ПОЛЕЙ
