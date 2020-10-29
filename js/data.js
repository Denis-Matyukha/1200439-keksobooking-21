// eslint-disable-next-line strict
`use strict`;

(function () {

  window.utilityData = {

    APARTMENT_TYPE: [`palace`, `flat`, `house`, `bungalow`],
    CHECK_TIMES: [`12:00`, `13:00`, `14:00`],
    FACILITIES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, {description: `строка с описанием`}],
    PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
    MAX_X_VALUE: 600,
    MAX_Y_VALUE: 350,
    MAX_ROOMS_QUANTITY: 3,
    MAX_GUEST_QUANTITY: 3,
    INITIAL_Y_CORD: 180,
    FINAL_Y_CORD: 630,
    INITIAL_X_CORD: 50,
    FINAL_X_CORD: 1150,
    ADV_PIN_WIDTH: 50,
    ADV_PIN_HEIGHT: 70,
    MAX_PRICE_AVAILABLE: 1000000,
    MIN_PRICE_AVAILABLE: 1000,
    PIN_BOTTOM_HEIGHT: 22,
    RENDERING_PINS_QUANTITY: 5,
    EVENT_CODE: {
      MOUSE_LEFT_BTN: 0,
      MOUSE_MIDDLE_BTN: 1,
      MOUSE_RIGHT_BTN: 2,
      KEYBOARD_ESCAPE: `Escape`,
      KEYBOARD_SPACE: `Space`,
      KEYBOARD_ENTER: `Enter`,
      KEYBOARD_NUMPAD_ENTER: `NumpadEnter`,
    },
  };

})();
