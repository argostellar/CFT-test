'use strict';

(function () {
    let red = document.getElementById('red');

    let styleSheets = document.styleSheets;
    let cssRules = Array.from(styleSheets[0].cssRules);
    let colors = cssRules[0];
    let colors2 = cssRules[1];

    let cssRulesColors = []; // глобальный массив цветов

    let testRegExp = /(#\w{3,6})/gm;
    let hexRegExp = /(#\w{3,6})/gm;
    let rgbRegExp = /(rgb(?:\s|\b)\(\d{1,3},\s\d{1,3},\s\d{1,3}\))/gm;
    let rgbaRegExp = /(rgba(?:\s|\b)\(\d{1,3},\s\d{1,3},\s\d{1,3},\s(?:(?:\d{0,1}\.\d+)|(?:[1|0]))\))/gm;

    let regExps = [hexRegExp, rgbRegExp, rgbaRegExp];

    let testValues = ["#007bff", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#fff", "#6c757d", "#343a40", "#007bff", "#6c757d", "#28a745", "#17a2b8", "#ffc107", "#dc3545", "#f8f9fa", "#343a40"];
    let testValues2 = ["#6612f2", "#6f4231", "#e84e8c", "#2c3545", "#f37e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#fff", "#6c757d", "#343a40", "#007bff", "#6c757d", "#28a745", "#17a2b8", "#ffc107", "#dc3545", "#f8f9fa", "#343a40"];

    let convertHexToRgba = function (hex) {
        let r, g, b = '';
        let a = 1;
        if (hex.length <= 7) {
            hex = hex.replace('#', '');
            let isFullLength = hex.length === 6 ? true : false;
            if (isFullLength) {
                console.log('YES');
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            } else {
                console.log('NO');
                r = parseInt(hex.substring(0, 1), 16);
                g = parseInt(hex.substring(1, 2), 16);
                b = parseInt(hex.substring(2, 3), 16);
            }
            let convertedValue = 'rgba (' + r + ', ' + g + ', ' + b + ', ' + a + ')';
            return convertedValue;
        }
        return hex;
    };

    let convertRgbToRgba = function (rgb) {
        rgb = rgb.replace(')', ', ');
        return rgb + '1)';
    };

    let checkEqualWithin = function (array) {
        let finalValues = [];
        let estimatedValues = array.slice();
        finalValues = array.filter(item => {
            estimatedValues.splice(0, 1);
            let stopCondition = estimatedValues.includes(item);
            return !stopCondition;
        });
        return finalValues;
    };

    let removeEqual = function (globalValues, currentValues) {
        if (globalValues.length === 0) {
            console.log('FIRST ENTRY!');
            return currentValues;
        } else {
        	console.log('GLOBAL VALUES: ');
        	console.log(globalValues);
        	console.log('CURRENT VALUES: ');
        	console.log(currentValues);
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

    let testValues3 = ["#007bff", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#fff", "#6c757d", "#343a40"];
    let testValues4 = ["#6612f2", "#6610f2", "#6f42c1", "#6f4231"];

    let getColorValue = function (cssString) {
        let colorValues = [];
        console.log('CURRENT RULE: ');
        console.log(cssString);
        for (let i = 0; i < regExps.length; i++) {
            let regExp = regExps[i];
            let isReal = regExp.test(cssString);
            console.log('CURRENT REGEXP: ');
            console.log(regExp);
            console.log('ANY MATCH WITHIN RULE: ');
            console.log(isReal);
            if (isReal) {
                let split = cssString.split(regExp);
                let unestimatedColorValues = split.slice().filter(item => regExp.test(item));
                let estimatedValues = checkEqualWithin(unestimatedColorValues);
                let readyValues = [];
                if (regExp === hexRegExp) {
                    readyValues = estimatedValues.map(value => convertHexToRgba(value));
                } else if (regExp === rgbRegExp) {
                    readyValues = estimatedValues.map(value => convertRgbToRgba(value));
                } else {
                    readyValues = estimatedValues;
                }
                colorValues = [...readyValues];
                console.log('COLOR VALUES: ');
                console.log(colorValues);
            } else {
                console.log('NO MATCH');
            };
        }
        return colorValues;
    };

    let getRuleColors = function (cssRule) {
        let cssTextValue = cssRule.cssText;
        let selectorTextValue = cssRule.selectorText;
        let ruleColors = getColorValue(cssTextValue);
        console.log(ruleColors);
        return ruleColors;
    };

    let counter = 0;

    let getStyleSheetsColors = function (cssRules) {
        // let cssText = styleSheet.cssText;
        cssRules.forEach(rule => {
        	++counter;
            console.log('RULE: ' + counter);
            // console.log(rule.cssText);
            let uncheckedColors = getRuleColors(rule);
            console.log('UNCHECKED COLORS: ');
            console.log(uncheckedColors);
            let checkedColors = removeEqual(cssRulesColors, uncheckedColors);
            console.log('CHECKED COLORS: ');
            console.log(checkedColors);
            let bufferColors = [...checkedColors];
            cssRulesColors = cssRulesColors.concat(bufferColors);
            console.log('CURRENT COLORS: ');
            console.log(cssRulesColors);
        });
    };

    // getStyleSheetsColors(cssRules);

    console.log(cssRulesColors);
    // console.log(cssRules);

    let testRule = cssRules[2];
    let testText = testRule.cssText
    let maybe = getRuleColors(testRule);
    let uncertain = getColorValue(testText);

    let littleCheck = function (string) {
    	let value = rgbaRegExp.test(string);
    	console.log('ТЕСТ ПРОШЁЛ: ');
    	console.log(value);
    	let part = string.split(rgbaRegExp);
    	console.log('ФРАГМЕНТ: ');
    	console.log(part);
    };

    console.log('TEST RULE MUST BE EXECUTED ---------->');
    console.log(testRule.cssText);
    console.log(maybe);
    littleCheck(testText);
    console.log('UNCERTAIN: ');
    console.log(uncertain);
    console.log('THIS IS IMPORTANT ----------------->');

})();