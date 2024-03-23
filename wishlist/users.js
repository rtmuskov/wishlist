// Пользователи приложения
let users = {};

// Функция для добавления нового пользователя
function addUser(username, email, password) {
    users[username] = {
        username: username,
        email: email,
        password: password
    };
}

// Функция для получения пользователя по имени пользователя
function getUserByUsername(username) {
    return users[username];
}

// Функция для проверки существования пользователя по имени пользователя
function userExists(username) {
    return users.hasOwnProperty(username);
}
