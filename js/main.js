$(document).ready(function () {
    "use strict";

    new Swiper(".main > .gallery.swiper-container > .swiper", {
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
            el: ".main > .swiper-pagination",
            clickable: true
        },
         navigation: {
            nextEl: ".main > .gallery.swiper-container > .swiper-button.next",
            prevEl: ".main > .gallery.swiper-container > .swiper-button.prev"
        }
    });
    return false;
});
