"use strict";

const APARTMENT_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const FACILITIES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, {description: `строка с описанием`}];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAX_X_VALUE = 600;
const MAX_Y_VALUE = 350;
const MAX_PRICE = 1000000000000000;
const MAX_ROOMS_QUANTITY = 10;
const MAX_GUEST_QUANTITY = 10;
const INITIAL_Y_CORD = 180;
const FINAL_Y_CORD = 630;
const INITIAL_X_CORD = 50;
const FINAL_X_CORD = 1150;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;


let getRandomFromInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let getRandomFromArray = function(dataArr) {
  return dataArr[getRandomFromInterval(0, dataArr.length - 1)];
};

let getSetFromArrayItems = function(arr) {
  let oldArr = arr;
  let newArr = [];
  let quantityVar = getRandomFromInterval(1, arr.length);
  for (let i = 0; i < quantityVar; i++) {
      newArr.push(oldArr[i]);
  }
  return newArr;
};

let getRandomAdvs = function (numberOfAdvs) {

  let advsArray = [];

  for(let i = 0; i < numberOfAdvs; i++) {

    advsArray.push({
      author: {
        avatar: `img/avatars/user0${i+1}.png`
      },
      offer: {
        title: `Описание квартиры скоро будет здесь`,
        address: `${getRandomFromInterval(0, MAX_X_VALUE)}, ${getRandomFromInterval(0, MAX_Y_VALUE)}`,
        prise: (() => {
          let rawPrice = getRandomFromInterval(0, Math.floor(MAX_PRICE*0.00000000001));
          return rawPrice - (rawPrice % 100);
        })(),
        type: `${getRandomFromArray(APARTMENT_TYPE)}`,
        rooms: getRandomFromInterval(1, MAX_ROOMS_QUANTITY),
        guests: getRandomFromInterval(1, MAX_GUEST_QUANTITY),
        checkin: `${getRandomFromArray(CHECK_TIMES)}`,
        checkout: `${getRandomFromArray(CHECK_TIMES)}`,
        features: getSetFromArrayItems(FACILITIES),
        photos: getSetFromArrayItems(PHOTOS),
      },
      location: {
        x: getRandomFromInterval(INITIAL_X_CORD, FINAL_X_CORD),
        y: getRandomFromInterval(INITIAL_Y_CORD, FINAL_Y_CORD),
      },
    });
  }
  return advsArray;
};

let similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

let similarListOfPins = document.querySelector('.map__pins');

let fragmentWithPins = document.createDocumentFragment();

//create mook data array
let advertisementArray = getRandomAdvs(8);

let renderPins = function(singleAdvertisement) {
  let pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = singleAdvertisement.location.x - PIN_WIDTH * 0.5 +`px`;
  pinElement.style.top = singleAdvertisement.location.y - PIN_HEIGHT +`px`;
  pinElement.querySelector('img').src = singleAdvertisement.author.avatar;
  pinElement.querySelector('img').alt = singleAdvertisement.offer.title;
  return pinElement;
};

for (let i = 0; i < advertisementArray.length; i++) {
  fragmentWithPins.appendChild(renderPins(advertisementArray[i]));
};


//!!!
//must be closed during execution module4-task1
//render full document fragment
// similarListOfPins.appendChild(fragmentWithPins);

//module 4 task 1
const MAIN_PIN_SIZE = {
  width: 65,
  height: 87
};
const mapBlock = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainFormElement = document.querySelector(`.ad-form`);
const formInputs = mainFormElement.querySelectorAll(`fieldset`);
const mapFilterForm = document.querySelector(`.map__filters`);
const mapSelects = mapFilterForm.querySelectorAll(`select`);
const adressInput = mainFormElement.querySelector(`#address`);
const roomsQuantity = mainFormElement.querySelector(`#room_number`);
const titleElem = mainFormElement.querySelector(`#title`);
const priceElem = mainFormElement.querySelector(`#price`);
const guestsQuantity = mainFormElement.querySelector(`#capacity`);
const publishButton = mainFormElement.querySelector(`.ad-form__submit`);

const toggleDisableAttr = function (collectedElements) {
    for (let i = 0; i < collectedElements.length; i++) {
      collectedElements[i].toggleAttribute(`disabled`);
    }
};

const activateBloks = function (evt) {
  if (evt.button === 0 || evt.code === `Enter`) {
    mapBlock.classList.remove(`map--faded`);
    mainFormElement.classList.remove(`ad-form--disabled`);
    toggleDisableAttr(mapSelects);
    toggleDisableAttr(formInputs);
    mainPin.removeEventListener(`mousedown`, activateBloks);
    mainPin.removeEventListener(`keydown`, activateBloks);
    setMainPinCords(evt);
  }
};

const setMainPinCords = function () {
  adressInput.value = `${Math.floor(parseInt(mainPin.style.left) + MAIN_PIN_SIZE.width * 0.5)} , ${Math.floor(parseInt(mainPin.style.top) + MAIN_PIN_SIZE.height)}`;
};

const checkValidity = function () {

  let setBorderStyle = function (elem) {
    elem.style.border = `4px solid #ff7a60`;
    elem.style.transition = `0.5s`;
    setTimeout( function () {
      elem.style.border = ``;
    },3500);
  };

  if (roomsQuantity.value !== guestsQuantity.value) {
    setBorderStyle(roomsQuantity);
    setBorderStyle(guestsQuantity);
    roomsQuantity.setCustomValidity(`  Количество комнат и количество мест должны совпадать =^_^=  `);
  } else {
    roomsQuantity.setCustomValidity(``);
  }
  if (titleElem.validity.tooShort) {
    setBorderStyle(titleElem);
    titleElem.setCustomValidity(` =^_^= Пожалуйста, напишите не менее 30-ти символов. `);
  } else if (titleElem.validity.tooLong) {
    setBorderStyle(titleElem);
    titleElem.setCustomValidity(` =^_^= Постарайтесь уложиться в 100 символов. `);
  } else if (titleElem.validity.ValueMissing) {
    setBorderStyle(titleElem);
    titleElem.setCustomValidity(` =^_^= Заполните это поле, пожалуйста. `);
  } else {
    titleElem.setCustomValidity(``);
  }

  // if (priceElem.value) {}
};

toggleDisableAttr(mapSelects);
toggleDisableAttr(formInputs);
setMainPinCords();

mainPin.addEventListener(`mousedown`, activateBloks);
mainPin.addEventListener(`mousedown`, setMainPinCords);
mainPin.addEventListener(`keydown`, activateBloks);

publishButton.addEventListener(`click`, checkValidity);

//valueMissing

