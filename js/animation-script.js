export function animateToCart(buttonElement) {
	const cartButton = document.querySelector(".cart-button");

	const itemRect = buttonElement.getBoundingClientRect();
	const cartRect = cartButton.getBoundingClientRect();

	const clone = buttonElement.cloneNode(true);
	clone.classList.add("animated-item");
	document.body.appendChild(clone);

	clone.style.position = "absolute";
	clone.style.zIndex = "1000";
	clone.style.top = `${itemRect.top + window.scrollY}px`; // Account for scrolling
	clone.style.left = `${itemRect.left + window.scrollX}px`;
	clone.style.width = `${itemRect.width}px`;
	clone.style.height = `${itemRect.height}px`;

	requestAnimationFrame(() => {
		const translateX =
			cartRect.left -
			itemRect.left +
			(cartButton.offsetWidth / 2 - itemRect.width / 2);
		const translateY =
			cartRect.top -
			itemRect.top +
			(cartButton.offsetHeight / 2 - itemRect.height / 2);

		clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.3)`;
		clone.style.transition =
			"transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s";

		// Fade out and clean up
		setTimeout(() => {
			clone.style.opacity = "0";
		}, 400);

		setTimeout(() => {
			document.body.removeChild(clone);
		}, 900);
	});
}
