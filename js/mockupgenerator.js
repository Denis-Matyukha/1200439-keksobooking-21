/* eslint-disable object-shorthand */
"use strict";

(function () {

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

      // в других местах кода по возможности использовал forEach (честно))

      // перебор массива через forEach в этом месте
      // не сможет реализовать случайность выборки из массива удобств квартиры [wifi, parking, etc...] и массив фото [window.utilityData.PHOTOS]
      // quantityVar определяется рандомно в интервале от 1 до arr.length
      // т.е. случайный набор удобств в объявлении (после forEach) станет невозможен
      // и всегда будет возвращаться максимальный набор элементов массива удобств квартиры (и фотографий) для каждого объявления

      for (let i = 0; i < quantityVar; i++) {
        newArr.push(arr[i]);
      }

      // arr.forEach(function(arrElement, index) {
      //   index = window.utilityGenerateMockup.getRandomFromInterval(1, arr.length);
      //   console.log(index + ` index`);
      //   newArr.push(arrElement);
      // })

      // console.log({newArr});

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
      // console.log(advsArray);
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
      advsArray.forEach(function(advsElement) {
        targetTemplate.appendChild(window.utilityGenerateMockup.renderPins(advsElement, contentElem));
      });
      return targetTemplate;
    },

    getReceivedAdvsInFragment: function (receivedArr, contentElem) {
      let targetTemplate = document.createDocumentFragment();
      receivedArr.forEach(function(advsElement) {
        targetTemplate.appendChild(window.utilityGenerateMockup.renderPins(advsElement, contentElem));
      });
    return targetTemplate;
    },

  };

})();
