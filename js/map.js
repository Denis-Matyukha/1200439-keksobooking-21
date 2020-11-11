/* eslint-disable object-shorthand */
'use strict';

(function () {

  window.utilityMap = {

    PRICE_FILTER: {
      Low: 10000,
      Hight: 50000
    },

    renderFragment: function (listElem, fragmentElem) {
      return listElem.appendChild(fragmentElem);
    },

    // getFeaturesArray: function (filterElement) {
    //   let arrOfFilters = Array.from(filterElement.elements).slice(0,4);
    //   let resultArr = [];
    //   arrOfFilters.forEach(function(element){
    //     if (element.value !== `any`) {
    //       resultArr.push(`${element.name}=${element.value}`);
    //     }
    //   });
    //   console.log(`step_1`);
    //   console.log(resultArr);
    //   let arrOfFeatures = Array.from(filterElement.querySelector(`.map__features`).elements);
    //   arrOfFeatures.forEach(function(element){
    //       if (element.checked) {
    //           resultArr.push(element.value);
    //       }
    //   });
    //   console.log(`step_2`);
    //   console.log(resultArr);
    //   return resultArr;
    // },

    getFeaturesObject: function (filterElement) {
      let resultObj = {};
      // collect features
      let arrOfFeatures = Array.from(filterElement.querySelector(`.map__features`).elements);
      let resultArr = [];
      arrOfFeatures.forEach(function (element) {
        if (element.checked) {
          resultArr.push(element.value);
        }
      });
      resultObj.features = resultArr;
      // collect guests
      resultObj.guests = filterElement.querySelector(`#housing-guests`).value;
      // collect price
      resultObj.price = filterElement.querySelector(`#housing-price`).value;
      // collect rooms
      resultObj.rooms = filterElement.querySelector(`#housing-rooms`).value;
      // collect type
      resultObj.type = filterElement.querySelector(`#housing-type`).value;

      return resultObj;
    },

    renderFilteredPins: function (filterElement, advertisementsArray) {
      return function () {

        let featuresObj = window.utilityMap.getFeaturesObject(filterElement);

        console.log(featuresObj);

        // filtering start
        // type filtering
        let arrayForRender = advertisementsArray.filter(function (advertisement) {
          return advertisement.offer.type === featuresObj.type;
        });

        arrayForRender = arrayForRender.concat(advertisementsArray);
        window.utilityCard.renderPins(arrayForRender);
        window.utilityCard.removeExistedAdvCard();
        // let hosingType = filterHousingType.value;
        // let arrayForRender = currentArr.filter(function (advertisement) {
        //   return advertisement.offer.type === hosingType;
        // });
        // arrayForRender = arrayForRender.concat(currentArr);
        // arrayForRender = arrayForRender.filter(function (advertisement, index) {
        //   return arrayForRender.indexOf(advertisement) === index;
        // });
        // filtering end

      };
    },
  };

})();


/**
 let mapFilers = document.querySelector(`.map__filters`);
mapFilers.addEventListener(`change`, function(evt) {
    let arrOfFilters = Array.from(mapFilers.elements).slice(0,4);
    let resultArr = [];
    arrOfFilters.forEach(function(element){
        resultArr.push(element.value);
    });
    console.log(`step_1`);
    console.log(resultArr);
    let arrOfFeatures = Array.from(mapFilers.querySelector(`.map__features`).elements);
    arrOfFeatures.forEach(function(element){
        if (element.checked) {
            resultArr.push(element.value);
        }
    });
    console.log(`step_2`);
    console.log(resultArr);
});
 */

/**
  adv.offer

  features: (6) ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]

  guests: 6

  price: 42000

  rooms: 3

  type: "house"

  */
