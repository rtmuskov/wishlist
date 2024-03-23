document.addEventListener('DOMContentLoaded', function() {
    var favProductCheckbox = document.getElementById('favProduct');
    var oneTimeProductCheckbox = document.getElementById('oneTimeProduct');
    var ignoreProductCheckbox = document.getElementById('ignoreProduct');

    // Загрузка текущих настроек из хранилища и установка значений чекбоксов
    chrome.storage.sync.get(['favProduct', 'oneTimeProduct', 'ignoreProduct'], function(result) {
        favProductCheckbox.checked = result.favProduct || false;
        oneTimeProductCheckbox.checked = result.oneTimeProduct || false;
        ignoreProductCheckbox.checked = result.ignoreProduct || false;
    });

    // Сохранение измененных настроек
    document.getElementById('saveButton').addEventListener('click', function() {
        chrome.storage.sync.set({
            favProduct: favProductCheckbox.checked,
            oneTimeProduct: oneTimeProductCheckbox.checked,
            ignoreProduct: ignoreProductCheckbox.checked
        }, function() {
            alert('Settings saved!');
        });
    });
});
