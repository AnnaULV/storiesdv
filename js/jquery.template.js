function isReady() {
  "use strict";
  let vh = $(window).innerHeight() * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);   
  return false;
}

$(window).on("load", function () {
  /* обрабатывать код в «строгом режиме» */
  "use strict";
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
