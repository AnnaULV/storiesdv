$(document).ready(function () {
  "use strict";

  new Swiper(".swiper-container > .swiper", {
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    effect: "fade",
    speed: 600,
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: ".workspace > header > .swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: "footer > div > div > .swiper-button.next",
      prevEl: "footer > div > div > .swiper-button.prev"
    }
  });
  return false;
});
