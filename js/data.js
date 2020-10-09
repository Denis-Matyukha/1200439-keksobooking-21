`use strict`;

(function() {

  window.dataUtil = {

    APARTMENT_TYPE: [`palace`, `flat`, `house`, `bungalow`],
    CHECK_TIMES: [`12:00`, `13:00`, `14:00`],
    FACILITIES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, {description: `строка с описанием`}],
    PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
    MAX_X_VALUE: 600,
    MAX_Y_VALUE: 350,
    MAX_PRICE: 1000000000000000,
    MAX_ROOMS_QUANTITY: 10,
    MAX_GUEST_QUANTITY: 10,
    INITIAL_Y_CORD: 180,
    FINAL_Y_CORD: 630,
    INITIAL_X_CORD: 50,
    FINAL_X_CORD: 1150,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,

    MAX_PRICE_AVAILABLE: 1000000,
    MIN_PRICE_AVAILABLE: 1000,
    MAIN_PIN_SIZE: {
      width: 65,
      height: 87
    },

  }

})();
