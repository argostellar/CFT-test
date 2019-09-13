'use strict';

(function () {
	let red = document.getElementById('red');

	let styleSheets = document.styleSheets;
	let cssRules = styleSheets[0].cssRules;
	let colors = cssRules[0];
	let colors2 = cssRules[1];

	let cssRulesColors = []; // глобальный массив цветов

	// console.log('CSS RULES LENGTH: ');
	// console.log(cssRules.length);

	let testRegExp = new RegExp('(#[a-zA-Z0-9]{3,6})');
	let hexRegExp = new RegExp('(#[a-zA-Z0-9]{3,6})', 'gm');
	let rgbRegExp = new RegExp('(rgb\b\(\d{1,3},\s\d{1,3},\s\d{1,3}\))', 'gm');
	let rgbaRegExp = new RegExp('(rgba\b\(\d{1,3},\s\d{1,3},\s\d{1,3},\s\d{0,1}.\d+\))', 'gm');

	let testValues = ["#007bff", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#fff", "#6c757d", "#343a40", "#007bff", "#6c757d", "#28a745", "#17a2b8", "#ffc107", "#dc3545", "#f8f9fa", "#343a40"];
	let testValues2 = ["#6612f2", "#6f4231", "#e84e8c", "#2c3545", "#f37e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#fff", "#6c757d", "#343a40", "#007bff", "#6c757d", "#28a745", "#17a2b8", "#ffc107", "#dc3545", "#f8f9fa", "#343a40"];

	let convertHexToRgba = function (hex) {
		console.log(hex);
		hex = hex.replace('#','');
		let isFullLength = hex.length === 6 ? true : false;
		let r, g, b;
		let a = 1;
		if (isFullLength) {
			console.log('YES');
			r = parseInt(hex.substring(0,2), 16);
    		g = parseInt(hex.substring(2,4), 16);
    		b = parseInt(hex.substring(4,6), 16);
		} else {
			console.log('NO');
			r = parseInt(hex.substring(0,1), 16);
    		g = parseInt(hex.substring(1,2), 16);
    		b = parseInt(hex.substring(2,3), 16);
		}
		let convertedValue = 'rgba ('+ r +', '+ g +', '+ b +', '+ a +')';
		return convertedValue;
	};

	let foo = convertHexToRgba(testValues[0]);
	let bar = convertHexToRgba('#ffa');
	console.log(foo);
	console.log(bar);

	let checkEqualWithin = function (array) {
		let finalValues = [];
		let estimatedValues = array.slice();
		finalValues = array.filter(item => {
			estimatedValues.splice(0, 1);
			let stopCondition = estimatedValues.includes(item);
			let value = stopCondition ? false : true;
			return value;
		});
		return finalValues;
	};

	let result = checkEqualWithin(testValues);
	console.log('RESULT: ');
	console.log(result);

	let removeEqual = function (globalValues, currentValues) {
		let someValues = currentValues.slice();
		let checkedValues = [];
		globalValues.forEach(value => {
			checkedValues = someValues.filter(item => {
				let isEqual = globalValues.includes(item);
				if (isEqual) {
					console.log('СОВПАДЕНИЕ ЭЛЕМЕНТА! ЭЛЕМЕНТ: '+item+' УДАЛЕНИЕ В ПРОЦЕССЕ...');
				} else {
					console.log('НЕТ СОВПАДЕНИЯ. ПРОДОЛЖЕНИЕ ЦИКЛА...');
				}
				return !isEqual;
			});
		});
		return checkedValues;
	};

	let testValues3 = ["#007bff", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#20c997", "#17a2b8", "#fff", "#6c757d",  "#343a40"];
	let testValues4 = ["#6612f2", "#6610f2", "#6f42c1", "#6f4231"];

	let result2 = removeEqual(testValues3, testValues4);
	console.log('GLOBAL VALUES: ');
	console.log(testValues3);
	console.log('CURRENT VALUES: ');
	console.log(testValues4);
	console.log('GLOBAL RESULT: ');
	console.log(result2);

	let getColorValue = function (cssString, regExp) {
		console.log('CURRENT REGEXP: ');
		console.log(regExp);
		let isReal = regExp.test(cssString);
		console.log('STATE: ' + isReal);
		if (isReal) {
			let split = cssString.split(regExp);
			console.log('SPLIT: ')
			console.log(split);
			console.log(split[1]);
			let unestimatedColorValues = split.slice().filter(item => regExp.test(item));
			let colorValues = checkEqualWithin(unestimatedColorValues);
			console.log(colorValues);
			return colorValues;
		} 
		return;
	};

	let getInnerData = function (cssRule) {
		let cssTextValue = cssRule.cssText;
		let selectorTextValue = cssRule.selectorText;
		console.log('SELECTOR TEXT: ');
		console.log(selectorTextValue);
		console.log('CSS TEXT: ');
		console.log(cssTextValue);
		let YES = cssTextValue;
		getColorValue(YES, testRegExp);
	};

	getInnerData(colors);
	// getInnerData(colors2);

	// console.log(typeof colors.cssText);

	// console.log(styleSheets);
	// console.log(colors);
	// console.log(colors2);

	// let color = getComputedStyle(document.body).backgroundColor;
	// console.log(color);

})();