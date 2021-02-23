'use strict';

var body = document.body;
var burger = document.querySelector('[data-menu-toggle]');
var mobMenu = document.querySelector('[data-mob-menu]');

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        body.style.opacity = '1';
    }, 200);
});

burger.addEventListener('click', function () {
    mobMenu.classList.toggle('open');

    burger.querySelectorAll('span').forEach(function (icon) {
        icon.classList.toggle('d-none');
    });
});