const page = page || {};

page.body = document.body;
page.header = document.querySelector('.header');
page.burger = document.querySelector('[data-menu-toggle]');
page.mobMenu = document.querySelector('[data-mob-menu]');

//Lazyload page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        page.body.style.opacity = '1';
    },200);
});

//Mob Nav Actions
page.burger.addEventListener('click', () => {
    page.mobMenu.classList.toggle('open');

    page.burger.querySelectorAll('span')
        .forEach((icon) => {
            icon.classList.toggle('d-none');
        });
});

//* Sections
//> Page Hero
const scrollBtn = document.querySelector('[data-scroll-down]');
if (scrollBtn !== null) {
    scrollBtn.addEventListener('click', (e) => {
        let scrollHeight = e.target.closest('section').offsetHeight;

        // Checking for additional offset created by header
        let announcementBar = page.header.querySelector('.header__bar');
        if (announcementBar) {
            scrollHeight += announcementBar.offsetHeight;
        }

        document.documentElement.scrollTop = scrollHeight; // For Chrome, Firefox, IE and Opera
        document.body.scrollTop = scrollHeight;  // For Safari
    });
};

//> Accordions
document.querySelectorAll('[data-accordion]')
    .forEach((accordion) => {
        accordion.addEventListener('click', () => {
            accordion.classList.toggle('active');
            let panel = accordion.nextElementSibling;
            panel.style.maxHeight
                ? panel.style.maxHeight = null
                : panel.style.maxHeight = panel.scrollHeight + "px"
        });
    }
);