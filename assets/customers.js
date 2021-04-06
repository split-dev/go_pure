'use strict';

(function () {
    var dropdownTrigger = document.querySelector('[data-dropdown-trigger-mobile]'),
        dropdown = document.querySelector('[data-dropdown-mobile]'),
        dropdownParent = dropdownTrigger.parentElement;

    dropdownTrigger.addEventListener('click', function (e) {
        if (window.innerWidth > 767) return;
        e.preventDefault();
        !dropdownParent.classList.contains('open') ? dropdown.style.height = dropdown.scrollHeight + 'px' : dropdown.style.removeProperty('height');

        dropdownParent.classList.toggle('open');
    });

    var tabBtn = document.querySelectorAll('[data-tab-trigger]');
    var tabs = document.querySelectorAll('[data-tab]');
    function resetTabs() {
        tabBtn.forEach(function (btn) {
            return btn.classList.remove('active');
        });
        tabs.forEach(function (tab) {
            tab.classList.add('d-none');
        });
    }
    tabBtn.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            if (window.innerWidth < 767 && btn.hasAttribute('data-dropdown-trigger-mobile')) return;

            resetTabs();
            var tabSelector = document.querySelector('[data-tab=' + btn.dataset.tabTrigger + ']');
            tabSelector.classList.remove('d-none');
            btn.classList.add('active');

            if (window.innerWidth > 767) return;
            dropdownTrigger.textContent = btn.textContent;
        });
    });
})();