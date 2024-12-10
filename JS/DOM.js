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
	else if((type == drink || type === dip) && items.length > 0){
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
			menuItem.price = item.price
			
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
		subMenuItem.price = item.price

		const subMenuSelections = document.querySelector(`.submenu-selections[data-type="${item.type}"]`)
		subMenuSelections.appendChild(subMenuItem);
	})
	
	//making sure prices are updated correctly
	const dipItem = items.find(item => item.type === "dip")
	const drinkItem = items.find(item => item.type === "drink")
	
	if(dipItem) {
		const subMenuDipPrice = document.querySelector('.dip-price')
		subMenuDipPrice.innerText = `${dipItem.price} SEK`
	}
	
	
	if(drinkItem){
		const subMenuDrinkPrice = document.querySelector('.drink-price')
		subMenuDrinkPrice.innerText = `${drinkItem.price} SEK`
	}
	
}

// handle Buttons in the menus



function handleButtons() {
	const submenuButtons = document.querySelectorAll('.submenu-item');
	const menuButtons = document.querySelectorAll('.menu-item');
  
	submenuButtons.forEach(button => {
	  button.addEventListener('click', (event) => {
		const targetButton = event.currentTarget;
		if (targetButton.classList.contains('selected')) {
		  targetButton.classList.remove('selected');
		} else {
		  console.log(targetButton.price);
		  targetButton.classList.add('selected');
		}
	  });
	});
  
	menuButtons.forEach(button => {
	  button.addEventListener('click', (event) => {
		const targetButton = event.currentTarget;
		if (targetButton.classList.contains('selected')) {
		  targetButton.classList.remove('selected');
		} else {
		  console.log(targetButton.price);
		  targetButton.classList.add('selected');
		}
	  });
	});
  }

async function loadMenu(){
	await fetchMenuItems(wonton)
	await fetchMenuItems(drink)
	await fetchMenuItems(dip)

	handleButtons();
}

//Switching between different views
const menuSection = document.querySelector('#menu');
const cartSection = document.querySelector('#cart');

const cartButton = document.querySelector('.cart-button');
const cartReturnButton = document.querySelector('.cart-return-button');



cartReturnButton.addEventListener('click', () => {
 cartSection.classList.remove('display-flex')
 menuSection.classList.add('display-flex')
})
cartButton.addEventListener('click', () => {
	cartSection.classList.add('display-flex')
	menuSection.classList.remove('display-flex')

})



loadMenu();