const APIkey = 'yum-JAaNDtW2DyvIHS96';
const menuUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=wonton'
let wontonItems = [];

const TestKeyButton = document.querySelector('.cart-button')


TestKeyButton.addEventListener('click', ()  =>{
	getWontonItems(menuUrl);
})

async function getWontonItems(menuUrl){
	try{
		const response = await fetch(menuUrl, {
			method: 'GET',
			headers:{
					// "Authorization": `Bearer ${APIkey}`,
					'x-zocom': APIkey,
					'Content-Type': 'application/json',
				}
		});
		if(!response.ok){
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const data = await response.json();
		wontonItems = data;
		console.log(wontonItems);
	}
	catch(error) {
		console.error('Error getting menu', error);
	}
}


export{wontonItems};