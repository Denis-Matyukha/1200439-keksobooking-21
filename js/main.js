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
const housingTypeField = mapFilterForm.querySelector(`#housing-type`);

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkValidity(priceElem, roomsQuantity, guestsQuantity);
};

const successHandler = function (advertisementArray) {
  window.fullAdvertisementArray = advertisementArray;
  renderPins(advertisementArray);

  // ! ! !
  // this line should exist only while module3-task1 is under checking
  mapBlock.insertAdjacentElement(`beforeend`,window.utilityGenerateMockup.createCard(window.fullAdvertisementArray[0], document.querySelector(`#card`)));
  //  delete this line after checking

};

housingTypeField.addEventListener(`change`, function () {

  let hosingType = housingTypeField.value;
  let arrayForRender = (window.fullAdvertisementArray).filter(function (advertisement) {
    return advertisement.offer.type === hosingType;
  });

  arrayForRender = arrayForRender.concat(window.fullAdvertisementArray);
  arrayForRender = arrayForRender.filter(function (advertisement, index) {
    return arrayForRender.indexOf(advertisement) === index;
  });

  renderPins(arrayForRender);
});

const renderPins = function (pinsArray) {

  let oldPins = document.querySelectorAll(`.map__pin`);
  let oldPinsExceptMain = (Array.from(oldPins)).slice(1);
  oldPinsExceptMain.forEach(function (elem) {
    elem.remove();
  });
  let pinsFragment = window.utilityGenerateMockup.getReceivedAdvsInFragment(pinsArray.slice(0, window.utilityData.RENDERING_PINS_QUANTITY), similarPinTemplate);
  window.utilityMap.renderFragment(similarListOfPins, pinsFragment);
};

const errorHandler = function (errorMessage) {

  let node = document.createElement(`div`);
  node.style = window.utilityLoad.ErrorWindowStyle;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const activatePage = function (evt) {

  if (evt.button === window.utilityData.EVENT_CODE.MOUSE_LEFT_BTN ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ENTER ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_NUMPAD_ENTER) {

    if (!activateFlag) {

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
