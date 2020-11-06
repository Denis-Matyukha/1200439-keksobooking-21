'use strict';

const mapBlock = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);

const mainFormElement = document.querySelector(`form.ad-form`);
const mapFilterForm = document.querySelector(`.map__filters`);
const mapFilters = mapFilterForm.querySelectorAll(`select`);

const formInputs = mainFormElement.querySelectorAll(`fieldset`);
const adressArea = mainFormElement.querySelector(`#address`);
const roomsQuantity = mainFormElement.querySelector(`#room_number`);
const priceElem = mainFormElement.querySelector(`#price`);
const guestsQuantity = mainFormElement.querySelector(`#capacity`);
const housingType = mainFormElement.querySelector(`#type`);
const timeIn = mainFormElement.querySelector(`#timein`);
const timeOut = mainFormElement.querySelector(`#timeout`);

const publishButton = mainFormElement.querySelector(`.ad-form__submit`);

const filterHousingType = mapFilterForm.querySelector(`#housing-type`);

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkHouseTypePrice(priceElem, housingType);
  window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity)();
};

const successHandler = function (advertisementArray) {
  window.fullAdvertisementArray = advertisementArray;
  window.utilityCard.renderPins(advertisementArray);
  filterHousingType.addEventListener(`change`, window.utilityCard.renderPinsHolder(filterHousingType, window.fullAdvertisementArray));
};

const errorHandler = function (errorMessage) {
  let node = document.createElement(`div`);
  node.style = window.utilityLoad.ErrorWindowStyle;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const activatePage = function () {
  if (!activateFlag) {

    window.utilityLoad.getXHRequest(successHandler, errorHandler);

    window.utilityForm.toggleDisableAttr(mapFilters);
    window.utilityForm.toggleDisableAttr(formInputs);

    window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity)();
    activateFlag = true;
  }
  mapBlock.classList.remove(`map--faded`);
  mainFormElement.classList.remove(`ad-form--disabled`);
  window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
};


window.utilityForm.toggleDisableAttr(mapFilters);
window.utilityForm.toggleDisableAttr(formInputs);

window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

publishButton.addEventListener(`click`, checkForm);

housingType.addEventListener(`change`, window.utilityForm.onChangeTypeHolder(priceElem));

timeIn.addEventListener(`change`, window.utilityForm.conformityTimeHolder(timeIn, timeOut));
timeOut.addEventListener(`change`, window.utilityForm.conformityTimeHolder(timeIn, timeOut));

roomsQuantity.addEventListener(`change`, window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity));
guestsQuantity.addEventListener(`change`, window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity));

mainPin.addEventListener(`mousedown`, window.utilityMove.mainPinMoveHolder(mainPin, adressArea, activatePage));

