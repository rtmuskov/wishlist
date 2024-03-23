// Функция для обработки отправки формы
function handleSubmit(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей формы
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Если все поля формы заполнены
    if (username && email && password) {
        // Создаем объект профиля
        let profile = {
            username: username,
            email: email,
            password: password
        };

        // Сохраняем профиль в локальное хранилище
        chrome.storage.local.set({ profile: profile }, function() {
            console.log('Профиль сохранен:', profile);
            document.getElementById('registrationMessage').textContent = 'Профиль успешно сохранен!';
            
            // Закрываем всплывающее окно
            window.close();
        });
    } else {
        // Если какое-то из полей пустое, выводим сообщение об ошибке
        document.getElementById('registrationMessage').textContent = 'Пожалуйста, заполните все поля формы!';
    }
}

// Проверяем наличие профиля пользователя при загрузке страницы
chrome.storage.local.get('profile', function(result) {
    // Если профиль пользователя найден
    if (result.profile) {
        let profile = result.profile;
        console.log('Данные о профиле пользователя:', profile);

        // Скрываем кнопку регистрации
        document.getElementById('registrationButton').style.display = 'none';

        // Отображаем данные профиля
        document.getElementById('username').textContent = profile.username;
        document.getElementById('email').textContent = profile.email;
        // Остальные данные профиля можно также отобразить

        // Далее вы можете выполнить любые другие действия, связанные с отображением данных профиля
    }
});

// Добавляем обработчик отправки формы при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    // Находим форму регистрации и добавляем обработчик события submit
    let form = document.getElementById('registrationForm');
    form.addEventListener('submit', handleSubmit);
});
