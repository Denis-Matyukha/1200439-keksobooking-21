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

//const housingTypeField = mapFilterForm.elements[`housing-type`]
const housingTypeField = mapFilterForm.querySelector(`#housing-type`);
// const housingPriceField = mapFilterForm.querySelector(`#housing-price`);
// const housingRoomsField = mapFilterForm.querySelector(`#housing-rooms`);
// const housingGuestsField = mapFilterForm.querySelector(`#housing-guests`);
// const housingFeaturesField = mapFilterForm.querySelector(`#housing-features`);

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkValidity(priceElem, roomsQuantity, guestsQuantity);
};

const successHandler = function (advertisementArray) {

  // const fullAdvertisementArray = advertisementArray;
  window.fullAdvertisementArray = advertisementArray;
  // console.log(`advertisementArray`);
  // console.log(advertisementArray);
  // console.log(`and`);
  // console.log(`advertisementArray[1]`);
  // console.log(advertisementArray[1]);
  // console.log(`and`);
  // console.log(`advertisementArray.slice(0, 5)`);
  // console.log(advertisementArray.slice(0, 5));
  // console.log(`advertisementArray.slice(0, window.utilityData.RENDERING_PINS_QUANTITY)`);
  // console.log(advertisementArray.slice(0, window.utilityData.RENDERING_PINS_QUANTITY));

  // code for RENDER FULL ADV ARRAY
  // let fragmentWithServerPins = window.utilityGenerateMockup.getReceivedAdvsInFragment(advertisementArray, similarPinTemplate);

  // code for RENDER slice with 5 first elements of FULL ADV ARRAY

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // let fragmentWithServerPins = window.utilityGenerateMockup.getReceivedAdvsInFragment(advertisementArray.slice(0, window.utilityData.RENDERING_PINS_QUANTITY), similarPinTemplate);
  // renderPins(fragmentWithServerPins);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // window.utilityMap.renderFragment(similarListOfPins, fragmentWithServerPins);

  renderPins(advertisementArray);


};
// ОБЯЗАТЕЛЬНО ДОБАВИТЬ АКТИВАЦИЮ ФОРМЫ ТОЛЬКО ПОСЛЕ ПОЛОЖИТЕЛЬНОГО ОТВЕТА С СЕРВЕРА

// let x = document.forms[0];
// console.log(mapFilterForm.elements[`housing-type`]);
// console.log(x.elements['housing-type']);

housingTypeField.addEventListener(`change`, function () {
  let hosingType = housingTypeField.value;

  let arrayForRender = (window.fullAdvertisementArray).filter(function (advertisement) {
    return advertisement.offer.type === hosingType;
  });

  // console.log(`window.fullAdvertisementArray.length AFTER FILTER is ${window.fullAdvertisementArray.length}`);

  arrayForRender = arrayForRender.concat(window.fullAdvertisementArray);
  // !!! ОТСЕЯТЬ СОВПАДЕНИЯ
  arrayForRender = arrayForRender.filter(function(advertisement, index) {
    return arrayForRender.indexOf(advertisement) === index;
  });

  // console.log(arrayForRender.slice(0, 5));

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // let sortedServerPinsFragment = window.utilityGenerateMockup.getReceivedAdvsInFragment(arrayForRender.slice(0, window.utilityData.RENDERING_PINS_QUANTITY), similarPinTemplate);
  // renderPins(sortedServerPinsFragment);

  // console.log(arrayForRender);

  let arrForConsole = [];
  for (let i = 0; i < arrayForRender.length; i++) {
    arrForConsole.push(arrayForRender[i].offer.type);
  }
  console.log(arrForConsole);

  renderPins(arrayForRender);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // console.log(window.fullAdvertisementArray);
  // console.log(`housingTypeField.value`);
  // console.log(housingTypeField.value);

  // const sameCoatWizards = wizards.filter(function(wizard) {
  //   return wizard.colorCoat === coatColor;
  // });
});




const renderPins = function(pinsFragment = document.createDocumentFragment()){

  if(Array.isArray(pinsFragment)) {
    pinsFragment = window.utilityGenerateMockup.getReceivedAdvsInFragment(pinsFragment.slice(0, window.utilityData.RENDERING_PINS_QUANTITY), similarPinTemplate);
  } else {
    pinsFragment = document.createDocumentFragment();
  }

  // cleaning Map from other Pins Except MainPin
  // version 1:
  // let nextSibling = mainPin.nextElementSibling;
  // while(nextSibling) {
  //   nextSibling.remove();
  //   nextSibling = mainPin.nextElementSibling;
  // };

  // version 2:
  // let oldPins = document.querySelectorAll(`.map__pin`);
  // (Array.from(oldPins).slice(1)).forEach(el => el.remove());

    // version 2.1:
  let oldPins = document.querySelectorAll(`.map__pin`);
  let oldPinsExceptMain = (Array.from(oldPins)).slice(1);
  // (Array.from(oldPins).slice(1)).forEach(el => el.remove());
  oldPinsExceptMain.forEach(function(elem){
    elem.remove();
  });

  // version 3:
  // let oldPins = (Array.from(similarListOfPins.children)).slice(2);
  // oldPins.forEach(function (elem) {
  //   elem.remove();
  // });

  window.utilityMap.renderFragment(similarListOfPins, pinsFragment);
};

// !!!
// (Array.from(document.querySelectorAll(`.map__pin`)).slice(1)).forEach(el => el.style.display = 'none');
// (Array.from(document.querySelectorAll(`.map__pin`)).slice(1)).forEach(el => el.remove());

// (Array.from(similarListOfPins).slice(1)).forEach(el => el.remove());
// similarListOfPins
// ((Array.from(document.querySelector(`.map__pins`).children)).slice(2)).forEach( function(el) { el.remove(); } );
// ((Array.from(similarListOfPins.children)).slice(2)).forEach( function(el) { el.remove(); } );
// ((Array.from(similarListOfPins.children)).slice(2)).forEach( function(el) { el.remove(); } );

// !!!

// supposed MODULE
// (function(){
// })();


const errorHandler = function (errorMessage) {
  let node = document.createElement(`div`);
  node.style = `
    z-index: 100;
    margin: 0 auto;
    text-align: center;
    background-color: wheat;
    position: absolute;
    padding: 0.5em;
    top: 40vh;
    left: 20vw;
    right: 20vw;
    font-size: 20px;
    font-family: Roboto", "Arial", sans-serif;
    color: #353535;
    border: 1px solid #ffaa99;
    border-radius: 8px;
    box-shadow: 0 0 2px 2px #ff6547;
    `;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const activatePage = function (evt) {

  if (evt.button === window.utilityData.EVENT_CODE.MOUSE_LEFT_BTN ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ENTER ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_NUMPAD_ENTER) {

    if (!activateFlag) {

      // function (onSuccess, onError)
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

module7 task1

[ ] при необходимости указать константы или перечисления из значений для сортировки

[*] для формы с фильтрами на карте сделать активацию
    только при успешной загрузке объявлений.

[ ] строго изучить всё ТЗ.

[*] сделать, чтобы вначале на карте не отображалось больше 5 меток.
    Выводить на карту не более 5 меток. Установка фильтра по количеству
    должна происходить сразу после получения данных с сервера;

[ ] Установка фильтра по количеству должна происходить сразу после
    получения данных с сервера.

[ ] Запрограммировать фильтр «Тип жилья». Помните, независимо от того
    сколько объявлений соответствует фильтру «Тип жилья» на карте не
    должно отображаться больше 5 объявлений.

[ ] После изменения фильтра заново перерисовывать все пины.
    Удалить старые; Отфильтровать нужные; Отрисовать 5 из нужных.

[ ] При изменении любого фильтра скрывать открытую карточку объявления.

[ ] try catch применить в коде (кроме асинхронного кода)

[ ] возможно вынести errorHandler и successHandler в отдельные модули

[ ] посмотреть что ещё можно или следует вынести в другие модули и вынести

[*] по событию фильтра onchange:
[*] получаем значение фильтра квартир
[*] сортируем массив по этому указателю
[*] добавляем к массиву исходый массив
[*] убираем совпадения with code indexOF
[*] отдаём первые пять элементов массива на рендер

 */
