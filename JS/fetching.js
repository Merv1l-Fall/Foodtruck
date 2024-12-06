const APIkey = 'yum-JAaNDtW2DyvIHS96';
let wontonItems = [];

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


export{ getMenuItems };