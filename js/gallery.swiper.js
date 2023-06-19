var swiper_slide_length = $(".gallery.swiper-container > .swiper > .swiper-wrapper > .swiper-slide").length;

$(document).ready(function () {
  "use strict";

  if (swiper_slide_length > 0) {

    let swiperParams = {
      slidesPerView: 1,
      spaceBetween: 12,
      navigation: {
        nextEl: ".gallery.swiper-container > .swiper-button.next",
        prevEl: ".gallery.swiper-container > .swiper-button.prev"
      },
      slideToClickedSlide: true,
      watchSlidesProgress: true,
      observer: true,
      observeSlideChildren: true,
      observeParents: true,
      lazy: {
        loadPrevNext: true
      }
    };

    /* if (swiper_slide_length > 1) {
      swiperParams.loop = true;
    } else {
      swiperParams.loop = false;
    } */

    swiperParams.breakpoints = {
      481: {
        spaceBetween: 16
      },
      961: {
        spaceBetween: 24
      },
      1201: {
        spaceBetween: 32
      }
    };

    new Swiper(".gallery.swiper-container > .swiper", swiperParams);

  }

  return false;
});
