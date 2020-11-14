/* eslint-disable object-shorthand */
'use strict';

(function () {

  window.utilityGenerateMockup = {

    createPin: function (singleAdvertisement, contentElem) {
      let singleElement = contentElem.cloneNode(true);
      singleElement.style.left = singleAdvertisement.location.x - window.utilityData.ADV_PIN_WIDTH * 0.5 + `px`;
      singleElement.style.top = singleAdvertisement.location.y - window.utilityData.ADV_PIN_HEIGHT + `px`;
      singleElement.querySelector(`img`).src = singleAdvertisement.author.avatar;
      singleElement.querySelector(`img`).alt = singleAdvertisement.offer.title;
      return singleElement;
    },

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
          newCard.querySelector(`.popup__type`).innerText = `${advertisement.offer.type}`;
      }

      newCard.querySelector(`.popup__text--capacity`).innerText = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей.`;
      newCard.querySelector(`.popup__text--time`).innerText = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}.`;

      if (Array.isArray(advertisement.offer.features) && advertisement.offer.features.length) {
        let featuresArray = advertisement.offer.features;
        let featuresFragment = document.createDocumentFragment();
        featuresArray.forEach(function (element) {
          let newListItem = document.createElement(`li`);
          newListItem.classList.add(`popup__feature`);
          newListItem.classList.add(`popup__feature--${element}`);
          featuresFragment.appendChild(newListItem);
        });
        newCard.querySelector(`.popup__features`).innerHTML = ``;
        newCard.querySelector(`.popup__features`).appendChild(featuresFragment);
      } else {
        newCard.querySelector(`.popup__features`).innerHTML = ``;
      }

      newCard.querySelector(`.popup__description`).innerText = `${advertisement.offer.description}`;

      if (Array.isArray(advertisement.offer.photos) && advertisement.offer.photos.length) {
        let photosArray = advertisement.offer.photos;
        let photosFragment = document.createDocumentFragment();
        photosArray.forEach(function (element) {
          let newImage = newCard.querySelector(`.popup__photos`).children[0].cloneNode(true);
          newImage.src = element;
          photosFragment.appendChild(newImage);
        });
        newCard.querySelector(`.popup__photos`).removeChild(newCard.querySelector(`.popup__photos`).children[0]);
        newCard.querySelector(`.popup__photos`).appendChild(photosFragment);
      } else {
        newCard.querySelector(`.popup__photos`).innerHTML = ``;
      }

      newCard.querySelector(`.popup__avatar`).src = `${advertisement.author.avatar}`;

      return newCard;
    },

    getReceivedAdvsInFragment: function (receivedArr, contentElem) {
      let targetTemplate = document.createDocumentFragment();
      receivedArr.forEach(function (advsElement) {
        targetTemplate.appendChild(window.utilityGenerateMockup.createPin(advsElement, contentElem));
      });
      return targetTemplate;
    },

    getMatchedObjectByTitle: function (arrOfObjects, title) {
      let matchedObj = arrOfObjects.filter(function (elem) {
        return elem.offer.title === title;
      });
      return matchedObj[0];
    },

  };

})();
