// Функция для получения URL товара на странице
function getProductURL() {
    let url;
    // Проверяем, находится ли пользователь на площадке Ozon
    if (window.location.hostname.includes("ozon.ru")) {
        let productLink = document.querySelector('a[href*="/product/"]');
        if (productLink) {
            url = productLink.href;
        }
    }
    // Проверяем, находится ли пользователь на площадке Wildberries
    else if (window.location.hostname.includes("wildberries.ru")) {
        let productLink = document.querySelector('.j-open-full-product-card');
        if (productLink) {
            url = productLink.href;
        }
    }
    return url;
}

// Функция для добавления иконки к товарам на странице
function addProductIcon() {
    let productElement;
    // Проверяем, находится ли пользователь на площадке Ozon
    if (window.location.hostname.includes("ozon.ru")) {
        productElement = document.querySelector('.ao2g0b-0');
    }
    // Проверяем, находится ли пользователь на площадке Wildberries
    else if (window.location.hostname.includes("wildberries.ru")) {
        productElement = document.querySelector('.dtList.i-dtList.j-card-item');
    }
    if (productElement) {
        let productIcon = document.createElement('div');
        productIcon.innerHTML = '<img src="/images/fg.png" alt="Product Icon">';
        productIcon.classList.add('product-icon');
        productElement.appendChild(productIcon);
        productIcon.addEventListener('click', function() {
            let url = getProductURL();
            if (url) {
                chrome.runtime.sendMessage({ action: 'addToCart', url: url }, function(response) {
                    if (response && response.success) {
                        console.log('URL добавлен в корзину:', url);
                    } else {
                        console.error('Не удалось добавить URL в корзину:', url);
                    }
                });
            } else {
                console.error('URL товара не найден на странице.');
            }
        });
    }
}

// Вызываем функцию добавления иконки при загрузке страницы
document.addEventListener('DOMContentLoaded', addProductIcon);
