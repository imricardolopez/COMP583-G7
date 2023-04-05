document.addEventListener('DOMContentLoaded', () => {
    const footerElement = document.querySelector('footer');

    if (footerElement) {
        fetch('footer.html')
            .then(response => response.text())
            .then(html => {
                footerElement.innerHTML = html;
            });
    }
});