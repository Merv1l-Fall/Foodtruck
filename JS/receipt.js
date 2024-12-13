import { getReceipt } from "/js/fetching.js";

export async function handleReceipt(data) {
	console.log('handling data for receipt', data)

	if (!data || !data.order || !data.order.id) {
        console.error("Invalid order data. Cannot fetch receipt.");
        return;
    }
	
    try {
        const receiptArray = await getReceipt(data);
		console.log("Receipt data:", receiptArray);
        
        if (receiptArray && receiptArray.receipt.items) {
            receiptArray.receipt.items.forEach(item => {
                console.log(`Item: ${item.name}, Quantity: ${item.quantity}, price ${item.price}`);
            });
        } else {
            console.error("No items found in the receipt.");
        }
    } catch (error) {
        console.error("Error handling receipt:", error.message);
    }
}