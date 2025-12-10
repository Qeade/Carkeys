// Функція для завантаження HTML файлу в елемент
function loadHTML(elementId, fileName) {
    fetch(fileName)
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        });
}

// Викликаємо функцію для хедера і футера
loadHTML('header-placeholder', 'components/header.html');
loadHTML('footer-placeholder', 'components/footer.html');