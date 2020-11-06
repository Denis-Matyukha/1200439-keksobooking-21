/* eslint-disable object-shorthand */
'use strict';

(function () {

  window.utilityMove = {

    mainPinMoveHolder: function (mainPin, adressArea, activatePage) {

      return function (evt) {

        evt.preventDefault();

        let startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        let onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };


          let pinHeightShift = mainPin.clientHeight + window.utilityData.PIN_BOTTOM_HEIGHT;
          let pinWidthShift = Math.floor(mainPin.clientWidth * 0.5);

          let mainPinTop = Math.floor(parseInt(mainPin.style.top, 10) + pinHeightShift);
          let mainPinLeft = Math.floor(parseInt(mainPin.style.left, 10) + pinWidthShift);

          let topMin = window.utilityData.PIN_COORDS_LIMIT.TopMin;
          let topMax = window.utilityData.PIN_COORDS_LIMIT.TopMax;
          let leftMin = window.utilityData.PIN_COORDS_LIMIT.LeftMin;
          let leftMax = window.utilityData.PIN_COORDS_LIMIT.LeftMax;
          let correctionShift = window.utilityData.PIN_COORDS_LIMIT.Shift;

          if (mainPinTop <= topMax && mainPinTop >= topMin && mainPinLeft <= leftMax && mainPinLeft >= leftMin + correctionShift) {
            mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
            mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;

          } else if (mainPinTop > topMax) {
            mainPin.style.top = topMax - pinHeightShift + `px`;

          } else if (mainPinTop < topMin) {
            mainPin.style.top = topMin - pinHeightShift + `px`;

          } else if (mainPinLeft > leftMax) {
            mainPin.style.left = leftMax - correctionShift - pinWidthShift + `px`;

          } else if (mainPinLeft < leftMin + correctionShift) {
            mainPin.style.left = correctionShift - pinWidthShift + `px`;

          }

          window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

        };

        let onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          window.utilityForm.setTargetCords(adressArea, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
          document.removeEventListener(`mousemove`, onMouseMove);
          document.removeEventListener(`mouseup`, onMouseUp);
          activatePage();
        };

        document.addEventListener(`mousemove`, onMouseMove);
        document.addEventListener(`mouseup`, onMouseUp);

      };

    },

  };

})();
