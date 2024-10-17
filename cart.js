let cart = [];

// Функция загрузки корзины из localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Функция сохранения корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция обновления отображения корзины
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    // Очищаем список товаров
    if (cartItems) cartItems.innerHTML = '';
    let total = 0;

    // Проходим по товарам в корзине и отображаем их
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        // Отображение товара с изображением, названием и ценой
        li.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <strong>${item.name} - ${item.size}</strong>
                </div>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-price">${item.price} $</span>
                <select class="quantity-select" data-index="${index}">
                    ${[...Array(10).keys()].map(i => `<option value="${i + 1}" ${item.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                </select>
                <button class="remove-item" data-index="${index}">
                    <img src="close-icon.png" alt="Remove" class="remove-icon">
                </button>
            </div>
        `;
        if (cartItems) cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    if (cartTotal) cartTotal.textContent = total;
    if (cartCount) cartCount.textContent = cart.length; // Обновляем счётчик товаров

    // Сохраняем корзину в localStorage после обновления
    saveCart();
}

// Обработчик удаления товара
document.addEventListener('click', function(event) {
    if (event.target.closest('.remove-item')) {
        const index = event.target.closest('.remove-item').getAttribute('data-index');
        cart.splice(index, 1); // Удаляем товар из корзины по индексу
        updateCartDisplay(); // Обновляем отображение корзины
    }
});



// Обновляем счётчик товаров при загрузке страницы
function updateCartCountOnPageLoad() {
    const cartCount = document.getElementById('cart-count');
    loadCart();
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Загружаем корзину при загрузке страницы
    loadCart();
    updateCartDisplay();
    updateCartCountOnPageLoad(); // Обновляем счётчик при загрузке страницы

    // Обработчик изменения количества товара
    document.getElementById('cart-items')?.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity-select')) {
            const index = event.target.getAttribute('data-index');
            const newQuantity = parseInt(event.target.value);
            cart[index].quantity = newQuantity;
            updateCartDisplay();
        }
    });

    // Обработчик удаления товара
    document.getElementById('cart-items')?.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });

    // Обработчик очистки корзины
    document.getElementById('clear-cart')?.addEventListener('click', function() {
        cart = [];
        updateCartDisplay();
    });
});
