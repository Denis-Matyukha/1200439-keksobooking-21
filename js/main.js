// eslint-disable-next-line strict
`use strict`;

const mapBlock = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainFormElement = document.querySelector(`form.ad-form`);
const formInputs = mainFormElement.querySelectorAll(`fieldset`);
const mapFilterForm = document.querySelector(`.map__filters`);
const mapFilters = mapFilterForm.querySelectorAll(`select`);
const adressArea = mainFormElement.querySelector(`#address`);

// ↓↓↓ module4-task2 ↓↓↓
const roomsQuantity = mainFormElement.querySelector(`#room_number`);
const priceElem = mainFormElement.querySelector(`#price`);
const guestsQuantity = mainFormElement.querySelector(`#capacity`);

const housingType = mainFormElement.querySelector(`#type`);

const timeIn = mainFormElement.querySelector(`#timein`);
const timeOut = mainFormElement.querySelector(`#timeout`);

const avatarInput = mainFormElement.querySelector(`#avatar`);
const appartmentPhoto = mainFormElement.querySelector(`#images`);
// ↑↑↑ module4-task2 ↑↑↑

const publishButton = mainFormElement.querySelector(`.ad-form__submit`);
const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarListOfPins = document.querySelector(`.map__pins`);


const filterHousingType = mapFilterForm.querySelector(`#housing-type`);

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkValidity(
    priceElem,
    roomsQuantity,
    guestsQuantity,
    housingType,
    timeIn,
    timeOut,
    avatarInput,
    appartmentPhoto
  );

  // ↓
  // ↓↓
  // ↓↓↓
  // might be refactored to window.utilityForm.checkValidity()
  onChangeRoomsHolder();
  // ↑↑↑
  // ↑↑
  // ↑
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


//
// ↓
// ↓↓↓
// ↓↓↓↓↓
// move to form js module and make test (start)

// const onChangeTypeHolder = function (evt) {
//   priceElem.placeholder = window.utilityData.MIN_PRICE[evt.target.value];
// };


const conformityTimeHolder = function (evt) {
  let time = evt.target.value;
  timeIn.value = time;
  timeOut.value = time;
};


const onChangeRoomsHolder = function () {

  let guestsOptions = guestsQuantity.querySelectorAll(`option`);

  guestsOptions.forEach(function (element) {
    element.removeAttribute(`disabled`);
  });

  let validedGuestsQuantity;

  if (roomsQuantity.value === `1`) {

    validedGuestsQuantity = [`1`];

    guestsOptions.forEach(function (element) {
      element.setAttribute(`disabled`, `disabled`);
    });
    guestsOptions[2].removeAttribute(`disabled`);

  } else if (roomsQuantity.value === `2`) {

    validedGuestsQuantity = [`1`, `2`];

    guestsOptions[0].setAttribute(`disabled`, `disabled`);
    guestsOptions[3].setAttribute(`disabled`, `disabled`);

  } else if (roomsQuantity.value === `3`) {

    validedGuestsQuantity = [`1`, `2`, `3`];

    guestsOptions[3].setAttribute(`disabled`, `disabled`);

  } else if (roomsQuantity.value === `100`) {

    validedGuestsQuantity = [`0`];

    guestsOptions.forEach(function (element) {
      element.setAttribute(`disabled`, `disabled`);
    });
    guestsOptions[3].removeAttribute(`disabled`);

  }

  if (validedGuestsQuantity.indexOf(guestsQuantity.value) !== -1) {
    guestsQuantity.setCustomValidity(``);
  } else {
    window.utilityForm.setBorderErrorStyle(guestsQuantity);
    guestsQuantity.setCustomValidity(` Укажите другое доступное количетво гостей для ${roomsQuantity.value} комнат`);
  }

};
// move to form js module and make test (end)
// ↑↑↑↑↑
// ↑↑↑
// ↑
//

window.utilityForm.toggleDisableAttr(mapFilters);
window.utilityForm.toggleDisableAttr(formInputs);

window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

mainPin.addEventListener(`click`, activatePage);
publishButton.addEventListener(`click`, checkForm);

// housingType.addEventListener(`change`, onChangeTypeHolder);
housingType.addEventListener(`change`, window.utilityForm.onChangeTypeHolder);


timeIn.addEventListener(`change`, conformityTimeHolder);
timeOut.addEventListener(`change`, conformityTimeHolder);


roomsQuantity.addEventListener(`change`, onChangeRoomsHolder);
guestsQuantity.addEventListener(`change`, onChangeRoomsHolder);


// сделать валидацию полей input type file
