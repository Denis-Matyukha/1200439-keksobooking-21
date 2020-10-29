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

// ↓
// ↓↓
// ↓↓↓ should move to load.js ↓↓↓
const successHandler = function (advertisementArray) {
  window.fullAdvertisementArray = advertisementArray;
  renderPins(advertisementArray);

  // ! ! !
  // this line should exist only while module3-task1 is under checking
  mapBlock.insertAdjacentElement(`beforeend`,window.utilityGenerateMockup.createCard(window.fullAdvertisementArray[0], document.querySelector(`#card`)));
  // let someIndex = 0;
  // (document.querySelectorAll(`.map__pin`)[someIndex]).insertAdjacentElement(`beforeend`,window.utilityGenerateMockup.createCard(window.fullAdvertisementArray[someIndex], document.querySelector(`#card`)));
  //  delete this line after checking

};
// ↑↑↑ should move to load.js ↑↑↑
// ↑↑
// ↑


// ↓
// ↓↓
// ↓↓↓ should move to NEW mathing.js ↓↓↓
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
// ↑↑↑ should move to NEW mathing.js ↑↑↑
// ↑↑
// ↑



// ↓
// ↓↓
// ↓↓↓ should move to map.js ↓↓↓
const renderPins = function (pinsArray) {
  let oldPins = document.querySelectorAll(`.map__pin`);
  let oldPinsExceptMain = (Array.from(oldPins)).slice(1);
  oldPinsExceptMain.forEach(function (elem) {
    elem.remove();
  });
  let pinsFragment = window.utilityGenerateMockup.getReceivedAdvsInFragment(pinsArray.slice(0, window.utilityData.RENDERING_PINS_QUANTITY), similarPinTemplate);
  window.utilityMap.renderFragment(similarListOfPins, pinsFragment);
};
// ↑↑↑ should move to map.js ↑↑↑
// ↑↑
// ↑

// ↓
// ↓↓
// ↓↓↓ should move to map.js ↓↓↓
// creating a new method render card based on command line ↓
// mapBlock.insertAdjacentElement(`beforeend`,window.utilityGenerateMockup.createCard(window.fullAdvertisementArray[0], document.querySelector(`#card`)));

// метод будет принимать елемент,по которому определяем объект в массиве. И похоже,что всё. проверяем возможность отрисовки рядом с пином.

// ↑↑↑ should move to map.js ↑↑↑
// ↑↑
// ↑


// ↓
// ↓↓
// ↓↓↓ should move to load.js ↓↓↓
const errorHandler = function (errorMessage) {

  let node = document.createElement(`div`);
  node.style = window.utilityLoad.ErrorWindowStyle;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};
// ↑↑↑ should move to load.js ↑↑↑
// ↑↑
// ↑


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


/*
///////////////////////////////////////

// передавать только Пины БЕЗ главного Пина
let pins = document.querySelectorAll(`.map__pin`);

for(let pin of pins){
    pin.addEventListener('click',function(evt){

    const getMatchingObjectByTitle = function(arrOfObjects, title){
        let matchedObj = arrOfObjects.filter(function(elem){
            return elem.offer.title === title;
        });
        return matchedObj[0];
    };

    if(evt.target.childNodes.length){

        let targetElemTitle = evt.target.childNodes[0].alt;
        let matchedObj = getMatchingObjectByTitle(window.fullAdvertisementArray, targetElemTitle);

        console.log(`/// start ///`);
        console.log(`сработал клик по баттон, результат ниже:`);
        console.log(matchedObj);
        console.log(`/// end ///`);
        // далее вызывать метод отрисовки карточки по переданному объекту
    } else {

        let targetElemTitle = evt.target.alt;
        let matchedObj = getMatchingObjectByTitle(window.fullAdvertisementArray, targetElemTitle);

        console.log(`/// start ///`);
        console.log(`сработал клик по img, результат ниже:`);
        console.log(matchedObj);
        console.log(`/// end ///`);
        // далее вызывать метод отрисовки карточки по переданному объекту
    }

    });
}

///////////////////////////////////////
 */
