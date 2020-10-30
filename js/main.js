// eslint-disable-next-line strict
`use strict`;

const mapBlock = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainFormElement = document.querySelector(`.ad-form`);
const formInputs = mainFormElement.querySelectorAll(`fieldset`);
const mapFilterForm = document.querySelector(`.map__filters`);
const mapFilters = mapFilterForm.querySelectorAll(`select`);
const adressArea = mainFormElement.querySelector(`#address`);

// ↓↓↓ module4-task2 ↓↓↓
const roomsQuantity = mainFormElement.querySelector(`#room_number`);
const priceElem = mainFormElement.querySelector(`#price`);
const guestsQuantity = mainFormElement.querySelector(`#capacity`);

const housingType = mainFormElement.querySelector(`#housing-type`);
// ↑↑↑ module4-task2 ↑↑↑

const publishButton = mainFormElement.querySelector(`.ad-form__submit`);
const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarListOfPins = document.querySelector(`.map__pins`);


const filterHousingType = mapFilterForm.querySelector(`#housing-type`);

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkValidity(priceElem, roomsQuantity, guestsQuantity);
};

const removeExistedAdvCard = function () {
  let existedCard = mapBlock.querySelector(`article.map__card`);
  if (existedCard) {
    existedCard.remove();
  }
  if (window.activePinElement) {
    window.activePinElement.classList.remove(`map__pin--active`);
  }
};

let bodyKeydownEscHolder = function (evt) {
  if (evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ESCAPE) {
    removeExistedAdvCard();
    document.body.removeEventListener(`keydown`, bodyKeydownEscHolder);
  }
};

let elemCrossClickHolder = function (evt) {
  evt.target.parentNode.remove();
  document.body.removeEventListener(`keydown`, bodyKeydownEscHolder);
};

const addEscHolder = function (element) {
  return function () {
    element.addEventListener(`click`, elemCrossClickHolder);
    document.body.addEventListener(`keydown`, bodyKeydownEscHolder);
  };
};

const successHandler = function (advertisementArray) {
  window.fullAdvertisementArray = advertisementArray;
  renderPins(advertisementArray);
};

filterHousingType.addEventListener(`change`, function () {

  let hosingType = filterHousingType.value;
  let arrayForRender = (window.fullAdvertisementArray).filter(function (advertisement) {
    return advertisement.offer.type === hosingType;
  });

  arrayForRender = arrayForRender.concat(window.fullAdvertisementArray);
  arrayForRender = arrayForRender.filter(function (advertisement, index) {
    return arrayForRender.indexOf(advertisement) === index;
  });

  renderPins(arrayForRender);
  removeExistedAdvCard();
});

const renderPins = function (pinsArray) {

  let oldPins = document.querySelectorAll(`.map__pin`);
  let oldPinsExceptMain = (Array.from(oldPins)).slice(1);
  oldPinsExceptMain.forEach(function (elem) {
    elem.remove();
  });

  let pinsFragment = window.utilityGenerateMockup.getReceivedAdvsInFragment(pinsArray.slice(0, window.utilityData.RENDERING_PINS_QUANTITY), similarPinTemplate);
  window.utilityMap.renderFragment(similarListOfPins, pinsFragment);

  refreshPinsCardsListener();
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
    activateFlag = true;
  }
  mapBlock.classList.remove(`map--faded`);
  mainFormElement.classList.remove(`ad-form--disabled`);
  window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
};

const renderMatchedObjectCard = function (pinTitle) {
  let matchedObj = window.utilityGenerateMockup.getMatchedObjectByTitle(window.fullAdvertisementArray, pinTitle);
  mapBlock.insertAdjacentElement(`afterbegin`, window.utilityGenerateMockup.createCard(matchedObj, document.querySelector(`#card`)));
  let existedCard = mapBlock.querySelector(`article.map__card`);
  addEscHolder(existedCard.querySelector(`button.popup__close`))();
};

const activatePinsCard = function (evt) {
  removeExistedAdvCard();
  if (evt.target.childNodes.length) {
    window.activePinElement = evt.target;
    window.activePinElement.classList.add(`map__pin--active`);
    let targetElemTitle = evt.target.childNodes[0].alt;
    renderMatchedObjectCard(targetElemTitle);
  } else {
    // different code line ↓
    window.activePinElement = evt.target.parentNode;
    window.activePinElement.classList.add(`map__pin--active`);
    // different code line ↓
    let targetElemTitle = evt.target.alt;
    renderMatchedObjectCard(targetElemTitle);
  }
};

const refreshPinsCardsListener = function () {

  let currentPins = document.querySelectorAll(`.map__pin`);
  let currentPinsExceptMain = (Array.from(currentPins)).slice(1);

  for (let currentPin of currentPinsExceptMain) {
    currentPin.addEventListener(`click`, activatePinsCard);
  }
};

window.utilityForm.toggleDisableAttr(mapFilters);
window.utilityForm.toggleDisableAttr(formInputs);

window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

mainPin.addEventListener(`click`, activatePage);
publishButton.addEventListener(`click`, checkForm);
