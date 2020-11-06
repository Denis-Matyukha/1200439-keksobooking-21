/* eslint-disable object-shorthand */
'use strict';

(function () {

  window.utilityForm = {

    toggleDisableAttr: function (collectedElements) {
      collectedElements.forEach(function (element) {
        element.toggleAttribute(`disabled`);
      });
    },

    setTargetCords: function (elemPlaceholder, elemTarget, correctionValue = 0) {
      elemPlaceholder.value = `${Math.floor(parseInt(elemTarget.style.left, 10) + elemTarget.clientWidth * 0.5)} ,
 ${Math.floor(parseInt(elemTarget.style.top, 10) + elemTarget.clientHeight + correctionValue)}`;
    },

    setBorderErrorStyle: function (elem) {
      elem.style.border = `1px solid #ffaa99`;
      elem.style.boxShadow = `0 0 2px 2px #ff6547`;
      elem.style.transition = `0.5s`;
      setTimeout(function () {
        elem.style.border = ``;
        elem.style.boxShadow = ``;
      }, 3200);
    },

    checkHouseTypePrice: function (price, type) {

      let minPrice = window.utilityData.MIN_PRICE[type.value];
      let maxPrice = window.utilityData.MAX_PRICE_AVAILABLE;

      if (price.value < minPrice || price.value > maxPrice) {
        window.utilityForm.setBorderErrorStyle(price);
        price.setCustomValidity(`  Пожалуйста, укажите сумму от ${minPrice} до ${maxPrice} для этого типа жилья =^_^=  `);
      } else {
        price.setCustomValidity(``);
      }

    },

    onChangeTypeHolder: function (price) {

      return function (evt) {
        price.placeholder = window.utilityData.MIN_PRICE[evt.target.value];
      };
    },

    conformityTimeHolder: function (timeIn, timeOut) {

      return function (evt) {
        let time = evt.target.value;
        timeIn.value = time;
        timeOut.value = time;
      };
    },

    onChangeRoomsHolder: function (rooms, guests) {

      return function () {

        let guestsOptions = guests.querySelectorAll(`option`);

        guestsOptions.forEach(function (element) {
          element.removeAttribute(`disabled`);
        });

        let validedGuestsQuantity;

        if (rooms.value === `1`) {

          validedGuestsQuantity = [`1`];
          guestsOptions.forEach(function (element) {
            element.setAttribute(`disabled`, `disabled`);
          });
          guestsOptions[2].removeAttribute(`disabled`);

        } else if (rooms.value === `2`) {

          validedGuestsQuantity = [`1`, `2`];
          guestsOptions[0].setAttribute(`disabled`, `disabled`);
          guestsOptions[3].setAttribute(`disabled`, `disabled`);

        } else if (rooms.value === `3`) {

          validedGuestsQuantity = [`1`, `2`, `3`];
          guestsOptions[3].setAttribute(`disabled`, `disabled`);

        } else if (rooms.value === `100`) {

          validedGuestsQuantity = [`0`];
          guestsOptions.forEach(function (element) {
            element.setAttribute(`disabled`, `disabled`);
          });
          guestsOptions[3].removeAttribute(`disabled`);
        }

        if (validedGuestsQuantity.indexOf(guests.value) !== -1) {
          guests.setCustomValidity(``);
        } else {
          window.utilityForm.setBorderErrorStyle(guests);
          guests.setCustomValidity(` Укажите другое доступное количетво гостей для ${rooms.value} комнат`);
        }

      };

    },

  };

})();
