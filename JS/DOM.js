import { wontonItems } from "./fetching.js";

const menuContainer = document.querySelector('#menu-container')



wontonItems.forEach(item => {
	const menuItem = document.createElement('div');
	menuItem.classList.add('menu-item');
	
	const menuItemInner = document.createElement('div');
	menuItemInner.classList.add('menu-item-inner');
	
	const NameElement = document.createElement('p');
	NameElement.innerText = item.name;
	
	const dottedDivider = document.createElement('div');
	dottedDivider.classList.add('dotted.divider');

	const priceElement = document.createElement('p');
 	priceElement.innerText = item.price;

	 menuItemInner.appendChild(nameElement);
	 menuItemInner.appendChild(dottedDivider);
	 menuItemInner.appendChild(priceElement)

	 const ingredientsElement = document.createElement('p');ingredientsElement.innerText = item.ingredients;

	 menuItem.appendChild(menuItemInner);
	 menuItem.appendChild(ingredientsElement);

	 container.appendChild(menuItem);
})