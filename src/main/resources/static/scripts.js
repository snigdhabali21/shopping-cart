document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const productList = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsSpan = document.getElementById('total-items');
    const subtotalSpan = document.getElementById('subtotal');
    const taxSpan = document.getElementById('tax');
    const grandTotalSpan = document.getElementById('grand-total');
    const checkoutButton = document.getElementById('checkout-button');
    const billingForm = document.getElementById('billing-form');

    let cart = []; // This array will hold your shopping cart items

    // --- Persistence (Saving/Loading Cart) ---
    // Saves the current cart to the browser's localStorage
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        console.log('Cart saved:', cart); // For debugging
    }

    // Loads the cart from the browser's localStorage when the page loads
    function loadCart() {
        const storedCart = localStorage.getItem('shoppingCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            console.log('Cart loaded:', cart); // For debugging
        }
    }

    // --- Rendering and Updating Cart UI ---
    // Updates the visual display of items in the shopping cart
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Clear existing items to redraw the cart

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                // Display item name, quantity, price per item, and total for that item
                cartItemDiv.innerHTML = `
                    <span>${item.name} (${item.quantity} x $${item.price.toFixed(2)})</span>
                    <span>$${(item.quantity * item.price).toFixed(2)}</span>
                    <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        updateCartSummary(); // Always update the totals after rendering the items
        saveCart(); // Save the cart to localStorage after any changes
    }

    // Calculates and displays the total number of items, subtotal, tax, and grand total
    function updateCartSummary() {
        let totalItems = 0;
        let subtotal = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            subtotal += item.quantity * item.price;
        });

        const taxRate = 0.10; // 10% tax
        const tax = subtotal * taxRate;
        const grandTotal = subtotal + tax;

        totalItemsSpan.textContent = totalItems;
        subtotalSpan.textContent = subtotal.toFixed(2);
        taxSpan.textContent = tax.toFixed(2);
        grandTotalSpan.textContent = grandTotal.toFixed(2);
    }

    // --- Event Listeners for Adding/Removing Items ---

    // Listener for clicks on "Add to Cart" buttons
    productList.addEventListener('click', (event) => {
        // Check if the clicked element is a button AND has the 'add-to-cart-btn' class
        // AND has a 'data-id' attribute
        if (event.target.tagName === 'BUTTON' && event.target.classList.contains('add-to-cart-btn') && event.target.dataset.id) {
            const productId = parseInt(event.target.dataset.id);
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            console.log(`Attempting to add: ID=${productId}, Name=${productName}, Price=${productPrice}`); // Debugging

            // Find if the product already exists in the cart
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                // If found, just increase its quantity
                existingItem.quantity++;
                console.log(`Incremented quantity for ${productName}. New quantity: ${existingItem.quantity}`); // Debugging
            } else {
                // If not found, add a new item object to the cart array
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1 // Start with quantity 1 for new items
                });
                console.log(`Added new item: ${productName}`); // Debugging
            }
            renderCart(); // Update the cart display in the browser
        }
    });

    // Listener for clicks on "Remove" buttons within the cart
    cartItemsContainer.addEventListener('click', (event) => {
        // Check if the clicked element is a button AND has the 'remove-from-cart-btn' class
        // AND has a 'data-id' attribute
        if (event.target.tagName === 'BUTTON' && event.target.classList.contains('remove-from-cart-btn')) {
            const productIdToRemove = parseInt(event.target.dataset.id);

            // Find the index of the item to remove in the cart array
            const itemIndex = cart.findIndex(item => item.id === productIdToRemove);

            if (itemIndex > -1) { // If the item is found (index is not -1)
                cart[itemIndex].quantity--; // Decrease its quantity
                console.log(`Decremented quantity for ID ${productIdToRemove}. New quantity: ${cart[itemIndex].quantity}`); // Debugging
                if (cart[itemIndex].quantity <= 0) {
                    // If quantity drops to 0 or less, remove the item entirely from the array
                    cart.splice(itemIndex, 1);
                    console.log(`Removed item ID ${productIdToRemove} from cart.`); // Debugging
                }
            }
            renderCart(); // Update the cart display in the browser
        }
    });

    // --- Checkout and Billing Form Handling ---

    // Listener for the "Proceed to Checkout" button
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add some items before checking out.');
        } else {
            alert('Proceeding to checkout! Please fill out the billing information.');
            // Smoothly scroll the user to the billing section
            document.querySelector('.billing-section').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Listener for the billing form submission
    billingForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission (which reloads the page)

        if (cart.length === 0) {
            alert('Your cart is empty. Cannot complete purchase.');
            return;
        }

        // Collect billing details (Name, Phone No., Address)
        const formData = new FormData(billingForm);
        const billingDetails = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address')
        };

        console.log('Billing Details:', billingDetails); // For debugging
        console.log('Items to purchase:', cart); // For debugging

        alert('Thank you for your purchase! Your order has been placed.');

        // Simulate clearing the cart and resetting the form after a successful "purchase"
        cart = []; // Empty the cart
        renderCart(); // Update the cart display (will show "Your cart is empty.")
        billingForm.reset(); // Clear the form fields
    });

    // --- Initial Setup on Page Load ---
    // These functions run once when the page first loads
    loadCart();    // Try to load any cart items saved from a previous session
    renderCart();  // Display the cart (either loaded or empty)
});