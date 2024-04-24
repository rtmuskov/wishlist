document.addEventListener('DOMContentLoaded', function() {
    displaySavedURLs();
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

    // Проверяем, существует ли массив urls
    if (urls && urls.length > 0) {
        urls.forEach(function(url) {
            let listItem = document.createElement('li');
            let link = document.createElement('a');
            link.href = url;
            link.textContent = url;
            link.target = "_blank"; // Открывать ссылку в новой вкладке
            
            let deleteIcon = document.createElement('img');
            deleteIcon.src = "/images/del.png"; // Путь к изображению корзины
            deleteIcon.alt = "Delete";
            deleteIcon.classList.add('delete-icon');
            deleteIcon.addEventListener('click', function() {
                deleteURL(category, url);
            });

            listItem.appendChild(link);
            listItem.appendChild(deleteIcon);
            list.appendChild(listItem);
        });
    }
}


function deleteURL(category, url) {
    chrome.storage.sync.get(category, function(result) {
        let updatedURLs = result[category].filter(function(item) {
            return item !== url;
        });
        chrome.storage.sync.set({ [category]: updatedURLs }, function() {
            console.log('URL удален из категории', category);
            displaySavedURLs();
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displaySavedURLs();

    // Обработчик для кнопки "Очистить корзину"
    document.getElementById('clearCartButton').addEventListener('click', function() {
        clearCart();
    });
});

function clearCart() {
    chrome.storage.sync.clear(function() {
        console.log('Корзина очищена');
        displaySavedURLs();
    });
}
