'use strict';

(function () {

  window.utilityData = {

    ADV_PIN_WIDTH: 50,
    ADV_PIN_HEIGHT: 70,
    PIN_BOTTOM_HEIGHT: 16,
    RENDERING_PINS_QUANTITY: 5,
    MAX_PRICE_AVAILABLE: 1000000,
    PIN_COORDS_LIMIT: {
      TopMin: 130,
      TopMax: 630,
      LeftMin: 0,
      LeftMax: 1200,
      Shift: 2,
    },
    MIN_PRICE: {
      any: 0,
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalow: 0,
    },
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
