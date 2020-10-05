"use strict";
// arrays with initial dates:
const APARTMENT_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const FACILITIES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, {description: `строка с описанием`}];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAX_X_VALUE = 600;
const MAX_Y_VALUE = 350;

// generator of random values function
let getRandomFromInterval = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// generator of array of objects function where Adv mean Advertisement
let getRandomAdvs = function (numberOfAdvs) {

  let advsArray = [];

  //circle with quantity of advertisements
  for(let i = 0; i < numberOfAdvs; i++) {
    advsArray.push({
      author: {
        avatar: `img/avatars/user0${i+1}.png`
      },
      offer: {
        title: `generate`,
        // address: "{{location.x}}, {{location.y}}",
        address: `${getRandomFromInterval(0, MAX_X_VALUE)}, ${getRandomFromInterval(0, MAX_Y_VALUE)}`,
      }
    });
  }

  return advsArray;
};

/*
[*] В директории js личного проекта расположен пустой файл main.js. В нем вы будете выполнять первые задания. Подключите его в файле index.html.

[ ] задача 1
Напишите функцию для создания массива из 8 сгенерированных JS объектов. Каждый объект массива ‐ описание похожего объявления неподалёку.

 Структура объектов должна быть следующей:

{
    "author": {
        "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются == [GENERATE+sring]
    },
    "offer": {
        "title": строка, заголовок предложения == [GENERATE]
        "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350" == [GENERATE]
        "price": число, стоимость == [GENERATE]
        "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow = [APARTMENT_TYPE]
        "rooms": число, количество комнат == [GENERATE]
        "guests": число, количество гостей, которое можно разместить == [GENERATE]
        "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00, = [CHECK_TIMES]
        "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00 = [CHECK_TIMES]
        "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        "description": строка с описанием, = [FACILITIES]
        "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg" = [PHOTOS]
    },
    "location": {
        "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка. == [GENERATE]
        "y": случайное число, координата y метки на карте от 130 до 630. == [GENERATE]
    }
}

[ ] задача 2
У блока .map уберите класс .map--faded.

Это временное решение, этот класс переключает карту из неактивного состояния в активное. В последующих заданиях, в соответствии с ТЗ вы будете переключать режимы страницы: неактивный, в котором карта и форма заблокированы и активный режим, в котором производится ввод данных и просмотр похожих объявлений. Сейчас для тестирования функции генерации похожих объявлений мы временно сымитируем активный режим, а в последующих разделах запрограммируем его полностью.

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
