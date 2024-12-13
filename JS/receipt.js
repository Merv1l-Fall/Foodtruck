import { getReceipt } from "/js/fetching.js";

export async function handleReceipt(data) {
	console.log(data)
    try {
        const receipt = await getReceipt(data);
        
        if (receipt && receipt.items) {
            receipt.items.forEach(item => {
                console.log(`Item: ${item.name}, Quantity: ${item.quantity}`);
            });
        } else {
            console.error("No items found in the receipt.");
        }
    } catch (error) {
        console.error("Error handling receipt:", error.message);
    }
}