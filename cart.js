// Load the cart
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>
                Quantity: 
                <button onclick="decreaseQuantity(${item.id})">-</button>
                ${item.quantity}
                <button onclick="increaseQuantity(${item.id})">+</button>
            </p>
            <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Increase item quantity
function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Decrease item quantity
function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1 && cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Show confirmation modal before checkout
function checkout() {
    const modal = document.querySelector('.modal');
    modal.classList.add('show'); // Show the modal with fade-in effect
}

// Confirm checkout and close modal with animation
function confirmCheckout() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('show'); // Remove the modal
    setTimeout(() => {
        localStorage.removeItem('cart');
        loadCart();
        updateCartCount();
        alert('Checkout complete!');
    }, 300); // Slight delay for the animation
}

// Cancel checkout and close modal with animation
function cancelCheckout() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('show'); // Hide the modal with fade-out effect
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalCount;
}

// Event listeners for modal actions
document.getElementById('confirm-checkout').addEventListener('click', confirmCheckout);
document.getElementById('cancel-checkout').addEventListener('click', cancelCheckout);

// Load cart on page load
loadCart();
updateCartCount();
