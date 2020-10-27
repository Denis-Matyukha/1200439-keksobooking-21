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
            prise: (function () {
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

    createPin: function (singleAdvertisement, contentElem) {
      let singleElement = contentElem.cloneNode(true);
      singleElement.style.left = singleAdvertisement.location.x - window.utilityData.ADV_PIN_WIDTH * 0.5 + `px`;
      singleElement.style.top = singleAdvertisement.location.y - window.utilityData.ADV_PIN_HEIGHT + `px`;
      singleElement.querySelector(`img`).src = singleAdvertisement.author.avatar;
      singleElement.querySelector(`img`).alt = singleAdvertisement.offer.title;
      return singleElement;
    },

    // !!!module3-task2 begin
    createCard: function (advertisement, block) {
      let newCard = block.content.querySelector(`.map__card`).cloneNode(true);
      newCard.querySelector(`.popup__title`).innerText = `${advertisement.offer.title}`;
      newCard.querySelector(`.popup__text--address`).innerText = `${advertisement.offer.address}`;
      newCard.querySelector(`.popup__text--price`).innerText = `${advertisement.offer.price}₽/ночь.`;

      switch (advertisement.offer.type) {
        case `flat`:
          newCard.querySelector(`.popup__type`).innerText = `Квартира`;
          break;
        case `bungalow`:
          newCard.querySelector(`.popup__type`).innerText = `Бунгало`;
          break;
        case `house`:
          newCard.querySelector(`.popup__type`).innerText = `Дом`;
          break;
        case `palace`:
          newCard.querySelector(`.popup__type`).innerText = `Дворец`;
          break;
        default:
          newCard.querySelector(`.popup__type`).innerText = `тип жилья не указан =^⌒^=`;
          // newCard.querySelector(`.popup__type`).innerText = `${advertisement.offer.type}`;
      };

      newCard.querySelector(`.popup__text--capacity`).innerText = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей.`;
      newCard.querySelector(`.popup__text--time`).innerText = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}.`;

      // В список .popup__features выведите все доступные удобства в объявлении.

      //  advertisement.offer.features это массив, пройтись по нему forEach и отрисовать в li

      newCard.querySelector(`.popup__description`).innerText = `${advertisement.offer.description}`;

      // !!!
      // В блок .popup__photos выведите все фотографии из списка offer.photos.
      // Каждая из строк массива photos должна записываться как src соответствующего изображения.
      // !!!

      newCard.querySelector(`.popup__avatar`).src = `${advertisement.author.avatar}`;

      // Реализовать:
      // Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.
      return newCard;
    },
    // !!!module3-task2 end
    // createCard(arrElem, DOMblock);
    // document.querySelector(`.map`).insertAdjacentElement(`beforeend`,window.utilityGenerateMockup.createCard(window.fullAdvertisementArray[0],document.querySelector(`#card`)));

    getRandomAdvsInFragment: function (numberOfAdvs, contentElem) {
      let targetTemplate = document.createDocumentFragment();
      let advsArray = window.utilityGenerateMockup.getRandomAdvs(numberOfAdvs);
      advsArray.forEach(function (advsElement) {
        targetTemplate.appendChild(window.utilityGenerateMockup.createPin(advsElement, contentElem));
      });
      return targetTemplate;
    },

    getReceivedAdvsInFragment: function (receivedArr, contentElem) {
      let targetTemplate = document.createDocumentFragment();
      receivedArr.forEach(function (advsElement) {
        targetTemplate.appendChild(window.utilityGenerateMockup.createPin(advsElement, contentElem));
      });
      return targetTemplate;
    },

  };

})();
