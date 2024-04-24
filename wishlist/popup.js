// Объект для хранения выбранных товаров в категориях
let selectedProducts = {
    favorites: [],
    oneTime: [],
    ignore: []
};

document.addEventListener('DOMContentLoaded', function() {
    // Обработчики событий для кнопок категорий и прочих элементов интерфейса
    document.getElementById('favoriteButton').addEventListener('click', function() {
        addToCategory('favorites');
    });

    document.getElementById('oneTimeButton').addEventListener('click', function() {
        addToCategory('oneTime');
    });

    document.getElementById('ignoreButton').addEventListener('click', function() {
        addToCategory('ignore');
    });

    // Обработчик изменения настроек
    document.getElementById('preference').addEventListener('change', function() {
        savePreference(this.value);
    });

    // Проверяем наличие профиля пользователя при загрузке страницы
    chrome.storage.local.get('profile', function(result) {
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

// Функция добавления товара в выбранную категорию
function addToCategory(category) {
    // Предположим, что товар представлен объектом, содержащим информацию о товаре
    let product = {
        name: "Название товара",
        price: 100 // цена товара
        // Другие свойства товара
    };

    // Добавляем товар в выбранную категорию
    selectedProducts[category].push(product);

    // Выводим всплывающее окно с сообщением
    switch (category) {
        case 'favorites':
            alert('Товар успешно добавлен в Избранное!');
            break;
        case 'oneTime':
            alert('Товар успешно добавлен в Купить один раз!');
            break;
        case 'ignore':
            alert('Товар успешно добавлен в Игнорировать!');
            break;
        default:
            break;
    }

    // Обновим сообщение в консоли
    console.log('Товар добавлен в категорию ' + category + ':', product);
}

// Функция сохранения предпочтения пользователя
function savePreference(preference) {
    // Сохраняем предпочтение пользователя в локальном хранилище
    chrome.storage.local.set({ preference: preference }, function() {
        console.log('Сохранено предпочтение: ' + preference);
    });
}
