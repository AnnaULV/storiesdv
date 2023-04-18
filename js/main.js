$(document).ready(function () {
    "use strict";

    new Swiper(".gallery.swiper-container > .swiper", {
        slidesPerView: 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        effect: "fade",
        speed: 600,
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
         navigation: {
            nextEl: ".gallery.swiper-container > .swiper-button.next",
            prevEl: ".gallery.swiper-container > .swiper-button.prev"
        }
    });
    return false;
});
