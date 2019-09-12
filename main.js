'use strict';

(function () {
	let red = document.getElementById('red');

	let styleSheets = document.styleSheets;

	let cssRules = document.styleSheets[0].cssRules;
	// console.log('CSS RULES LENGTH: ');
	// console.log(cssRules.length);

	let testRegExp = new RegExp('(#[a-zA-Z0-9]{3,6})');

	let hexRegExp = new RegExp('(#[a-zA-Z0-9]{3,6})', 'gm');

	let rgbRegExp = new RegExp('(rgb\b\(\d{1,3},\s\d{1,3},\s\d{1,3}\))', 'gm');

	let rgbaRegExp = new RegExp('(rgba\b\(\d{1,3},\s\d{1,3},\s\d{1,3},\s\d{0,1}.\d+\))', 'gm');

	let getColorValue = function (cssString, regExp) {
		console.log('CURRENT REGEXP: ');
		console.log(regExp);
		let isReal = regExp.test(cssString);
		
		if (isReal) {
			console.log('DATA: ')
			console.log(regExp.exec(cssString));
			let search = cssString.search(regExp);
			let matchedValues = cssString.match(regExp);
			let split = cssString.split(regExp);
			console.log('MATCHED VALUES: ');
			console.log(matchedValues);
			console.log('SEARCH RESULTS: ');
			console.log(search);
			console.log('STATE: ' + isReal);
			console.log('SPLIT: ')
			console.log(split);
		}
	};

	let colors = document.styleSheets[0].cssRules[0];
	let colors2 = document.styleSheets[0].cssRules[1];

	let getInnerData = function (cssRule) {
		let cssTextValue = cssRule.cssText;
		let selectorTextValue = cssRule.selectorText;
		console.log('SELECTOR TEXT: ');
		console.log(selectorTextValue);
		console.log('CSS TEXT: ');
		console.log(cssTextValue);
		let YES = cssTextValue.toString();
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