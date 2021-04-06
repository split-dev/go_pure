(function () {
    let dropdownTrigger = document.querySelector('[data-dropdown-trigger-mobile]'),
        dropdown = document.querySelector('[data-dropdown-mobile]'),
        dropdownParent = dropdownTrigger.parentElement;

    dropdownTrigger.addEventListener('click', (e) => {
        if (window.innerWidth > 767) return;
        e.preventDefault();
        !dropdownParent.classList.contains('open')
            ? dropdown.style.height = dropdown.scrollHeight + 'px'
            : dropdown.style.removeProperty('height');

        dropdownParent.classList.toggle('open');
    });

    let tabBtn = document.querySelectorAll('[data-tab-trigger]');
    let tabs = document.querySelectorAll('[data-tab]');
    function resetTabs() {
        tabBtn.forEach((btn) => btn.classList.remove('active'));
        tabs.forEach((tab) => {tab.classList.add('d-none')});
    }
    tabBtn.forEach((btn) => {
       btn.addEventListener('click', (e) => {
           e.preventDefault();

           if (window.innerWidth < 767 && btn.hasAttribute('data-dropdown-trigger-mobile'))
               return;

           resetTabs();
           let tabSelector = document.querySelector(`[data-tab=${btn.dataset.tabTrigger}]`);
           tabSelector.classList.remove('d-none');
           btn.classList.add('active');

           if (window.innerWidth > 767) return;
           dropdownTrigger.textContent = btn.textContent;
       })
    });
}());