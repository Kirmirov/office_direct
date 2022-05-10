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


const selectControl = (selectID) => 
{
	const select 		= document.querySelector(selectID),
		selectHeader 	= select.querySelector('.select__header'),
		selectBody 		= select.querySelector('.select__body'),
		headerTitle 	= selectHeader.querySelector('.select__title');

	const toggleSelect = () => {
		selectHeader.classList.toggle('select__header--active');
		selectBody.classList.toggle('select__body--active');
	};

	selectHeader.addEventListener('click', () => {
		toggleSelect();
	});

	selectBody.addEventListener('click', (evt) => {
		if (evt.target.matches('.select__item'))
		{
			headerTitle.innerText = evt.target.innerText;
			toggleSelect();
		}
	});
};


selectControl('#select1');