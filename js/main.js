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

//create mook data array
let advertisementArray = getRandomAdvs(8);

document.querySelector('.map').classList.remove('map--faded');

let similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

let similarListOfPins = document.querySelector('.map__pins');

//new code starts here
// let renderPins = function() {

// }
//new code end here

for (let i = 0; i < advertisementArray.length; i++) {

  let objItem = advertisementArray[i];

  let pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style = `left: ${objItem.location.x - PIN_WIDTH*0.5}px; top: ${objItem.location.y - PIN_HEIGHT}px`;

  pinElement.querySelector('img').src = `${objItem.author.avatar}`;

  pinElement.querySelector('img').alt = `${objItem.offer.title}`;

  similarListOfPins.appendChild(pinElement);
};

//1 выполнить требование критерия, отрисовывать через document Fragment

//2 вернуть иходное состояние страницы

//3 скопировать дз из папки draft и приступить к выполнению
