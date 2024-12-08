import { getMenuItems } from "./fetching.js";

const menuContainer = document.querySelector('#menu-container')
const wonton = 'wonton'
const drink = 'drink'
const dip = 'dip'

async function fetchMenuItems(type) {
	const Url = `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=${type}`;
	const items = await getMenuItems(Url);
	// console.log(items);

	if(type == wonton && items.length > 0){
		createMenu(items);
	}
	else if(type == drink && items.length > 0){
		createSubMenu(items)
	}
	else if(type == dip && items.length > 0){
		createSubMenu(items)
	}
	else{
		console.log('error getting menu items');
	}
}




//Creating the menu items and showing them
function createMenu(items){
	console.log(items);

		items.forEach(item => {
			const menuItem = document.createElement('div');
			menuItem.classList.add('menu-item');
			
			const menuItemInner = document.createElement('div');
			menuItemInner.classList.add('menu-item-inner');
			
			const nameElement = document.createElement('p');
			nameElement.innerText = item.name;
			
			const dottedDivider = document.createElement('div');
			dottedDivider.classList.add('dotted-divider');
		
			const priceElement = document.createElement('p');
			priceElement.innerText = `${item.price} SEK`;
		
			menuItemInner.appendChild(nameElement);
			menuItemInner.appendChild(dottedDivider);
			menuItemInner.appendChild(priceElement)
		
			const ingredientsElement = document.createElement('p');
			ingredientsElement.innerText = item.ingredients.join(', ');
		
			menuItem.appendChild(menuItemInner);
			menuItem.appendChild(ingredientsElement);
		
			menuContainer.appendChild(menuItem);
		})
}

function createSubMenu(items){
	items.forEach(item => {
		const subMenuItem = document.createElement('p');
		subMenuItem.classList.add('submenu-item');
		subMenuItem.innerText = item.name;

		const subMenuSelections = document.querySelector(`.submenu-selections[data-type="${item.type}"]`)
		subMenuSelections.appendChild(subMenuItem);
	})
}

fetchMenuItems(wonton);
fetchMenuItems(drink);
fetchMenuItems(dip);