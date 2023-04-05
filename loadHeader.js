document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('header');

    if (headerElement) {
        fetch('header.html')
            .then(response => response.text())
            .then(html => {
                headerElement.innerHTML = html;
            });
    }
});