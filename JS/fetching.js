import { cartManager } from "./cart.js";

const APIkey = 'yum-JAaNDtW2DyvIHS96';
const tenant = 'epjp'
let wontonItems = [];

const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/'

async function getMenuItems(Url){
	try{
		const response = await fetch(Url, {
			method: 'GET',
			headers:{
					'x-zocom': APIkey,
					'Content-Type': 'application/json',
				},
		});
		if(!response.ok){
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const data = await response.json();
		wontonItems = data;
		return data.items;
	}
	catch(error) {
		console.log('Error getting menu', error);
		return [];
	}
}



async function placeOrder(cartManager){
	const orderData = {
        items: cartManager.getCartItems().flatMap(item => 
            Array(item.quantity).fill(Number(item.id))
        )
		// items: [1, 1]
    };
	console.log("placing order", orderData)
	try{
		const options = {
			method: 'POST',
			headers: {
				"Content-Type": 'application/json',
				"x-zocom": APIkey,
			},
			body: JSON.stringify(orderData)
		}

		console.log("Order data before sending:", JSON.stringify(orderData));
		const response = await fetch(`${apiUrl}${tenant}/orders`, options);

		if (!response.ok) {
			const errorResponse = await response.text();
			console.error('Error response', errorResponse);
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
		
		const data = await response.json();
		console.log('Order placed sucsessfully', data);
		return data;
	}

	catch(error){
		console.error('Error placing order', error.message);
		throw error;
	}
};




export{ getMenuItems, placeOrder };