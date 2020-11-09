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

// const publishButton = mainFormElement.querySelector(`.ad-form__submit`);

const filterHousingType = mapFilterForm.querySelector(`#housing-type`);

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkHouseTypePrice(priceElem, housingType);
  window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity)();
};


//
//
// const sendForm = function () {
// let URL = `https://21.javascript.pages.academy/keksobooking`;


// };


// 'use strict';

// (function () {

// let URL = `https://21.javascript.pages.academy/keksobooking`;
let URL = `https://21.javascript.pages.academy/keksobookingXXX`;

window.utilityUpload = function (data, onSuccess) {

  console.log(`вот сейчас сработала функция window.utilityUpload(data, onSuccess)`);
  console.log(`в которой data это ↓ `);
  console.log(data);

  let xhr = new XMLHttpRequest();

  console.log(`вот сформировался не такой уж и пустой XMLHttpRequest - xhr ↓`);
  console.log(xhr);

  xhr.responseType = `json`;

  console.log(`после команды xhr.responseType = json; объект примет видxhr ↓`);
  console.log(xhr);

  xhr.addEventListener(`load`, function (){
    console.log(`а сейчас сработало событие xhr load и отрабтает функция onSuccess задействовав xhr.response`);
    console.log(`xhr.statusText -> ${xhr.statusText}`);
    console.log(`xhr.status -> ${xhr.status}`);
    console.log(`==================`);
    console.log(`↓↓↓ xhr ↓↓↓`);
    console.log(xhr);
    onSuccess(xhr);
  });

  xhr.open(`POST`, URL);
  xhr.send(data);
  console.log(`в этот момент произошла отправка data через xhr по адресу URL ↓`);
  console.log(URL);

};
// })();

// const checkAndSendForm = function () {
//   checkForm();
//   sendForm();
// };

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

const deActivatePage = function () {
  window.utilityForm.toggleDisableAttr(mapFilters);
  window.utilityForm.toggleDisableAttr(formInputs);
  activateFlag = false;
  mapBlock.classList.add(`map--faded`);
  mainFormElement.classList.add(`ad-form--disabled`);
  window.utilityCard.removeExistedAdvCard();
  window.utilityCard.removeExistedPins();
};


window.utilityForm.toggleDisableAttr(mapFilters);
window.utilityForm.toggleDisableAttr(formInputs);

window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

//
//
mainFormElement.addEventListener(`submit`, function (evt) {
  window.utilityUpload(new FormData(mainFormElement), function (response) {
    // добавить события для xhr на error, timeout и прочее
    console.log(`работаем внутри callbacka с response.status`);
    console.log(response.status);
    if(response.status === 200) {
      console.log(`response.status === 200`);
      console.log(`response.statusText -> ${response.statusText}`);
      mainFormElement.reset();
      deActivatePage();
      let successMessageElement = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
      document.body.insertAdjacentElement(`afterbegin`, successMessageElement);
      document.body.addEventListener(`keydown`, function(evt) {
        if (evt.key === window.utilityData.EVENT_CODE.KEYBOARD_ESCAPE) {
          successMessageElement.remove();
        }
      }, {once: true});
      document.body.addEventListener(`click`, function() {
        successMessageElement.remove();
      }, {once: true});
    } else {
      console.warn(`response.status -> ${response.status}`);
      console.warn(`response.statusText -> ${response.statusText}`);

      let errorMessageElement = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
      let errorButton = errorMessageElement.querySelector(`.error__button`);
      document.querySelector(`main`).insertAdjacentElement(`beforeend`, errorMessageElement);
      errorButton.addEventListener(`click`, function() {
        errorMessageElement.remove();
      });
      document.body.addEventListener(`keydown`, function(evt) {
        if (evt.key === window.utilityData.EVENT_CODE.KEYBOARD_ESCAPE) {
          errorMessageElement.remove();
        }
      }, {once: true});
      document.body.addEventListener(`click`, function() {
        errorMessageElement.remove();
      }, {once: true});
    }

    // mainFormElement.reset();
    // deActivatePage();
    // let successMessageElement = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
    // document.body.insertAdjacentElement(`afterbegin`, successMessageElement);


    // document.body.addEventListener(`keydown`, function(evt) {
    //   if (evt.key === window.utilityData.EVENT_CODE.KEYBOARD_ESCAPE) {
    //     successMessageElement.remove();
    //   }
    // }, {once: true});


    // document.body.addEventListener(`click`, function() {
    //   successMessageElement.remove();
    // }, {once: true});


  });
  evt.preventDefault();
});
//
//

housingType.addEventListener(`change`, window.utilityForm.onChangeTypeHolder(priceElem));

timeIn.addEventListener(`change`, window.utilityForm.conformityTimeHolder(timeIn, timeOut));
timeOut.addEventListener(`change`, window.utilityForm.conformityTimeHolder(timeIn, timeOut));

roomsQuantity.addEventListener(`change`, window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity));
guestsQuantity.addEventListener(`change`, window.utilityForm.onChangeRoomsHolder(roomsQuantity, guestsQuantity));

mainPin.addEventListener(`mousedown`, window.utilityMove.mainPinMoveHolder(mainPin, adressArea, activatePage));

