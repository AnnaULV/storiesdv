var timer = [],
  progress = [],
  isProgressPaused = false;

function isTimer(_i_, _delay_) {
  "use strict";
  progress[_i_] = 0;
  timer[_i_] = setInterval(function () {
    if (!isProgressPaused) {
      progress[_i_] = progress[_i_] + 1;
      document.querySelectorAll("header > .swiper-pagination > .swiper-pagination-bullet > span")[_i_].style.width = progress[_i_] + "%";
      if (progress[_i_] >= 100) {
        document.querySelectorAll("header > .swiper-pagination > .swiper-pagination-bullet > span")[_i_].classList.add("selected");
        clearInterval(timer[_i_]);
      }
    }
  }, _delay_);
  return false;
}

$(document).ready(function () {
  "use strict";

  const SwiperPaginationProgress = new Swiper("article > .swiper-container > .swiper", {
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    noSwipingClass: "swiper-no-swiping",
    effect: "fade",
    speed: 300,
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: "footer > div > div > .swiper-button.next",
      prevEl: "footer > div > div > .swiper-button.prev"
    },
    pagination: {
      el: "header > .swiper-pagination",
      clickable: true
    },
    on: {
      afterInit: function (swiper) {
        document.querySelectorAll("header > .swiper-pagination > .swiper-pagination-bullet").forEach((element, i) => {
          var span = element.appendChild(document.createElement("span"));
          span.style.background = document.querySelectorAll("header > .swiper-pagination")[0].attributes[1].nodeValue;
          element.classList.add("hover");
        });
        isTimer(swiper.activeIndex, parseInt(swiper.params.autoplay.delay / 100));
      },
      slideChange: function (swiper) {
        if (document.querySelectorAll("header > .swiper-pagination > .swiper-pagination-bullet > span")[swiper.activeIndex].classList.contains("selected") === false) {
          isTimer(swiper.activeIndex, parseInt(swiper.params.autoplay.delay / 100));
        } else {
          swiper.slides.forEach((element, i) => {
            if (swiper.activeIndex >= i) {
              document.querySelectorAll("header > .swiper-pagination > .swiper-pagination-bullet > span")[i].style.width = 100 + "%";
            } else {
              document.querySelectorAll("header > .swiper-pagination > .swiper-pagination-bullet > span")[i].style.width = 0;
            }
          });
        }
        if (swiper.activeIndex === parseInt(document.querySelectorAll("article > .swiper-container > .swiper > .swiper-wrapper > .swiper-slide").length - 1)) {
          swiper.autoplay.stop();
        }
      }
    }
  });

  $(document).on("touchstart mousedown", "article > .swiper-container > .swiper > .swiper-wrapper > .swiper-slide", function (e) {
    SwiperPaginationProgress.autoplay.pause();
    isProgressPaused = true;
    e.preventDefault();
  });

  $(document).on("touchend mouseup", "article > .swiper-container > .swiper > .swiper-wrapper > .swiper-slide", function (e) {
    SwiperPaginationProgress.autoplay.resume();
    isProgressPaused = false;
    e.preventDefault();
  });

  $(document).on("touchstart mousedown", "header > .swiper-pagination > .swiper-pagination-bullet", function (e) {
    isProgressPaused = true;
    SwiperPaginationProgress.autoplay.stop();
    document.querySelectorAll("header > .swiper-pagination > .swiper-pagination-bullet > span").forEach((element, i) => {
      clearInterval(timer[i]);
      if (element.classList.contains("selected") === false) {
        element.classList.add("selected");
      }
      if (SwiperPaginationProgress.activeIndex >= i) {
        element.style.width = 100 + "%";
      } else {
        element.style.width = 0;
      }
      timer[i] = null;
    });
    e.preventDefault();
  });

  $(document).on("touchstart mousedown", "footer > div > div > .swiper-button", function (e) {
    isProgressPaused = true;
    SwiperPaginationProgress.autoplay.stop();
    document.querySelectorAll("header > .swiper-pagination > .swiper-pagination-bullet > span").forEach((element, i) => {
      clearInterval(timer[i]);
      if (element.classList.contains("selected") === false) {
        element.classList.add("selected");
      }
      if (SwiperPaginationProgress.activeIndex >= i) {
        element.style.width = 100 + "%";
      } else {
        element.style.width = 0;
      }
      timer[i] = null;
    });
    e.preventDefault();
  });

  return false;
});
