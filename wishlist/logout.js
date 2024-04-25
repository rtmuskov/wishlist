// Проверяем готовность пользователя покинуть свой аккаунт
document.addEventListener('DOMContentLoaded', function() {

    // Выход из профиля
    document.getElementById('logoutButton').addEventListener('click', function() {
        chrome.storage.sync.remove('profile', function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
                document.getElementById('logoutMessage').textContent = 'Превышен лимит ожидания. Попробуйте позже, либо переустановите расширение.';
            }
	    else {
                document.getElementById('logoutMessage').textContent = 'Вы успешно покинули профиль!';
	    }
        });
        window.close();
    });

    document.getElementById('noLogoutButton').addEventListener('click', function() {
        document.getElementById('logoutMessage').textContent = 'Рады, что вы передумали!';
        window.close();
    });
});
