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
            el: ".main > .gallery + div > div:last-child > div > .swiper-pagination",
            clickable: true
        }
    });
    return false;
});
