'use strict';

var GAP = 10;
var FONT_GAP = 20;
var NAMES_GAP = 40;
var RECTANGLE_WIDTH = 420;
var RECTANGLE_HEIGHT = 270;
var RECTANGLE_X = 100;
var RECTANGLE_Y = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var namesY = RECTANGLE_Y + RECTANGLE_HEIGHT - (GAP * 2); // Находим прямоугольник на координатах и спускаем в самый низ прямоугольника(максимальная высота)

var renderRectangle = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, RECTANGLE_WIDTH, RECTANGLE_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

window.renderStatistics = function (ctx, names, times) {
  renderRectangle(ctx, RECTANGLE_X + GAP, RECTANGLE_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderRectangle(ctx, RECTANGLE_X, RECTANGLE_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', RECTANGLE_X + GAP * 2, RECTANGLE_Y + GAP * 3);
  ctx.fillText('Список результатов:', RECTANGLE_X + GAP * 2, RECTANGLE_Y + (GAP * 3) + FONT_GAP);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var formulaCalculationX = RECTANGLE_X + NAMES_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var formulaCalculationY = namesY - FONT_GAP - ((BAR_HEIGHT * times[i]) / maxTime); // Спускаем в самый низ прямуогольника и каждый раз смещаем координату отрисовки по высоте учитывая высоту прямоугольника.
    var resultsTime = Math.floor(times[i]);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], formulaCalculationX, namesY);
    ctx.fillText(resultsTime, formulaCalculationX, formulaCalculationY - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(formulaCalculationX, formulaCalculationY, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    } else {
      var saturationRandom = getRandomInt(0, 101);

      ctx.fillStyle = 'hsla(225, ' + saturationRandom + '%, 50%, 1)';
      ctx.fillRect(formulaCalculationX, formulaCalculationY, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    }
  }
};
