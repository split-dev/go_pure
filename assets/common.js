'use strict';

var page = page || {};

page.body = document.body;
page.header = document.querySelector('.header');
page.burger = document.querySelector('[data-menu-toggle]');
page.mobMenu = document.querySelector('[data-mob-menu]');
page.cartToggle = document.querySelector('[data-cart-popup-toggle]');
page.cartClose = document.querySelector('[data-cart-popup-close]');
page.cartWrapper = document.querySelector('[data-cart-popup-wrapper]');

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

// Slide Cart
page.cartToggle.addEventListener('click', function (e) {
    e.preventDefault();
    page.cartWrapper.classList.toggle('cart-popup-wrapper--hidden');
});
page.cartClose.addEventListener('click', function (e) {
    e.preventDefault();
    page.cartWrapper.classList.add('cart-popup-wrapper--hidden');
});

//* Sections
//> Page Hero
var scrollBtn = document.querySelector('[data-scroll-down]');
if (scrollBtn !== null) {
    scrollBtn.addEventListener('click', function (e) {
        var scrollHeight = e.target.closest('section').offsetHeight;

        // Checking for additional offset created by header
        var announcementBar = page.header.querySelector('.header__bar');
        if (announcementBar) {
            scrollHeight += announcementBar.offsetHeight;
        }

        document.documentElement.scrollTop = scrollHeight; // For Chrome, Firefox, IE and Opera
        document.body.scrollTop = scrollHeight; // For Safari
    });
};

//> Accordions
document.querySelectorAll('[data-accordion]').forEach(function (accordion) {
    accordion.addEventListener('click', function () {
        accordion.classList.toggle('active');
        var panel = accordion.nextElementSibling;
        panel.style.maxHeight ? panel.style.maxHeight = null : panel.style.maxHeight = panel.scrollHeight + "px";
    });
});

//> Product Template - Read More
(function () {
    var readMoreBtn = document.querySelector('[data-read-more]');
    if (readMoreBtn === null) return;

    var readMoreParent = readMoreBtn.parentElement;
    readMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        readMoreParent.classList.toggle('open');
        readMoreBtn.classList.add('d-none');
    });
})();

//> Product Template - Variants
(function () {
    var variantInputs = document.querySelectorAll('[data-variant-change]');
    var grantSelect = document.querySelector('#SingleOptionSelector-0');
    if (variantInputs === null) return;

    variantInputs.forEach(function (input) {
        input.addEventListener('change', function () {
            grantSelect.value = input.value;
            grantSelect.dispatchEvent(new CustomEvent('change'));
        });
    });
})();