/* eslint-disable object-shorthand */
// eslint-disable-next-line strict
`use strict`;

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
      }, 3500);
    },

    checkValidity: function (price, rooms, guests, houseType, timeIn, timeOut, avatar, housePhoto) {

      let minPrice = window.utilityData.MIN_PRICE[houseType.value];
      let maxPrice = window.utilityData.MAX_PRICE_AVAILABLE;

      if (price.value < minPrice || price.value > maxPrice) {
        window.utilityForm.setBorderErrorStyle(price);
        price.setCustomValidity(`  Пожалуйста, укажите сумму от ${minPrice} до ${maxPrice} для этого типа жилья =^_^=  `);
      } else {
        price.setCustomValidity(``);
      };

      // if (rooms.value !== guests.value) {
      //   window.utilityForm.setBorderErrorStyle(rooms);
      //   window.utilityForm.setBorderErrorStyle(guests);
      //   rooms.setCustomValidity(`  Количество комнат и количество мест должны совпадать =^_^=  `);
      // } else {
      //   rooms.setCustomValidity(``);
      // };

    },

    onChangeTypeHolder: function (evt) {
      priceElem.placeholder = window.utilityData.MIN_PRICE[evt.target.value];
    },

  };

})();
