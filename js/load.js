/* eslint-disable object-shorthand */
"use strict";

(function () {
  // window.utilityLoad.createXHR();
  window.utilityLoad = {

    getXHR: function(listOfPins, pinTemplate) {

      let xhr = new XMLHttpRequest();


      xhr.responseType = `json`;


      xhr.addEventListener(`load`, function () {


        let advertisementArray = xhr.response;

        console.log(xhr.status + ` ` + xhr.statusText);
        console.log(advertisementArray);

        // продумать, как бы эта функция выглядела бы если её делать обособленной и передавать в неё аргументы.
        // продумать название функции и подходящий для неё модуль

        // !!!
        // let fragmentWithServerPins = document.createDocumentFragment();

        // for (let i = 0; i < advertisementArray.length; i++) {
          // !!!

          // fragmentWithServerPins.appendChild(window.renderPins(advertisementArray[i]));
          // window.utilityGenerateMockup.renderPins(advertisementArray[i],similarPinTemplate);

          // !!!
          // fragmentWithServerPins.appendChild(window.utilityGenerateMockup.renderPins(advertisementArray[i], similarPinTemplate));
        // }
        // !!!

        //
        // getRandomAdvsInFragment: function (numberOfAdvs, contentElem) {
        //   let targetTemplate = document.createDocumentFragment();
        //   let advsArray = window.utilityGenerateMockup.getRandomAdvs(numberOfAdvs);
        //   advsArray.forEach(function(advsElement) {
        //     targetTemplate.appendChild(window.utilityGenerateMockup.renderPins(advsElement, contentElem));
        //   });
        // return targetTemplate;
        // }
        let fragmentWithServerPins = window.utilityGenerateMockup.getReceivedAdvsInFragment(advertisementArray, pinTemplate);


        // getReceivedAdvsInFragment: function (receivedArr, contentElem) {
        //   let targetTemplate = document.createDocumentFragment();
        //   receivedArr.forEach(function(advsElement) {
        //     targetTemplate.appendChild(window.utilityGenerateMockup.renderPins(advsElement, contentElem));
        //   });
        // return targetTemplate;
        // }


        //
        /*
        window.utilityGenerateMockup.renderPins(advertisementArray[i],similarPinTemplate);

            renderPins: function (singleAdvertisement, contentElem) {
              let singleElement = contentElem.cloneNode(true);
              singleElement.style.left = singleAdvertisement.location.x - window.utilityData.ADV_PIN_WIDTH * 0.5 + `px`;
              singleElement.style.top = singleAdvertisement.location.y - window.utilityData.ADV_PIN_HEIGHT + `px`;
              singleElement.querySelector(`img`).src = singleAdvertisement.author.avatar;
              singleElement.querySelector(`img`).alt = singleAdvertisement.offer.title;
              return singleElement;
            },
        */

        // !!! already exist in main.js
        // let similarListOfPins = document.querySelector('.map__pins');

        // window.utilMapFunction = function () {
        // return similarListOfPins.appendChild(fragmentWithServerPins);
        // };
        // window.utilMapFunction();
        // const similarListOfPins = document.querySelector(`.map__pins`);

        window.utilityMap.renderFragment(listOfPins, fragmentWithServerPins);
        /*
        window.utilityMap = {
          renderFragment: function (listElem, fragmentElem) {
            return listElem.appendChild(fragmentElem);
          },
        };
        */
        // MIGHT BE MOVED OUT FROM MODULE


      });

      xhr.open(`GET`, `https://21.javascript.pages.academy/keksobooking/data`);
      xhr.send();

    },

    // return function() {
    // };


  };


})();
