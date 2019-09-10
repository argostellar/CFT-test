'use strict';

(function () {
	let red = document.getElementById('red');
	console.log('HELLO');

	let clickHandler = function (evt) {
		evt.preventDefault();
		red.style.outline = '2px solid red';
		console.log('Click!');
	};

	red.addEventListener('click', clickHandler);

	console.log(document);

	let styleSheets = document.styleSheets;

	// let colors = document.styleSheets[0].cssRules[0];

	let color = getComputedStyle(document.body).backgroundColor;

	console.log(styleSheets);
	// console.log(colors);
	console.log(color);

})();