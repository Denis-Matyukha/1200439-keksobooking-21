"use strict";
// arrays with initial dates:
const APARTMENT_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const FACILITIES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, {description: `строка с описанием`}];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAX_X_VALUE = 600;
const MAX_Y_VALUE = 350;
const MAX_PRICE = 1000000000000000;
const MAX_ROOMS_QUANTITY = 10;
const MAX_GUEST_QUANTITY = 10;
const INITIAL_Y_CORD = 130;
const FINAL_Y_CORD = 630;

// INITIAL_X_CORDS with FINAL_X_CORD must be determined by functions
let getXCords = function() {

};

// generating random values functions
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

// generator of array of objects function where Adv mean Advertisement
let getRandomAdvs = function (numberOfAdvs) {

  let advsArray = [];

  for(let i = 0; i < numberOfAdvs; i++) {
    advsArray.push({
      author: {
        avatar: `img/avatars/user0${i+1}.png`
      },
      offer: {
        title: `Описание квартиры скоро будет здесь`,
        address: `${getRandomFromInterval(0, MAX_X_VALUE)}, ${getRandomFromInterval(0, MAX_Y_VALUE)}`,
        prise: (() => {
          let rawPrice = getRandomFromInterval(0, Math.floor(MAX_PRICE*0.00000000001));
          return rawPrice - (rawPrice % 100);
        })(),
        type: `${getRandomFromArray(APARTMENT_TYPE)}`,
        rooms: getRandomFromInterval(1, MAX_ROOMS_QUANTITY),
        guests: getRandomFromInterval(1, MAX_GUEST_QUANTITY),
        checkin: `${getRandomFromArray(CHECK_TIMES)}`,
        checkout: `${getRandomFromArray(CHECK_TIMES)}`,
        features: getSetFromArrayItems(FACILITIES),
        photos: getSetFromArrayItems(PHOTOS),
      },
      location: {
        x: getRandomFromInterval(INITIAL_Y_CORD, FINAL_Y_CORD),
        y: getRandomFromInterval(INITIAL_Y_CORD, FINAL_Y_CORD),
      },
    });
  }
  return advsArray;
};

//create array with 8 objects in array
let advertisementArray = getRandomAdvs(8);

//remove .map--faded class
document.querySelector('.map').classList.remove('map--faded');


// Шаблон, который мы будем копировать.
let similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Элемент, в который мы будем вставлять похожие метки.
let similarListOfPins = document.querySelector('.map__pins');

for (let i = 0; i < advertisementArray.length; i++) {
  let objItem = advertisementArray[i];
  let pinElement = similarPinTemplate.cloneNode(true);
  /*
  style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"
  */
  pinElement.style = `left: ${objItem.location.x}px; top: ${objItem.location.y}px`;
  similarListOfPins.appendChild(pinElement);
}

/*
var WIZARD_NAMES = ['Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер'];
for (var i = 0; i < WIZARD_NAMES.length; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = WIZARD_NAMES[i];
  similarListElement.appendChild(wizardElement);
*/
/*
  <!-- Метка объявления -->

  <template id="pin">

    <button type="button" class="map__pin" style="left: 200px; top: 400px;">
      <img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления">
    </button>

  </template>

*/

/*
      <!-- Метки объявлений -->
      <div class="map__pins">
        <div class="map__overlay">
          <h2 class="map__title">И снова Токио!</h2>
        </div>
        <button class="map__pin map__pin--main" style="left: 570px; top: 375px;">
          <img src="img/muffin-red.svg" width="40" height="44" draggable="false" alt="Метка объявления">
          <svg viewBox="0 0 70 70" width="156" height="156" aria-label="Метка для поиска жилья">
            <defs>
              <path d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0" id="tophalf" />
            </defs>
            <ellipse cx="35" cy="35" rx="35" ry="35" fill="rgba(255, 86, 53, 0.7)" />
            <text><textPath xlink:href="#tophalf" startOffset="0">Поставь меня куда-нибудь</textPath></text>
          </svg>
        </button>
      </div>
*/

/*
[ ] задача 3
На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.

У метки укажите:

Координаты: style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"
Обратите внимание. Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом. Чтобы найти эту координату нужно учесть размеры элемента с меткой.

У изображения метки укажите:

Аватар: src="{{author.avatar}}"
Альтернативный текст: alt="{{заголовок объявления}}"

[ ] задача 4
Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.

Требования к коду
Код должен быть разделён на отдельные функции. Стоит отдельно объявить функцию генерации случайных данных, функцию создания DOM-элемента на основе JS-объекта, функцию заполнения блока DOM-элементами на основе массива JS-объектов. Пункты задания примерно соответствуют функциям, которые вы должны создать.

Имена файлов, функций и пр. в заданиях имеют рекомендательный характер. При выполнении задания необязательно создавать файлы, названия которых указаны в названии. Вы можете самостоятельно формировать любую структуру проекта по своему усмотрению, главное, чтобы проект выполнял ТЗ и соответствовал критериям.
*/
