'use strict';

(function () {
    let template = document.querySelector('#color-tile')
        .content
        .querySelector('.color-tile');
    let fragment = document.createDocumentFragment();
    let tileList = document.querySelector('.tile-list');
    let tilesCounter = document.querySelector('.tiles-count__counter');

    let styleSheets = document.styleSheets;
    let cssRules = Array.from(styleSheets[0].cssRules);

    let cssRulesColors = []; // глобальный массив цветов, куда будут записаны все цвета из CSS

    // регулярные выражения, используемые для поиска цветов
    let hexRegExp = /(#\w{3,6})/gm;
    let rgbRegExp = /(rgb\b\(\d{1,3},\s\d{1,3},\s\d{1,3}\))/gm;
    let rgbaRegExp = /(rgba\b\(\d{1,3},\s\d{1,3},\s\d{1,3},\s(?:(?:\d{0,1}\.\d+)|(?:[1|0]))\))/gm;

    // массив регулярных выражений
    let regExps = [hexRegExp, rgbRegExp, rgbaRegExp];

    // функция конвертации HEX цветов в RGBA цвета
    let convertHexToRgba = function (hex) {
        let r, g, b = '';
        let a = 1;
        if (hex.length <= 7) {
            hex = hex.replace('#', '');
            let isFullLength = hex.length === 6 ? true : false;
            if (isFullLength) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            } else {
                r = parseInt(hex.substring(0, 1), 16);
                g = parseInt(hex.substring(1, 2), 16);
                b = parseInt(hex.substring(2, 3), 16);
            }
            let convertedValue = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
            return convertedValue;
        }
        return hex;
    };

    // функция конвертации RGB цветов в RGBA цвета
    let convertRgbToRgba = function (rgb) {
        rgb = rgb.replace(')', ', ');
        rgb = rgb.replace('(', 'a(');
        return rgb + '1)';
    };

    // функция удаления одинаковых элементов внутри одного массива
    let removeEqualWithin = function (array) {
        let finalValues = [];
        let estimatedValues = array.slice();
        finalValues = array.filter(item => {
            estimatedValues.splice(0, 1);
            let isEqual = estimatedValues.includes(item);
            return !isEqual;
        });
        return finalValues;
    };

    // функция, удаляющая значения из текущего массива, при обнаружении одинаковых в глобальном
    let removeEqual = function (globalValues, currentValues) {
        if (globalValues.length === 0) {
            return currentValues;
        } else {
            let someValues = currentValues.slice();
            let checkedValues = [];
            globalValues.forEach(value => {
                checkedValues = someValues.filter(item => {
                    let isEqual = globalValues.includes(item);
                    return !isEqual;
                });
            });
            return checkedValues;
        };
    };

    // функция извлечения цветов из текста CSS правила
    let getColorValue = function (cssString) {
        let colorValues = [];
        for (let i = 0; i < regExps.length; i++) {
            let regExp = regExps[i];
            let isReal = regExp.test(cssString);
            if (isReal) {
                let split = cssString.split(regExp);
                let unestimatedValues = split.slice().filter(item => regExp.test(item));
                let convertedValues = [];
                if (regExp === hexRegExp) {
                    convertedValues = unestimatedValues.map(value => convertHexToRgba(value));
                } else if (regExp === rgbRegExp) {
                    convertedValues = unestimatedValues.map(value => convertRgbToRgba(value));
                } else {
                    convertedValues = unestimatedValues;
                }
                let readyValues = removeEqualWithin(convertedValues);
                colorValues = [...readyValues];
            }
        }
        return colorValues;
    };

    // функция извлечения цветов из CSS правила
    let getRuleColors = function (cssRule) {
        let cssTextValue = cssRule.cssText;
        let selectorTextValue = cssRule.selectorText;
        let ruleColors = getColorValue(cssTextValue);
        return ruleColors;
    };

    // функция собирающая цвета из CSS в глобальный массив
    let collectStyleSheetsColors = function (cssRules) {
        cssRules.forEach(rule => {
            let uncheckedColors = getRuleColors(rule);
            let checkedColors = removeEqual(cssRulesColors, uncheckedColors);
            let bufferColors = [...checkedColors];
            cssRulesColors = cssRulesColors.concat(bufferColors);
        });
    };

    // функция создания цветовой плитки (используя шаблон)
    let createColorTile = function (color) {
        let colorTile = template.cloneNode(true);
        let colorName = colorTile.querySelector('.color-tile__name');

        colorTile.style.backgroundColor = color;
        colorTile.style.border = '1px solid black';

        colorName.textContent = color;

        return colorTile;
    };

    // функция рендера плиток (используя глобальный массив цветов)
    let renderTiles = function (colors) {
        colors.forEach(color => {
            let currentTile = createColorTile(color);
            fragment.appendChild(currentTile);
        });
        tileList.appendChild(fragment);
    };

    // функция исполнения программы
    let executeTask = function () {
    	collectStyleSheetsColors(cssRules);
    	tilesCounter.textContent = cssRulesColors.length;
    	renderTiles(cssRulesColors);
    };

    // исполнение программы (вызов функции)
    executeTask();

})();