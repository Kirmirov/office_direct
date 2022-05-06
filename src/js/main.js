'use strict'

const printElem = (elemClass, elemCount) => {
	const foundElem = document.querySelector(elemClass);
	
	for (let i = 0; i < elemCount; i++)
	{
		let elem = foundElem.cloneNode(true);
		elem.querySelector('img').setAttribute('src', 'img/cart/kl-105.png');
		foundElem.after(elem);
	} 
};

printElem('a.cart', 7);