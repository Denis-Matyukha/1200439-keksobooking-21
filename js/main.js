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

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkHouseTypePrice(priceElem, housingType);
  window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity)();
};

let lastTimeout;

const successHandler = function (advertisementArray) {
  window.fullAdvertisementArray = advertisementArray;
  window.utilityCard.renderPins(advertisementArray);

  mapFilterForm.addEventListener(`change`, function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.utilityMap.renderFilteredPins(mapFilterForm, window.fullAdvertisementArray);
    }, window.utilityMap.DEBOUNCE_TIMEOUT);
  });
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

const deActivatePage = function () {
  window.utilityForm.toggleDisableAttr(mapFilters);
  window.utilityForm.toggleDisableAttr(formInputs);
  activateFlag = false;
  mapBlock.classList.add(`map--faded`);
  mainFormElement.classList.add(`ad-form--disabled`);
  window.utilityCard.removeExistedAdvCard();
  window.utilityCard.removeExistedPins();
  window.utilityMap.returnInitialLocation(mainPin);
  window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
};

window.utilityForm.toggleDisableAttr(mapFilters);
window.utilityForm.toggleDisableAttr(formInputs);

window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

publishButton.addEventListener(`click`, checkForm);

mainFormElement.addEventListener(`submit`, function (evt) {
  window.utilityUpload(new FormData(mainFormElement), function (response) {
    if (response.status === window.utilityLoad.StatusCode.Ok) {
      mainFormElement.reset();
      deActivatePage();
      let successMessageElement = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
      document.body.insertAdjacentElement(`afterbegin`, successMessageElement);
      window.utilityForm.addRemoveListeners(successMessageElement);
    } else {
      let errorMessageElement = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
      let errorButton = errorMessageElement.querySelector(`.error__button`);
      document.querySelector(`main`).insertAdjacentElement(`beforeend`, errorMessageElement);
      errorButton.addEventListener(`click`, function () {
        errorMessageElement.remove();
      });
      window.utilityForm.addRemoveListeners(errorMessageElement);
    }
  });
  evt.preventDefault();
});

housingType.addEventListener(`change`, window.utilityForm.onChangeTypeHolder(priceElem));

timeIn.addEventListener(`change`, window.utilityForm.conformityTimeHolder(timeIn, timeOut));
timeOut.addEventListener(`change`, window.utilityForm.conformityTimeHolder(timeIn, timeOut));

roomsQuantity.addEventListener(`change`, window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity));
guestsQuantity.addEventListener(`change`, window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity));

mainPin.addEventListener(`mousedown`, window.utilityMove.mainPinMoveHolder(mainPin, adressArea, activatePage));
