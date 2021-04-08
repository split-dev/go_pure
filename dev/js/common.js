const page = page || {};

page.body = document.body;
page.header = document.querySelector('.header');
page.burger = document.querySelector('[data-menu-toggle]');
page.mobMenu = document.querySelector('[data-mob-menu]');
page.cartToggle = document.querySelector('[data-cart-popup-toggle]');
page.cartClose = document.querySelector('[data-cart-popup-close]');
page.cartWrapper = document.querySelector('[data-cart-popup-wrapper]');

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

// Slide Cart
(function () {
    let cartSubtotal = document.querySelector('[data-cart-subtotal]');
    let cartEmpty = document.querySelector('[data-cart-empty]');

    page.cartToggle.addEventListener('click', (e) => {
        e.preventDefault();
        page.cartWrapper.classList.toggle('cart-popup-wrapper--hidden');
    });
    page.cartClose.addEventListener('click', (e) => {
        e.preventDefault();
        page.cartWrapper.classList.add('cart-popup-wrapper--hidden');
    });
    if (window.location.href.includes('#open-cart'))
        page.cartWrapper.classList.toggle('cart-popup-wrapper--hidden');

    function initQtyBtns() {
        let qtyBtns = document.querySelectorAll('[data-qty]');

        if (qtyBtns === null) return;

        qtyBtns.forEach(btn => {
           btn.addEventListener('click', () => {
               let inputQty = btn.parentElement.querySelector('input');

               if (btn.dataset.qty === '-') {
                   if (inputQty.value === inputQty.getAttribute('min')) return;
                   inputQty.value -= 1;
               } else if (btn.dataset.qty === '+') {
                   inputQty.value = parseInt(inputQty.value) + 1;
               }

               let lineItemIndex = btn.closest('[data-cart-item-index]').dataset.cartItemIndex;
               updateCart(lineItemIndex, inputQty.value);
           })
        });
    }
    window.initQtyBtns = initQtyBtns;

    function updateCart(lineString, qty = 0) {
        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify({
                line: lineString,
                quantity: qty,
            })
        }).then((response) => {
            return response.json();
        }).then(state => {
            reRenderCart(state);
        });
    }

    function removeItem(btn) {
        let parent = btn.closest('[data-cart-item]');
        parent.classList.add('cart-popup-item__remove-anim');

        setTimeout(() => {
            parent.remove();
        }, 800);
    }

    function BoldCartFix(cart) {
        return BOLD.common.cartDoctor.fix(cart);
    }
    window.BoldCartFix = BoldCartFix;

    function formatMoney(money) {
        return window.BOLD.common.Shopify.formatMoney(money)
    }
    window.formatMoney = formatMoney;

    function reRenderCart(state) {
        let state_old = state;
        let cartItems = document.querySelectorAll('[data-cart-item]');

        state = window.BoldCartFix(state);
        cartSubtotal.textContent = window.BOLD.common.Shopify.formatMoney(state.items_subtotal_price);
        BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded', state);

        cartItems.forEach((item, index) => {
            let priceWithoutSubscription = item.querySelector('[data-without-subscription]');
            priceWithoutSubscription.textContent = window.formatMoney(state_old.items[index].final_line_price);
        });

        state.item_count === 0
           ? cartEmpty.classList.remove('d-none')
           : cartEmpty.classList.add('d-none');
    }

    function initRemoveLineItemBtns() {
        let btns = document.querySelectorAll('[data-cart-remove]');

        if (btns === null) return;

        btns.forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();

                let lineString = btn.getAttribute('href');
                lineString = lineString.split('?')[1];
                lineString = lineString.split('&')[0];
                lineString = parseInt(lineString.replace('line=', ''));

                updateCart(lineString);

                removeItem(btn);
            })
        });
    }
    window.initRemoveLine = initRemoveLineItemBtns;
    initQtyBtns();
    initRemoveLineItemBtns();
}());

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

//> Product Template - Read More
(function () {
    let readMoreBtn = document.querySelector('[data-read-more]');
    if (readMoreBtn === null) return;

    let readMoreParent = readMoreBtn.parentElement;
    readMoreBtn.addEventListener('click', e => {
        e.preventDefault();
        readMoreParent.classList.toggle('open');
        readMoreBtn.classList.add('d-none');
    })
}());

//> Product Template - Variants
(function () {
    let variantInputs = document.querySelectorAll('[data-variant-change]');
    let grantSelect = document.querySelector('#SingleOptionSelector-0');
    if (variantInputs === null) return;

    variantInputs.forEach(input => {
        input.addEventListener('change', () => {
            grantSelect.value = input.value;
            grantSelect.dispatchEvent(
                new CustomEvent('change')
            );
        });
    })
}());

//> Product Template - Mob Gallery Swipe
(function () {
    let galleryImages = document.querySelectorAll('.product-single__media-wrapper');
    if (galleryImages === null) return;

    let xDown = null;
    let yDown = null;

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                galleryChangeSlide('Left', evt);
            } else {
                galleryChangeSlide('Right', evt);
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }

    function galleryChangeSlide(dir, e) {
        let parent = e.target.closest('[data-media-id]');
        if (dir === 'Left') {
            let nextElement = parent.nextElementSibling;
            if (nextElement.hasAttribute('data-thumbnail-slider')) return;

            let selector = document.querySelector(`[data-thumbnail-id="${nextElement.dataset.mediaId}"]`);
            selector.click();
        } else if (dir === 'Right') {
            let prevElement = parent.previousElementSibling;
            if (prevElement === null) return;

            let selector = document.querySelector(`[data-thumbnail-id="${prevElement.dataset.mediaId}"]`);
            selector.click();
        }

    }

    galleryImages.forEach(img => {
        img.addEventListener('touchstart', handleTouchStart, false);
        img.addEventListener('touchmove', handleTouchMove, false);
    })
}());