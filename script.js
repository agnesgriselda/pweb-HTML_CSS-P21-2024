// Product data for Donat, Roti, Dessert, and Minuman categories
const productData = [
    {
        id: 1,
        category: 'donat',
        name: 'Classic Dips',
        price: 2.50,
        image: 'assets/img/classic-donut.jpg',
    },
    {
        id: 2,
        category: 'donat',
        name: 'Velvet Dream',
        price: 3.00,
        image: 'assets/img/redvelvet-donut.jpeg',
    },
    {
        id: 3,
        category: 'donat',
        name: 'Matcha Bliss',
        price: 3.50,
        image: 'assets/img/matcha-donut.jpeg',
    },
    {
        id: 4,
        category: 'roti',
        name: 'Almond Bread',
        price: 4.00,
        image: 'assets/img/almond-bread.jpg',
    },
    {
        id: 5,
        category: 'roti',
        name: 'Honey Loaf',
        price: 3.50,
        image: 'assets/img/honey-loaf.jpg',
    },
    {
        id: 6,
        category: 'roti',
        name: 'Cinnamon Roll',
        price: 4.50,
        image: 'assets/img/cinnamon-roll.jpg',
    },
    {
        id: 7,
        category: 'dessert',
        name: 'Chocolate Cake',
        price: 5.00,
        image: 'assets/img/chocolate-cake.jpg',
    },
    {
        id: 8,
        category: 'dessert',
        name: 'Cheesecake Delight',
        price: 4.75,
        image: 'assets/img/cheesecake.jpg',
    },
    {
        id: 9,
        category: 'dessert',
        name: 'Fruit Tart',
        price: 6.00,
        image: 'assets/img/fruit-tart.jpg',
    },
    {
        id: 10,
        category: 'minuman',
        name: 'Cold Brew Coffee',
        price: 3.25,
        image: 'assets/img/coldbrew.jpg',
    },
    {
        id: 11,
        category: 'minuman',
        name: 'Vanilla Milkshake',
        price: 3.50,
        image: 'assets/img/milkshake.jpg',
    },
    {
        id: 12,
        category: 'minuman',
        name: 'Iced Tea',
        price: 2.75,
        image: 'assets/img/iced-tea.jpg',
    }
];

// Initialize categories and products
function init() {
    const categories = [...new Set(productData.map(product => product.category))];
    loadProducts(productData);
}

// Load products into the page based on category
function loadProducts(products, category = 'all') {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        `;
        productsContainer.appendChild(productItem);
    });
}

// Filter products by category
document.getElementById('categories').addEventListener('change', function() {
    const selectedCategory = this.value;
    loadProducts(productData, selectedCategory);
});

// Add product to cart
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex === -1) {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    } else {
        cart[productIndex].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header and add bounce animation to cart icon
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');

    cartCount.textContent = totalCount;

    // Add a small bounce effect to the cart icon when the cart is updated
    cartIcon.classList.add('bounce');
    setTimeout(() => {
        cartIcon.classList.remove('bounce');
    }, 300);
}

// Initial load
init();
updateCartCount();
