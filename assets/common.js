'use strict';

var page = page || {};

page.body = document.body;
page.header = document.querySelector('.header');
page.burger = document.querySelector('[data-menu-toggle]');
page.mobMenu = document.querySelector('[data-mob-menu]');

//Lazyload page
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        page.body.style.opacity = '1';
    }, 200);
});

//Mob Nav Actions
page.burger.addEventListener('click', function () {
    page.mobMenu.classList.toggle('open');

    page.burger.querySelectorAll('span').forEach(function (icon) {
        icon.classList.toggle('d-none');
    });
});

//* Sections
//> Page Hero
document.querySelector('[data-scroll-down]').addEventListener('click', function (e) {
    var scrollHeight = e.target.closest('section').offsetHeight;

    // Checking for additional offset created by header
    var announcementBar = page.header.querySelector('.header__bar');
    if (announcementBar) {
        scrollHeight += announcementBar.offsetHeight;
    }

    document.documentElement.scrollTop = scrollHeight; // For Chrome, Firefox, IE and Opera
    document.body.scrollTop = scrollHeight; // For Safari
});

//> Accordions
document.querySelectorAll('[data-accordion]').forEach(function (accordion) {
    accordion.addEventListener('click', function () {
        accordion.classList.toggle('active');
        var panel = accordion.nextElementSibling;
        panel.style.maxHeight ? panel.style.maxHeight = null : panel.style.maxHeight = panel.scrollHeight + "px";
    });
});