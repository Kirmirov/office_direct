'use strict'

const copyElem = (elemClass, elemCount) => {
	const foundElem = document.querySelector(elemClass);
	
	for (let i = 0; i < elemCount; i++)
	{
		let elem = foundElem.cloneNode(true);
		// elem.querySelector('img').setAttribute('src', 'img/cart/kl-105.png');
		foundElem.after(elem);
	} 
};


copyElem('a.cart', 7);
copyElem('.slider__slide', 4);


const selectControl = (selectID) => 
{
	const select 		= document.querySelector(selectID),
		selectHeader 	= select.querySelector('.select__header'),
		selectBody 		= select.querySelector('.select__body'),
		headerTitle 	= selectHeader.querySelector('.select__title');

	const toggleSelect = () => {
		selectHeader.classList.toggle('select__header--active');
		setTimeout(() => {
			selectBody.classList.toggle('select__body--active');
		}, selectBody.classList.contains('select__body--active') ? 0 : 300);
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

const init = () => {
	let map = new ymaps.Map("map", {
		center: [43.20259659959205,27.9168840397141],
		zoom: 15
	});

	const officeCenter 	= [43.200320445995864,27.91386387236333];
	const seeCenter 	= [43.1950286176228,27.917849134096397];
	const parkCenter 	= [43.202902178793,27.9231500132146];

	let officeMark = new ymaps.Placemark(officeCenter, 
	{
		balloonContentHeader: "OфисDирект",
		balloonContentBody: "Режим работы: c 8:00 до 16:00",
		balloonContentFooter: "Варна, ул. Козлодуй, блок 3, ап. 10"
	}, 
	{
		iconLayout: "default#image",
		iconImageHref: "img/map/office.png",
		iconImageSize: [99, 99],
		iconImageOffset: [-50, -100],
		hideIconOnBalloonOpen: false
	});

	

	map.geoObjects.add(officeMark);
	officeMark.balloon.open();

	let seeMark = new ymaps.Placemark(seeCenter, 
	{
		balloonContentHeader: "Морской порт",
		balloonContentBody: "Режим работы: c 10:00 до 20:00",
		balloonContentFooter: "Варна, Приморский бульвар"
	}, 
	{
		preset: 'islands#darkOrangeIcon',
		iconImageOffset: [-50, -150]
	});

	map.geoObjects.add(seeMark);

	let parkMark = new ymaps.Placemark(parkCenter, 
	{
		balloonContentHeader: "Городской парк",
		balloonContentBody: "Режим работы: круглосуточно",
		balloonContentFooter: "Варна, бульвар Князя Бориса I"
	}, 
	{
		preset: 'islands#violetCircleIcon',
		iconImageOffset: [600, 300]
	});

	map.geoObjects.add(parkMark);

	map.controls.remove('geolocationControl');
	map.controls.remove('searchControl');
	map.controls.remove('trafficControl');
	map.controls.remove('typeSelector');
	map.controls.remove('fullscreenControl');
	map.controls.remove('zoomControl');
	map.controls.remove('rulerControl');
	map.behaviors.disable(['scrollZoom']);

	window.addEventListener('resize', () => {
		map.setCenter([43.20259659959205,27.9168840397141]);
	});

}

ymaps.ready(init);


const mobileMenu = () => {
	const buttonOpen 	= document.querySelector('.header__burger');
	const buttonClose 	= document.querySelector('.mobile-close');
	const menuBody 		= document.querySelector('.mobile');

	buttonOpen.addEventListener('click', () => {
		buttonOpen.style.display 	= "none";
		buttonClose.style.display 	= "block";
		menuBody.style.display 		= "flex";
	});

	buttonClose.addEventListener('click', () => {
		buttonOpen.style.display 	= "block";
		buttonClose.style.display 	= "none";
		menuBody.style.display 		= "none";
	});
}

mobileMenu();
	
const modal = (modalSelector, buttonsSelectors = []) => {

	const modal 	= document.querySelector(modalSelector);
	const buttons 	= [];

	modal.addEventListener('click', (evt) => {
		if (evt.target.matches('.modal')) 
		{
			document.body.style.position = 'inherit';
			modal.style.display = 'none';
		}
	});

	buttonsSelectors.forEach((selector) => {
		let buton = document.querySelector(selector);
		buttons.push(buton);
	});

	buttons.forEach((buton) => {
		buton.addEventListener('click', () => {
			modal.style.display = 'block';
			document.body.style.position = 'fixed';
			setTimeout(() => {
				modal.style.display = 'none';
				document.body.style.position = 'inherit';
			}, 2000);
		});
	});
}

modal('.modal', ['.button-second--none', '.record__button', '.questions__button']);

const swiper = new Swiper('.swiper', {
	// Optional parameters
	loop: true,
	effect: 'flip',
	grabCursor: true,
	slideToClickedSlide: true,
	
	// If we need pagination
	pagination: {
		el: '.slider__pagination',
		clickable: true
	},

	// Navigation arrows
	navigation: {
		nextEl: '.slider-arrow-left',
		prevEl: '.slider-arrow-right',
	},
});

const hoverImg = (imgWrapSelector, newImgURL) => {

	const imgWrap = document.querySelector(imgWrapSelector);
	const img =	imgWrap.querySelector('img');
	let oldImgURL;

	imgWrap.addEventListener('mouseover', () => {
		oldImgURL = img.src;
		img.src = newImgURL;
	});

	imgWrap.addEventListener('mouseout', () => {
		img.src = oldImgURL;
	});
}

hoverImg('.slider-arrow-left', 'img/slider/arrow-blue.png');
hoverImg('.slider-arrow-right', 'img/slider/arrow-blue.png');