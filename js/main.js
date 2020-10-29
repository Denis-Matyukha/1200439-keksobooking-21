// eslint-disable-next-line strict
`use strict`;

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

const removeExistedAdvCard = function () {
  let existedCard = mapBlock.querySelector(`article.map__card`);
  if (existedCard) {
    existedCard.remove();
  }
  if(window.activePinElement) {
    window.activePinElement.classList.remove(`map__pin--active`);
  }
};

const addEscHolder = function(element) {
  return function () {
    element.addEventListener(`click` , function (evt) {
      evt.target.parentNode.remove();
    });
  };
};

// ↓
// ↓↓
// ↓↓↓ should move to load.js ↓↓↓
const successHandler = function (advertisementArray) {
  window.fullAdvertisementArray = advertisementArray;
  renderPins(advertisementArray);
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

  removeExistedAdvCard();
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

  // bind with oldPinsExceptMain before moving to another module ↓
  oldPinsExceptMain.forEach(function (elem) {
    elem.remove();
  });

  let pinsFragment = window.utilityGenerateMockup.getReceivedAdvsInFragment(pinsArray.slice(0, window.utilityData.RENDERING_PINS_QUANTITY), similarPinTemplate);
  window.utilityMap.renderFragment(similarListOfPins, pinsFragment);

  // !!
  refreshPinActiveListener();
  // !!
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

  // if (evt.button === window.utilityData.EVENT_CODE.MOUSE_LEFT_BTN ||
  //     evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ENTER ||
  //     evt.code === window.utilityData.EVENT_CODE.KEYBOARD_NUMPAD_ENTER) {

  if (!activateFlag) {

    window.utilityLoad.getXHRequest(successHandler, errorHandler);

    window.utilityForm.toggleDisableAttr(mapSelects);
    window.utilityForm.toggleDisableAttr(formInputs);

    activateFlag = true;
  }


  mapBlock.classList.remove(`map--faded`);
  mainFormElement.classList.remove(`ad-form--disabled`);
  window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
  // }
};

// ↓
// ↓↓
// ↓↓↓
// module4-task2 start here
const renderCard = function () {};

// for(let pin of oldPinsExceptMain){};


const refreshPinActiveListener = function () {

  // remove old card
  // mapBlock.querySelectorAll(`article.map__card`).forEach(function(elem){elem.remove()});
  // mapBlock.querySelector(`article.map__card`).remove();
  // let existedCard = mapBlock.querySelector(`article.map__card`);
  // if (existedCard) {
  // existedCard.remove();
  // };

  let oldPins = document.querySelectorAll(`.map__pin`);
  let oldPinsExceptMain = (Array.from(oldPins)).slice(1);

  for (let pin of oldPinsExceptMain) {

    // ↓
    // ↓↓
    // ↓↓↓
    // ↓↓↓↓ truing to write universal function with Enter button key code
    let activatedPinHolder = function (evt) {
      if (evt.button === window.utilityData.EVENT_CODE.MOUSE_LEFT_BTN ||
        evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ENTER ||
        evt.code === window.utilityData.EVENT_CODE.KEYBOARD_NUMPAD_ENTER) {
        // start ↓

        // ↓
        // ↓↓
        // ↓↓↓
        // ↓↓↓↓ might be at separate module
        // let existedCard = mapBlock.querySelector(`article.map__card`);
        // if (existedCard) {
        //   existedCard.remove();
        // };
        removeExistedAdvCard();
        // ↑↑↑
        // ↑↑
        // ↑


        // ↓
        // ↓↓
        // might be at separate module
        // let window.utilityGenerateMockup.getMatchedObjectByTitle = function (arrOfObjects, title) {
        //   let matchedObj = arrOfObjects.filter(function (elem) {
        //     return elem.offer.title === title;
        //   });
        //   return matchedObj[0];
        // };
        // ↑↑
        // ↑


        if (evt.target.childNodes.length) {
          console.log(`Look:`);
          console.log(evt.target);
          console.log(`Here ↑`);
          window.activePinElement = evt.target;
          window.activePinElement.classList.add(`map__pin--active`);
          let targetElemTitle = evt.target.childNodes[0].alt;
          let matchedObj = window.utilityGenerateMockup.getMatchedObjectByTitle(window.fullAdvertisementArray, targetElemTitle);

          // console.log(`/// start ///`);
          // console.log(`сработал клик по ${evt.target}, результат ниже:`);
          // console.log(matchedObj.offer.title);
          // console.log(`/// end ///`);
          // далее вызывать метод отрисовки карточки по переданному объекту
          mapBlock.insertAdjacentElement(`afterbegin`, window.utilityGenerateMockup.createCard(matchedObj, document.querySelector(`#card`)));
          // и вешаем обработчики события для срабатывания Esc и [x]
          // let existedCard = mapBlock.querySelector(`article.map__card`);
          // test with return function
          let existedCard = mapBlock.querySelector(`article.map__card`);
          addEscHolder(existedCard.querySelector(`button.popup__close`))();
          // Возможно стоит переписать функцию для дальнейшего снятия обработчика событий

          // (i) [x] is ↓
          // document.querySelector(`article.map__card`).querySelector(`button.popup__close`)
        } else {
          console.log(`Look:`);
          console.log(evt.target.parentNode);
          console.log(`Here ↑`);
          window.activePinElement = evt.target.parentNode;
          window.activePinElement.classList.add(`map__pin--active`);
          let targetElemTitle = evt.target.alt;
          let matchedObj = window.utilityGenerateMockup.getMatchedObjectByTitle(window.fullAdvertisementArray, targetElemTitle);

          // console.log(`/// start ///`);
          // console.log(`сработал клик по ${evt.target}, результат ниже:`);
          // console.log(matchedObj.offer.title);
          // console.log(`/// end ///`);
          // далее вызывать метод отрисовки карточки по переданному объекту
          mapBlock.insertAdjacentElement(`afterbegin`, window.utilityGenerateMockup.createCard(matchedObj, document.querySelector(`#card`)));
          // и вешаем обработчики события для срабатывания Esc и [x]
          // let existedCard = mapBlock.querySelector(`article.map__card`);
          // test with return function
          let existedCard = mapBlock.querySelector(`article.map__card`);
          addEscHolder(existedCard.querySelector(`button.popup__close`))();
          // Возможно стоит переписать функцию для дальнейшего снятия обработчика событий

          // (i) [x] is ↓
          // document.querySelector(`article.map__card`).querySelector(`button.popup__close`)
        }
      }
    };

    pin.addEventListener(`click`, activatedPinHolder);
    // pin.addEventListener(`keydown`, activatedPinHolder);

  };
};
// ↑↑↑
// ↑↑
// ↑

// initializing primary disabled condition
window.utilityForm.toggleDisableAttr(mapSelects);
window.utilityForm.toggleDisableAttr(formInputs);

window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

mainPin.addEventListener(`click`, activatePage);
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
