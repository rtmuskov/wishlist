document.addEventListener('DOMContentLoaded', function() {
    displaySavedURLs();

    // Добавляем обработчик клика на кнопку "Очистить корзину"
    document.getElementById('clearButton').addEventListener('click', function() {
        clearCart();
    });
});

function displaySavedURLs() {
    chrome.storage.sync.get(['favorites', 'oneTime', 'ignore'], function(result) {
        displayURLs('favorites', result.favorites);
        displayURLs('oneTime', result.oneTime);
        displayURLs('ignore', result.ignore);
    });
}

function displayURLs(category, urls) {
    let list = document.getElementById(category + 'List');
    list.innerHTML = ''; // Очищаем список перед добавлением URL

    urls.forEach(function(url) {
        let listItem = document.createElement('li');
        let link = document.createElement('a');
        link.href = url;
        link.textContent = url;
        link.target = "_blank"; // Открывать ссылку в новой вкладке
        listItem.appendChild(link);
        list.appendChild(listItem);
    });
}


// Функция для очистки корзины
function clearCart() {
    chrome.storage.sync.clear(function() {
        // Очищаем списки после удаления данных из хранилища
        document.getElementById('favoritesList').innerHTML = '';
        document.getElementById('oneTimeList').innerHTML = '';
        document.getElementById('ignoreList').innerHTML = '';
        console.log('Корзина очищена');
    });
}
