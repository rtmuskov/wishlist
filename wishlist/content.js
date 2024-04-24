// Контентный скрипт для добавления иконок корзины рядом с товарами
document.addEventListener('DOMContentLoaded', function() {
    // Функция для добавления иконки корзины к каждому товару
    function addCartIconsToProducts() {
        let products = document.querySelectorAll('.product, .item'); // Общие классы для элементов товаров
        products.forEach(product => {
            let cartIcon = document.createElement('img');
            cartIcon.src = chrome.runtime.getURL('/images/fg.png'); // Путь к вашей иконке корзины
            cartIcon.alt = 'Add to Cart';
            cartIcon.classList.add('cart-icon');
            cartIcon.addEventListener('click', function() {
                addToCart(product); // Функция добавления товара в корзину
            });
            product.appendChild(cartIcon);
        });
    }

    // Функция добавления товара в корзину
    function addToCart(product) {
        // Ваш код для добавления товара в корзину
        // Например, имитация нажатия кнопки "Добавить в корзину" или вызов API
        // Это зависит от функционала вашего сайта
    }

    // Вызов функции при загрузке страницы
    addCartIconsToProducts();
});
