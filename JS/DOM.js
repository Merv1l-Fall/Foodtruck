import { getWontonItems } from "./fetching.js";

const menuContainer = document.querySelector('#menu-container')


async function fetchMenuItems() {
	const menuUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=wonton';
	const wontonItems = await getWontonItems(menuUrl);
	console.log(wontonItems);

	if(wontonItems && wontonItems.length > 0){
		createMenu(wontonItems);
	}
	else{
		console.log('error getting menu items');
	}
}




//Creating the menu items and showing them
function createMenu(items){
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

fetchMenuItems();