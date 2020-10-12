"use strict";
// data.js
// `use strict`;
// MODULE
(function () {
  // data.js
  window.utilityData = {

    APARTMENT_TYPE: [`palace`, `flat`, `house`, `bungalow`],
    CHECK_TIMES: [`12:00`, `13:00`, `14:00`],
    FACILITIES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, {description: `строка с описанием`}],
    PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
    MAX_X_VALUE: 600,
    MAX_Y_VALUE: 350,
    MAX_ROOMS_QUANTITY: 3,
    MAX_GUEST_QUANTITY: 3,
    INITIAL_Y_CORD: 180,
    FINAL_Y_CORD: 630,
    INITIAL_X_CORD: 50,
    FINAL_X_CORD: 1150,
    ADV_PIN_WIDTH: 50,
    ADV_PIN_HEIGHT: 70,
    MAX_PRICE_AVAILABLE: 1000000,
    MIN_PRICE_AVAILABLE: 1000,
    PIN_BOTTOM_HEIGHT: 22,

  };

})();
// (function () {
// })();

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




// MODULE
(function () {
// form.js
  window.utilityForm = {
    toggleDisableAttr: function(collectedElements) {
      for (let i = 0; i < collectedElements.length; i++) {
        collectedElements[i].toggleAttribute(`disabled`);
      }
    },
    setTargetCords: function(elemPlaceholder, elemTarget, correctionValue = 0) {
      elemPlaceholder.value = `${Math.floor(parseInt(elemTarget.style.left) + elemTarget.clientWidth * 0.5)} ,
 ${Math.floor(parseInt(elemTarget.style.top) + elemTarget.clientHeight + correctionValue)}`;
    },
  };
})();
// window.utilityForm.setTargetCords(elemPlaceholder,elemTarget);

// const toggleDisableAttr = function (collectedElements) {
//   for (let i = 0; i < collectedElements.length; i++) {
//     collectedElements[i].toggleAttribute(`disabled`);
//   }
// };

// const setMainPinCords = function () {
//   adressInput.value =
// `${Math.floor(parseInt(mainPin.style.left) + window.utilityData.MAIN_PIN_SIZE.width * 0.5)} ,
// ${Math.floor(parseInt(mainPin.style.top) + window.utilityData.MAIN_PIN_SIZE.height)}`;
// };



// get random advs start
// MODULE
(function () {
  // mockupgenerator.js
  // generate mock data
  // window.utilityGenerateMockup.
  window.utilityGenerateMockup = {
    getRandomFromInterval: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomFromArray: function (dataArr) {
      return dataArr[window.utilityGenerateMockup.getRandomFromInterval(0, dataArr.length - 1)];
    },
    getSetFromArrayItems: function (arr) {
      let newArr = [];
      let quantityVar = window.utilityGenerateMockup.getRandomFromInterval(1, arr.length);
      for (let i = 0; i < quantityVar; i++) {
        newArr.push(arr[i]);
      }
      return newArr;
    },
    getRandomAdvs: function (numberOfAdvs) {
      let advsArray = [];
      for (let i = 0; i < numberOfAdvs; i++) {
        advsArray.push({
          author: {
            avatar: `img/avatars/user0${i + 1}.png`
          },
          offer: {
            title: `Описание квартиры скоро будет здесь`,
            address: `${window.utilityGenerateMockup.getRandomFromInterval(0, window.utilityData.MAX_X_VALUE)}, ${window.utilityGenerateMockup.getRandomFromInterval(0, window.utilityData.MAX_Y_VALUE)}`,
            prise: (() => {
              let rawPrice = window.utilityGenerateMockup.getRandomFromInterval(0, Math.floor(window.utilityData.MAX_PRICE_AVAILABLE));
              return rawPrice - (rawPrice % 100);
            })(),
            type: `${window.utilityGenerateMockup.getRandomFromArray(window.utilityData.APARTMENT_TYPE)}`,
            rooms: window.utilityGenerateMockup.getRandomFromInterval(1, window.utilityData.MAX_ROOMS_QUANTITY),
            guests: window.utilityGenerateMockup.getRandomFromInterval(1, window.utilityData.MAX_GUEST_QUANTITY),
            checkin: `${window.utilityGenerateMockup.getRandomFromArray(window.utilityData.CHECK_TIMES)}`,
            checkout: `${window.utilityGenerateMockup.getRandomFromArray(window.utilityData.CHECK_TIMES)}`,
            features: window.utilityGenerateMockup.getSetFromArrayItems(window.utilityData.FACILITIES),
            photos: window.utilityGenerateMockup.getSetFromArrayItems(window.utilityData.PHOTOS),
          },
          location: {
            x: window.utilityGenerateMockup.getRandomFromInterval(window.utilityData.INITIAL_X_CORD, window.utilityData.FINAL_X_CORD),
            y: window.utilityGenerateMockup.getRandomFromInterval(window.utilityData.INITIAL_Y_CORD, window.utilityData.FINAL_Y_CORD),
          },
        });
      }
      console.log(`it_works!`);
      console.log(advsArray);
      return advsArray;
    },
    renderPins: function (singleAdvertisement, contentElem) {
      let singleElement = contentElem.cloneNode(true);
      singleElement.style.left = singleAdvertisement.location.x - window.utilityData.ADV_PIN_WIDTH * 0.5 + `px`;
      singleElement.style.top = singleAdvertisement.location.y - window.utilityData.ADV_PIN_HEIGHT + `px`;
      singleElement.querySelector(`img`).src = singleAdvertisement.author.avatar;
      singleElement.querySelector(`img`).alt = singleAdvertisement.offer.title;
      return singleElement;
    },
    getRandomAdvsInFragment: function (numberOfAdvs, contentElem) {
      let targetTemplate = document.createDocumentFragment();
      let advsArray = window.utilityGenerateMockup.getRandomAdvs(numberOfAdvs);
      for (let i = 0; i < advsArray.length; i++) {
        targetTemplate.appendChild(window.utilityGenerateMockup.renderPins(advsArray[i], contentElem));
      };
      return targetTemplate;
    },
    renderMap: function (listElem, fragmentElem) {
      return listElem.appendChild(fragmentElem);
    },
  };
})();

// let getRandomFromInterval = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// let getRandomFromArray = function (dataArr) {
//   return dataArr[getRandomFromInterval(0, dataArr.length - 1)];
// };

// let getSetFromArrayItems = function (arr) {
//   let oldArr = arr;
//   let newArr = [];
//   let quantityVar = getRandomFromInterval(1, arr.length);
//   for (let i = 0; i < quantityVar; i++) {
//     newArr.push(oldArr[i]);
//   }
//   return newArr;
// };

// let getRandomAdvs = function (numberOfAdvs) {

//   let advsArray = [];

//   for (let i = 0; i < numberOfAdvs; i++) {

//     advsArray.push({
//       author: {
//         avatar: `img/avatars/user0${i + 1}.png`
//       },
//       offer: {
//         title: `Описание квартиры скоро будет здесь`,
//         address: `${getRandomFromInterval(0, window.utilityData.MAX_X_VALUE)}, ${getRandomFromInterval(0, window.utilityData.MAX_Y_VALUE)}`,
//         prise: (() => {
//           let rawPrice = getRandomFromInterval(0, Math.floor(window.utilityData.MAX_PRICE_AVAILABLE));
//           return rawPrice - (rawPrice % 100);
//         })(),
//         type: `${getRandomFromArray(window.utilityData.APARTMENT_TYPE)}`,
//         rooms: getRandomFromInterval(1, window.utilityData.MAX_ROOMS_QUANTITY),
//         guests: getRandomFromInterval(1, window.utilityData.MAX_GUEST_QUANTITY),
//         checkin: `${getRandomFromArray(window.utilityData.CHECK_TIMES)}`,
//         checkout: `${getRandomFromArray(window.utilityData.CHECK_TIMES)}`,
//         features: getSetFromArrayItems(window.utilityData.FACILITIES),
//         photos: getSetFromArrayItems(window.utilityData.PHOTOS),
//       },
//       location: {
//         x: getRandomFromInterval(window.utilityData.INITIAL_X_CORD, window.utilityData.FINAL_X_CORD),
//         y: getRandomFromInterval(window.utilityData.INITIAL_Y_CORD, window.utilityData.FINAL_Y_CORD),
//       },
//     });
//   }
//   console.log(advsArray);
//   return advsArray;
// };




let similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

let similarListOfPins = document.querySelector(`.map__pins`);

// let fragmentWithPins = document.createDocumentFragment();

// create mook data array
// !!!!!!!!!!!
// let advertisementArray = window.utilityGenerateMockup.getRandomAdvs(8);
// !!!!!!!!!!!
// let advertisementArray =

// window.utilityGenerateMockup.getRandomAdvsInFragment(8, fragmentWithPins, similarPinTemplate);
// return targetTemplate with Pins

let fragmentWithPins = window.utilityGenerateMockup.getRandomAdvsInFragment(8, similarPinTemplate);

// MODULE
// window.utilMapFunction = function (listElem, fragmentElem) {
//   return listElem.appendChild(fragmentElem);
// };

// window.utilMapFunction(similarListOfPins, fragmentWithPinsUpdated);

// !!!!!!!!!!!
// window.utilMapFunction = function () {
//   return similarListOfPins.appendChild(fragmentWithPins);
// };
// !!!!!!!!!!!
// (function () {

// let renderPins = function (singleAdvertisement) {
//   let singleElement = similarPinTemplate.cloneNode(true);
//   singleElement.style.left = singleAdvertisement.location.x - window.utilityData.ADV_PIN_WIDTH * 0.5 + `px`;
//   singleElement.style.top = singleAdvertisement.location.y - window.utilityData.ADV_PIN_HEIGHT + `px`;
//   singleElement.querySelector(`img`).src = singleAdvertisement.author.avatar;
//   singleElement.querySelector(`img`).alt = singleAdvertisement.offer.title;
//   return singleElement;
// };

// for (let i = 0; i < advertisementArray.length; i++) {
//   fragmentWithPins.appendChild(renderPins(advertisementArray[i]));
// }

// })();


// !!!!!!!!!!!
// let renderPins = function (singleAdvertisement) {
//   let pinElement = similarPinTemplate.cloneNode(true);
//   pinElement.style.left = singleAdvertisement.location.x - window.utilityData.ADV_PIN_WIDTH * 0.5 + `px`;
//   pinElement.style.top = singleAdvertisement.location.y - window.utilityData.ADV_PIN_HEIGHT + `px`;
//   pinElement.querySelector(`img`).src = singleAdvertisement.author.avatar;
//   pinElement.querySelector(`img`).alt = singleAdvertisement.offer.title;
//   return pinElement;
// };

// for (let i = 0; i < advertisementArray.length; i++) {
//   fragmentWithPins.appendChild(renderPins(advertisementArray[i]));
// }
// !!!!!!!!!!!

// must be closed during execution module4-task1
// render mook full document fragment
// similarListOfPins.appendChild(fragmentWithPins);

// rendering mook data document fragment from another module
// similarListOfPins.appendChild(fragmentWithPins);

// window.utilMapFunction = function () {
//   return similarListOfPins.appendChild(fragmentWithPins);
// };
// get random advs end

const setBorderErrorStyle = function (elem) {
  elem.style.border = `1px solid #ffaa99`;
  elem.style.boxShadow = `0 0 2px 2px #ff6547`;
  elem.style.transition = `0.5s`;
  setTimeout(function () {
    elem.style.border = ``;
    elem.style.boxShadow = ``;
  }, 3500);
};

const checkValidity = function () {
  if (priceElem.value < window.utilityData.MIN_PRICE_AVAILABLE || priceElem.value > window.utilityData.MAX_PRICE_AVAILABLE) {
    setBorderErrorStyle(priceElem);
    priceElem.setCustomValidity(`  Пожалуйста, укажите сумму от 1000 до миллиона =^_^=  `);
  } else {
    priceElem.setCustomValidity(``);
  }
  if (roomsQuantity.value !== guestsQuantity.value) {
    setBorderErrorStyle(roomsQuantity);
    setBorderErrorStyle(guestsQuantity);
    roomsQuantity.setCustomValidity(`  Количество комнат и количество мест должны совпадать =^_^=  `);
  } else {
    roomsQuantity.setCustomValidity(``);
  }
};


const activatePage = function (evt) {
  if (!activateFlag) {

    // window.utilMapFunction(similarListOfPins, fragmentWithPinsUpdated);
    window.utilityGenerateMockup.renderMap(similarListOfPins, fragmentWithPins);

    window.utilityForm.toggleDisableAttr(mapSelects);
    window.utilityForm.toggleDisableAttr(formInputs);
    activateFlag = true;
  }

  if (evt.button === 0 || evt.code === `Enter`) {
    mapBlock.classList.remove(`map--faded`);
    mainFormElement.classList.remove(`ad-form--disabled`);
    // setMainPinCords();
    window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

  }

};


window.utilityForm.toggleDisableAttr(mapSelects);
window.utilityForm.toggleDisableAttr(formInputs);
// setMainPinCords();
window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);


mainPin.addEventListener(`mousedown`, function (evt) {
  activatePage(evt);
  // setMainPinCords();
  window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
});
mainPin.addEventListener(`keydown`, activatePage);
publishButton.addEventListener(`click`, checkValidity);


// toggleDisableAttr(mapSelects);
// toggleDisableAttr(formInputs);
// setMainPinCords();

// mainPin.addEventListener(`mousedown`, function (evt) {
//   activatePage(evt);
//   setMainPinCords(evt);
// });

// mainPin.addEventListener(`keydown`, activatePage);

// publishButton.addEventListener(`click`, checkValidity);

// })();


// map.js
// `use strict`;
// (function(){

// let getRandomFromInterval = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// let getRandomFromArray = function (dataArr) {
//   return dataArr[getRandomFromInterval(0, dataArr.length - 1)];
// };

// let getSetFromArrayItems = function (arr) {
//   let oldArr = arr;
//   let newArr = [];
//   let quantityVar = getRandomFromInterval(1, arr.length);
//   for (let i = 0; i < quantityVar; i++) {
//     newArr.push(oldArr[i]);
//   }
//   return newArr;
// };

// let getRandomAdvs = function (numberOfAdvs) {

//   let advsArray = [];

//   for (let i = 0; i < numberOfAdvs; i++) {

//     advsArray.push({
//       author: {
//         avatar: `img/avatars/user0${i + 1}.png`
//       },
//       offer: {
//         title: `Описание квартиры скоро будет здесь`,
//         address: `${getRandomFromInterval(0, window.utilityData.MAX_X_VALUE)}, ${getRandomFromInterval(0, window.utilityData.MAX_Y_VALUE)}`,
//         prise: (() => {
//           let rawPrice = getRandomFromInterval(0, Math.floor(window.utilityData.MAX_PRICE_AVAILABLE));
//           return rawPrice - (rawPrice % 100);
//         })(),
//         type: `${getRandomFromArray(window.utilityData.APARTMENT_TYPE)}`,
//         rooms: getRandomFromInterval(1, window.utilityData.MAX_ROOMS_QUANTITY),
//         guests: getRandomFromInterval(1, window.utilityData.MAX_GUEST_QUANTITY),
//         checkin: `${getRandomFromArray(window.utilityData.CHECK_TIMES)}`,
//         checkout: `${getRandomFromArray(window.utilityData.CHECK_TIMES)}`,
//         features: getSetFromArrayItems(window.utilityData.FACILITIES),
//         photos: getSetFromArrayItems(window.utilityData.PHOTOS),
//       },
//       location: {
//         x: getRandomFromInterval(window.utilityData.INITIAL_X_CORD, window.utilityData.FINAL_X_CORD),
//         y: getRandomFromInterval(window.utilityData.INITIAL_Y_CORD, window.utilityData.FINAL_Y_CORD),
//       },
//     });
//   }
//   console.log(advsArray);
//   return advsArray;
// };


// let similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// let similarListOfPins = document.querySelector(`.map__pins`);

// let fragmentWithPins = document.createDocumentFragment();

// // create mook data array
// let advertisementArray = getRandomAdvs(8);

// let renderPins = function (singleAdvertisement) {
//   let pinElement = similarPinTemplate.cloneNode(true);
//   pinElement.style.left = singleAdvertisement.location.x - window.utilityData.ADV_PIN_WIDTH * 0.5 + `px`;
//   pinElement.style.top = singleAdvertisement.location.y - window.utilityData.ADV_PIN_HEIGHT + `px`;
//   pinElement.querySelector(`img`).src = singleAdvertisement.author.avatar;
//   pinElement.querySelector(`img`).alt = singleAdvertisement.offer.title;
//   return pinElement;
// };

// for (let i = 0; i < advertisementArray.length; i++) {
//   fragmentWithPins.appendChild(renderPins(advertisementArray[i]));
// }

// // must be closed during execution module4-task1
// // render mook full document fragment
// // similarListOfPins.appendChild(fragmentWithPins);

// // rendering mook data document fragment from another module
// // similarListOfPins.appendChild(fragmentWithPins);

// window.utilMapFunction = function () {
//   return similarListOfPins.appendChild(fragmentWithPins);
// };

// })();





// ОТКЛЮЧИТЬ АВТОЗАПОЛНЕНИЕ ПОЛЕЙ
