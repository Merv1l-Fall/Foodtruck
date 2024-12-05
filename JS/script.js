const TestKeyButton = document.querySelector('.cart-button')




const APIkey = '';
let url = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys';


TestKeyButton.addEventListener('click', ()  =>{
	getApiKey(url);
})
async function getApiKey(url){
	try{
		const response = await fetch(url, {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json',
			}
		});
		if(!response.ok){
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json();
		console.log('API key:', data)
	}

	catch(error){
		console.error('Error fetching api key', error)
	}
}