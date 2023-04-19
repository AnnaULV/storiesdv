$(document).ready(function () {
    "use strict";

    new Swiper(".swiper-container > .swiper", {
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
    });
    return false;
});
