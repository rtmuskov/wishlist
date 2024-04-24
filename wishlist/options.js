document.addEventListener('DOMContentLoaded', function() {
    // Обработчик события для кнопки "Добавить в избранное"
    document.getElementById('favProduct').addEventListener('click', function() {
        addToCartWithUrl();
    });

    // Обработчик события для кнопки "Добавить один раз"
    document.getElementById('oneTimeProduct').addEventListener('click', function() {
        addToCartWithUrl();
    });

    // Обработчик события для кнопки "Игнорировать"
    document.getElementById('ignoreProduct').addEventListener('click', function() {
        addToCartWithUrl();
    });

    // Функция для добавления текущего URL в корзину расширения
    function addToCartWithUrl() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let url = tabs[0].url; // Получаем URL текущей вкладки
            console.log('URL текущей страницы:', url);

            // Сохраняем URL в локальном хранилище
            chrome.storage.local.set({ cartUrl: url }, function() {
                console.log('URL добавлен в корзину:', url);
            });
        });
    }
});
