/* eslint-disable object-shorthand */
'use strict';

(function () {

  window.utilityMap = {

    DEBOUNCE_TIMEOUT: 500,
    PRICE_FILTER: {
      any: {
        Min: 0,
        Max: 10 * window.utilityData.MAX_PRICE_AVAILABLE,
      },
      low: {
        Min: 0,
        Max: 10000,
      },
      middle: {
        Min: 10000,
        Max: 50000,
      },
      high: {
        Min: 50000,
        Max: 10 * window.utilityData.MAX_PRICE_AVAILABLE,
      }
    },

    renderFragment: function (listElem, fragmentElem) {
      return listElem.appendChild(fragmentElem);
    },

    getRank: function(resultObj, advertisement) {
      let rank = 0;
      let featuresArray = advertisement.offer.features;
      let filtersArray = resultObj.features;
      let resultArray = [];

      featuresArray.forEach(function(feature) {
        if (filtersArray.includes(feature)) {
          resultArray.push(feature);
        }
      });
      rank += resultArray.length;

      if (advertisement.offer.type === resultObj.type) {
        rank += 1;
      }
      if (resultObj.rooms !== `any` && advertisement.offer.rooms === +resultObj.rooms) {
        rank += 1;
      }
      if (advertisement.offer.price >= window.utilityMap.PRICE_FILTER[resultObj.price].Min && advertisement.offer.price <= window.utilityMap.PRICE_FILTER[resultObj.price].Max) {
        rank += 1;
      }
      if (resultObj.guests !== `any` && advertisement.offer.guests === +resultObj.guests) {
        rank += 1;
      }

      return rank;
    },

    getFilteredAdvertisements: function (featuresObj, advertisementArray) {
      let resultArray = advertisementArray.sort(function (left, right) {
        let rankDiff = window.utilityMap.getRank(featuresObj, right) - window.utilityMap.getRank(featuresObj, left);
        if (rankDiff === 0) {
          rankDiff = right.offer.features.length - left.offer.features.length;
        }
        return rankDiff;
      });
      return resultArray;
    },

    getFeaturesObject: function (filterElement) {
      let resultObj = {};
      let arrOfFeatures = Array.from(filterElement.querySelector(`.map__features`).elements);
      let resultArr = [];
      arrOfFeatures.forEach(function (element) {
        if (element.checked) {
          resultArr.push(element.value);
        }
      });
      resultObj.features = resultArr;
      resultObj.guests = filterElement.querySelector(`#housing-guests`).value;
      resultObj.price = filterElement.querySelector(`#housing-price`).value;
      resultObj.rooms = filterElement.querySelector(`#housing-rooms`).value;
      resultObj.type = filterElement.querySelector(`#housing-type`).value;
      return resultObj;
    },

    renderFilteredPins: function (filterElement, advertisementsArray) {
      let featuresObj = window.utilityMap.getFeaturesObject(filterElement);
      console.log(`featuresObj`);
      console.log(featuresObj);
      let arrayForRender = window.utilityMap.getFilteredAdvertisements(featuresObj,advertisementsArray);
      window.utilityCard.renderPins(arrayForRender);
      window.utilityCard.removeExistedAdvCard();
    },

  };
})();
