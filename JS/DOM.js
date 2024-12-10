import { getMenuItems } from "./fetching.js";
import { cartManager } from './cart.js';



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
			menuItem.setAttribute('data-price', item.price)
			
			const menuItemInner = document.createElement('div');
			menuItemInner.classList.add('menu-item-inner');
			
			const nameElement = document.createElement('p');
			nameElement.classList.add('item-name')
			nameElement.innerText = item.name;
			
			const dottedDivider = document.createElement('div');
			dottedDivider.classList.add('dotted-divider');
		
			const priceElement = document.createElement('p');
			priceElement.innerText = `${item.price} SEK`;
			priceElement.classList.add('item-price')
		
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
		subMenuItem.setAttribute('data-price', item.price)

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

//updating the cart
function updateCart(){
	const cartItems = cartManager.getCartItems();
	const cartInnerContainer = document.querySelector("#cart-inner-container");
	cartInnerContainer.innerHTML = '';

	let totalPrice = 0;

	cartItems.forEach(item => {
		const cartItem = document.createElement('div');
		cartItem.classList.add('cart-item');
	
		const cartItemInner = document.createElement('div');
		cartItemInner.classList.add('cart-item-inner');
	
		const cartItemName = document.createElement('p');
		cartItemName.innerText = item.name;
	
		const cartDivider = document.createElement('div');
		cartDivider.classList.add('dotted-cart-divider');
	
		const cartItemPrice = document.createElement('p');
		cartItemPrice.innerText = `${item.price} SEK`;
	
		cartItemInner.appendChild(cartItemName);
		cartItemInner.appendChild(cartDivider);
		cartItemInner.appendChild(cartItemPrice);
	
		const cartItemCounter = document.createElement('div');
		cartItemCounter.classList.add('cart-item-counter');
	
		const addButton = document.createElement('button');
		addButton.classList.add('add-button');
		addButton.innerText = ' + ';
	
		const priceCounterElement = document.createElement('p');
		priceCounterElement.classList.add('amount');
		priceCounterElement.innerText = `${item.quantity} stycken`;
	
		const removeButton = document.createElement('button');
		removeButton.classList.add('remove-button');
		removeButton.innerText = ' - ';
	
		addButton.addEventListener('click', () => {
		  cartManager.addItem(item.name, item.price, item.type);
		  updateCart();
		});
	
		removeButton.addEventListener('click', () => {
		  cartManager.removeItem(item.name);
		  updateCart();
		});
	
		cartItemCounter.appendChild(removeButton);
		cartItemCounter.appendChild(priceCounterElement);
		cartItemCounter.appendChild(addButton);
	
		cartItem.appendChild(cartItemInner);
		cartItem.appendChild(cartItemCounter);
	
		cartInnerContainer.appendChild(cartItem);

		totalPrice += item.price * item.quantity;
	  });

	  const totalPriceElement = document.querySelector ('.total-price')

	  totalPriceElement.innerText = `${totalPrice} SEK`;
	

}



// handle Buttons
function handleButtons() {
	const submenuButtons = document.querySelectorAll('.submenu-item');
	const menuButtons = document.querySelectorAll('.menu-item');
  
	submenuButtons.forEach(button => {
	  button.addEventListener('click', (event) => {
		const targetButton = event.currentTarget;
		const itemName = targetButton.textContent;
		const itemType = targetButton.dataset.type;
		const price = parseInt(targetButton.dataset.price, 10);

		cartManager.addItem(itemName, price, itemType);

		updateCart();
	  });
	});
  
	menuButtons.forEach(button => {
	  button.addEventListener('click', (event) => {
		const targetButton = event.currentTarget;
		const itemName = targetButton.querySelector('.item-name').textContent;
		const price = parseInt(targetButton.querySelector('.item-price').textContent.split('')[0], 10);

		cartManager.addItem(itemName, price, "wonton")

		updateCart();
	  });
	});
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


async function loadMenu(){
	await fetchMenuItems(wonton)
	await fetchMenuItems(drink)
	await fetchMenuItems(dip)

	handleButtons();
}
loadMenu();