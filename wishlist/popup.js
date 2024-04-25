// Объект для хранения выбранных товаров в категориях
let selectedProducts = {
    favorites: [],
    oneTime: [],
    ignore: []
};

document.addEventListener('DOMContentLoaded', function() {
    // Обработчик события клика на кнопку "Добавить в избранное"
    document.getElementById('favoriteButton').addEventListener('click', function() {
        addToCategory('favorites'); // Функция для добавления URL в категорию "Избранное"
    });

    // Обработчик события клика на кнопку "Добавить один раз"
    document.getElementById('oneTimeButton').addEventListener('click', function() {
        addToCategory('oneTime'); // Функция для добавления URL в категорию "Один раз"
    });

    // Обработчик события клика на кнопку "Игнорировать"
    document.getElementById('ignoreButton').addEventListener('click', function() {
        addToCategory('ignore'); // Функция для добавления URL в категорию "Игнорировать"
    });

    // Обработчик изменения настроек
    document.getElementById('preference').addEventListener('change', function() {
        savePreference(this.value);
    });

    // Проверяем наличие профиля пользователя при загрузке страницы
    chrome.storage.sync.get('profile', function(result) {
        // Если профиль пользователя найден
        if (result.profile) {
            let profile = result.profile;
            console.log('Данные о профиле пользователя:', profile);

            // Скрываем кнопку "Войти / Зарегистрироваться" и надпись "Профиль"
             document.getElementById('profileButton').style.display = 'none';

            // Отображаем данные профиля под надписью "Профиль"
            let profileInfoContainer = document.getElementById('profileInfo');

            let usernameParagraph = document.createElement('p');
            usernameParagraph.textContent = 'Имя пользователя: ' + profile.username;
            profileInfoContainer.appendChild(usernameParagraph);

            let emailParagraph = document.createElement('p');
            emailParagraph.textContent = 'Email: ' + profile.email;
            profileInfoContainer.appendChild(emailParagraph);
        }

        // Если профиль пользователя не найден
        else {
             document.getElementById('mainLogoutButton').style.display = 'none';
             document.getElementById('favoriteButton').style.display = 'none';
             document.getElementById('oneTimeButton').style.display = 'none';
             document.getElementById('ignoreButton').style.display = 'none';
	}
    });



    // Обработчик для кнопки "Профиль"
    document.getElementById('profileButton').addEventListener('click', function() {
        openRegistrationWindow();
    });

    // Обработчик для кнопки "Выйти из профиля"
    document.getElementById('mainLogoutButton').addEventListener('click', function() {
        openLogoutWindow();
    });

    // Обработчик для кнопки "Корзина" в основном окне
    document.getElementById('cartPopupButton').addEventListener('click', function() {
        openCartPopup(); // Функция для открытия окна корзины
    });


     // Получаем данные о профиле пользователя из локального хранилища
     chrome.storage.sync.get('profile', function(result) {
        if (result.profile) {
            // Если профиль пользователя найден, отображаем кнопку "Корзина"
            document.getElementById('cartPopupButton').style.display = 'block';
        } else {
            // Если профиль пользователя не найден, скрываем кнопку "Корзина"
            document.getElementById('cartPopupButton').style.display = 'none';
        }
    });
});

// Функция открытия окна регистрации
function openRegistrationWindow() {
    let registrationUrl = chrome.runtime.getURL('registration.html');
    window.open(registrationUrl, '_blank', 'width=400,height=400');
}

// Функция открытия окна выхода из профиля
function openLogoutWindow() {
    let logoutUrl = chrome.runtime.getURL('logout.html');
    window.open(logoutUrl, '_blank', 'width=400,height=400');
}

// Функция для добавления текущего URL в указанную категорию
function addToCategory(category) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let url = tabs[0].url; // Получаем URL текущей вкладки
        saveURL(category, url); // Сохраняем URL в указанную категорию
    });
}

// Функция для сохранения URL в указанной категории в хранилище
function saveURL(category, url) {
    chrome.storage.sync.get(category, function(result) {
        let urls = result[category] || []; // Получаем массив URL для указанной категории

        // Добавляем новый URL в массив
        urls.push(url);

        // Сохраняем обновленный массив URL в хранилище
        chrome.storage.sync.set({ [category]: urls }, function() {
            console.log('URL добавлен в категорию', category);
        });
    });
}
// Функция сохранения предпочтения пользователя
function savePreference(preference) {
    // Сохраняем предпочтение пользователя в локальном хранилище
    chrome.storage.local.set({ preference: preference }, function() {
        console.log('Сохранено предпочтение: ' + preference);
    });

}

// Функция для открытия окна корзины
function openCartPopup() {
    // Открываем новое окно с файлом корзины
    chrome.windows.create({
        url: 'cart.html',
        type: 'popup',
        width: 400, // Ширина окна корзины
        height: 400 // Высота окна корзины
    });
}