/* eslint-disable object-shorthand */
'use strict';

(function () {

  window.utilityCard = {

    removeExistedAdvCard: function () {
      let mapBlock = document.querySelector(`.map`);
      let existedCard = mapBlock.querySelector(`article.map__card`);
      if (existedCard) {
        existedCard.remove();
      }
      if (window.activePinElement) {
        window.activePinElement.classList.remove(`map__pin--active`);
      }
    },

    bodyKeydownEscHolder: function (evt) {
      if (evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ESCAPE) {
        window.utilityCard.removeExistedAdvCard();
        document.body.removeEventListener(`keydown`, window.utilityCard.bodyKeydownEscHolder);
      }
    },

    elemCrossClickHolder: function (evt) {
      evt.target.parentNode.remove();
      document.body.removeEventListener(`keydown`, window.utilityCard.bodyKeydownEscHolder);
    },

    addEscHolder: function (element) {
      return function () {
        element.addEventListener(`click`, window.utilityCard.elemCrossClickHolder);
        document.body.addEventListener(`keydown`, window.utilityCard.bodyKeydownEscHolder);
      };
    },

    renderMatchedObjectCard: function (pinTitle) {
      let mapBlock = document.querySelector(`.map`);
      let matchedObj = window.utilityGenerateMockup.getMatchedObjectByTitle(window.fullAdvertisementArray, pinTitle);
      mapBlock.insertAdjacentElement(`afterbegin`, window.utilityGenerateMockup.createCard(matchedObj, document.querySelector(`#card`)));
      let existedCard = mapBlock.querySelector(`article.map__card`);
      window.utilityCard.addEscHolder(existedCard.querySelector(`button.popup__close`))();
    },

    activatePinsCard: function (evt) {
      window.utilityCard.removeExistedAdvCard();
      if (evt.target.childNodes.length) {
        window.activePinElement = evt.target;
        window.activePinElement.classList.add(`map__pin--active`);
        let targetElemTitle = evt.target.childNodes[0].alt;
        window.utilityCard.renderMatchedObjectCard(targetElemTitle);
      } else {
        window.activePinElement = evt.target.parentNode;
        window.activePinElement.classList.add(`map__pin--active`);
        let targetElemTitle = evt.target.alt;
        window.utilityCard.renderMatchedObjectCard(targetElemTitle);
      }
    },

    refreshPinsCardsListener: function () {
      let currentPins = document.querySelectorAll(`.map__pin`);
      let currentPinsExceptMain = (Array.from(currentPins)).slice(1);
      for (let currentPin of currentPinsExceptMain) {
        currentPin.addEventListener(`click`, window.utilityCard.activatePinsCard);
      }
    },

    removeExistedPins: function () {
      let oldPins = document.querySelectorAll(`.map__pin`);
      let oldPinsExceptMain = (Array.from(oldPins)).slice(1);
      oldPinsExceptMain.forEach(function (elem) {
        elem.remove();
      });
    },

    renderPins: function (pinsArray) {
      let similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
      let similarListOfPins = document.querySelector(`.map__pins`);
      window.utilityCard.removeExistedPins();
      let pinsFragment = window.utilityGenerateMockup.getReceivedAdvsInFragment(pinsArray.slice(0, window.utilityData.RENDERING_PINS_QUANTITY), similarPinTemplate);
      window.utilityMap.renderFragment(similarListOfPins, pinsFragment);
      window.utilityCard.refreshPinsCardsListener();
    },

    renderPinsHolder: function (filterHousingType, currentArr) {
      return function () {
        // filtering start
        let hosingType = filterHousingType.value;
        let arrayForRender = currentArr.filter(function (advertisement) {
          return advertisement.offer.type === hosingType;
        });
        arrayForRender = arrayForRender.concat(currentArr);
        arrayForRender = arrayForRender.filter(function (advertisement, index) {
          return arrayForRender.indexOf(advertisement) === index;
        });
        // filtering end
        window.utilityCard.renderPins(arrayForRender);
        window.utilityCard.removeExistedAdvCard();
      };
    },

  };

})();
