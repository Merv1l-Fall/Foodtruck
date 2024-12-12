const cart = [];

export const cartManager = {
	addItem(name, price, type, id) {
		const existingItem = cart.find(item => item.name === name);

		if(existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.push({id, name, price, type, quantity: 1 })
		}
	},

	removeItem(name){
		const itemIndex = cart.findIndex(item => item.name === name);
		if (itemIndex !== -1) {
			const item = cart[itemIndex];
			item.quantity -= 1;
			if(item.quantity === 0) {
				cart.splice(itemIndex, 1);
			}
		}
	},

	getTotalPrice() {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

	getCartItems() {
		return [...cart]
	},

	resetCart() {
		cart.length = 0;
	}
}