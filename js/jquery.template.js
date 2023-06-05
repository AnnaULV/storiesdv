function isReady() {
  "use strict";
  let vh = $(window).innerHeight() * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  if ($(".swiper-container > .swiper > .swiper-wrapper > .swiper-slide > .center > .image").length) {
    if ($(window).innerHeight() > $(window).innerWidth()) {
      let param = parseInt($(window).innerWidth() - 48);
      if (param > parseInt($(window).innerHeight() - 160)) {
        param = parseInt($(window).innerHeight() - 160);
      }
      $(".swiper-container > .swiper > .swiper-wrapper > .swiper-slide > .center > .image").css({
        "width": param + "px",
        "height": param + "px"
      });
    } else {
      let param = parseInt($(window).innerHeight() - 160);
      if (param < 320) {
        param = 320;
      }
      $(".swiper-container > .swiper > .swiper-wrapper > .swiper-slide > .center > .image").css({
        "width": param + "px",
        "height": param + "px"
      });
    }
  }
  return false;
}

  $(document).on("click", ".action",function (e) {
    if ($(".wrapper").length > 0) {
      if (!$(".wrapper").hasClass("aside")) {
        $(".wrapper").addClass("aside");
      
    }}
    e.preventDefault();
  });

$(window).on("load", function () {
  "use strict";
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $(".hover").each(function () {
      $(this).removeClass("hover");
    });
  }
  isReady();
  return false;
});

/* окно поменяло ориентацию горизонтально <——> вертикально */
$(window).on("orientationchange", function () {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  /* перезагрузить документ */
  location.reload();
  return false;
});

/* окно поменяло размер */
$(window).on("resize", function () {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
  /* повторный вызов функции — после того, как документ полностью загружен (корректировка отображения элементов) */
  isReady();
  return false;
});
