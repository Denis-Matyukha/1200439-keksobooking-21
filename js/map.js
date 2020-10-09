`use strict`;

(function(){

  let getRandomFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let getRandomFromArray = function(dataArr) {
    return dataArr[getRandomFromInterval(0, dataArr.length - 1)];
  };

  let getSetFromArrayItems = function(arr) {
    let oldArr = arr;
    let newArr = [];
    let quantityVar = getRandomFromInterval(1, arr.length);
    for (let i = 0; i < quantityVar; i++) {
        newArr.push(oldArr[i]);
    }
    return newArr;
  };

  let getRandomAdvs = function (numberOfAdvs) {

    let advsArray = [];

    for(let i = 0; i < numberOfAdvs; i++) {

      advsArray.push({
        author: {
          avatar: `img/avatars/user0${i+1}.png`
        },
        offer: {
          title: `Описание квартиры скоро будет здесь`,
          address: `${getRandomFromInterval(0, window.dataUtil.MAX_X_VALUE)}, ${getRandomFromInterval(0, window.dataUtil.MAX_Y_VALUE)}`,
          prise: (() => {
            let rawPrice = getRandomFromInterval(0, Math.floor(window.dataUtil.MAX_PRICE_AVAILABLE));
            return rawPrice - (rawPrice % 100);
          })(),
          type: `${getRandomFromArray(window.dataUtil.APARTMENT_TYPE)}`,
          rooms: getRandomFromInterval(1, window.dataUtil.MAX_ROOMS_QUANTITY),
          guests: getRandomFromInterval(1, window.dataUtil.MAX_GUEST_QUANTITY),
          checkin: `${getRandomFromArray(window.dataUtil.CHECK_TIMES)}`,
          checkout: `${getRandomFromArray(window.dataUtil.CHECK_TIMES)}`,
          features: getSetFromArrayItems(window.dataUtil.FACILITIES),
          photos: getSetFromArrayItems(window.dataUtil.PHOTOS),
        },
        location: {
          x: getRandomFromInterval(window.dataUtil.INITIAL_X_CORD, window.dataUtil.FINAL_X_CORD),
          y: getRandomFromInterval(window.dataUtil.INITIAL_Y_CORD, window.dataUtil.FINAL_Y_CORD),
        },
      });
    }
    console.log(advsArray);
    return advsArray;
  };

  let similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  let similarListOfPins = document.querySelector('.map__pins');

  let fragmentWithPins = document.createDocumentFragment();

  //create mook data array
  let advertisementArray = getRandomAdvs(8);

  let renderPins = function(singleAdvertisement) {
    let pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = singleAdvertisement.location.x - window.dataUtil.ADV_PIN_WIDTH * 0.5 +`px`;
    pinElement.style.top = singleAdvertisement.location.y - window.dataUtil.ADV_PIN_HEIGHT +`px`;
    pinElement.querySelector('img').src = singleAdvertisement.author.avatar;
    pinElement.querySelector('img').alt = singleAdvertisement.offer.title;
    return pinElement;
  };

  for (let i = 0; i < advertisementArray.length; i++) {
    fragmentWithPins.appendChild(renderPins(advertisementArray[i]));
  };

  //must be closed during execution module4-task1
  //render mook full document fragment
  // similarListOfPins.appendChild(fragmentWithPins);

  //rendering mook data document fragment from another module
  // similarListOfPins.appendChild(fragmentWithPins);

  window.utilMapFunction = function () {
    return similarListOfPins.appendChild(fragmentWithPins);
  };

})();



