/* eslint-disable object-shorthand */
"use strict";

(function () {

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
    setBorderErrorStyle: function (elem) {
      elem.style.border = `1px solid #ffaa99`;
      elem.style.boxShadow = `0 0 2px 2px #ff6547`;
      elem.style.transition = `0.5s`;
      setTimeout(function () {
        elem.style.border = ``;
        elem.style.boxShadow = ``;
      }, 3500);
    },
    checkValidity: function (priceArea, roomsArea, guestsArea) {
      if (priceArea.value < window.utilityData.MIN_PRICE_AVAILABLE || priceArea.value > window.utilityData.MAX_PRICE_AVAILABLE) {
        window.utilityForm.setBorderErrorStyle(priceArea);
        priceArea.setCustomValidity(`  Пожалуйста, укажите сумму от 1000 до миллиона =^_^=  `);
      } else {
        priceArea.setCustomValidity(``);
      }
      if (roomsArea.value !== guestsArea.value) {
        window.utilityForm.setBorderErrorStyle(roomsArea);
        window.utilityForm.setBorderErrorStyle(guestsArea);
        roomsArea.setCustomValidity(`  Количество комнат и количество мест должны совпадать =^_^=  `);
      } else {
        roomsArea.setCustomValidity(``);
      }
    }
  };
})();
