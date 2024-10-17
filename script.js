let cart = [];

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.size} - ${item.price} ₽
        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
        <button class="remove-item" data-index="${index}">Remove</button>`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseInt(product.getAttribute('data-price'));
            const productSize = product.querySelector('.size').value;

            const cartItem = {
                name: productName,
                price: productPrice,
                size: productSize,
                quantity: 1
            };

            cart.push(cartItem);
            updateCartDisplay();
        });
    });

    cartItems.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartDisplay();
        }

        if (event.target.classList.contains('quantity-input')) {
            const index = event.target.getAttribute('data-index');
            const newQuantity = event.target.value;
            cart[index].quantity = parseInt(newQuantity);
            updateCartDisplay();
        }
    });
});
