const body = document.body;
const burger = document.querySelector('[data-menu-toggle]');
const mobMenu = document.querySelector('[data-mob-menu]');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        body.style.opacity = '1';
    },200);
});

burger.addEventListener('click', () => {
    mobMenu.classList.toggle('open');

    burger.querySelectorAll('span')
        .forEach((icon) => {
            icon.classList.toggle('d-none');
        });
});