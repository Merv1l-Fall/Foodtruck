const APIkey = 'yum-JAaNDtW2DyvIHS96';
const menuUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=wonton'
let wontonItems = [];

const TestKeyButton = document.querySelector('.cart-button')


// TestKeyButton.addEventListener('click', ()  =>{
// 	getWontonItems(menuUrl);
// })

async function getWontonItems(menuUrl){
	try{
		const response = await fetch(menuUrl, {
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


export{ getWontonItems };