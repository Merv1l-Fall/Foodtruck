import { getMenuItems } from "./fetching.js";

const menuContainer = document.querySelector('#menu-container')
const wonton = 'wonton'
const drink = 'drink'
const dip = 'dip'

//getting the menu items and calling the correct function
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
			const menuItem = document.createElement('button');
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
			ingredientsElement.classList.add('ingredients')
			ingredientsElement.innerText = item.ingredients.join(', ');
		
			menuItem.appendChild(menuItemInner);
			menuItem.appendChild(ingredientsElement);
		
			menuContainer.appendChild(menuItem);
		})
}


//Creating the submenus and showing them
function createSubMenu(items){
	items.forEach(item => {
		const subMenuItem = document.createElement('button');
		subMenuItem.classList.add('submenu-item');
		subMenuItem.innerText = item.name;

		const subMenuSelections = document.querySelector(`.submenu-selections[data-type="${item.type}"]`)
		subMenuSelections.appendChild(subMenuItem);
	})

	//making sure prices are updated correctly
	const dipItem = items.find(item => item.type === "dip")
	const drinkItem = items.find(item => item.type === "drink")

	if(dipItem) {
		const subMenuDipPrice = document.querySelector('.dip-price')
		subMenuDipPrice.innerText = `${dipItem.price} SEK`

	} else{
		console.log("no dip prices found")
	}

	if(drinkItem){
		const subMenuDrinkPrice = document.querySelector('.drink-price')
		subMenuDrinkPrice.innerText = `${drinkItem.price} SEK`
	} else{
		console.log("no drink prices found")
	}

}

fetchMenuItems(wonton);
fetchMenuItems(drink);
fetchMenuItems(dip);