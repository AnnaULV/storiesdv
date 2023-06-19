function isReady() {
  "use strict";
  let vh = $(window).innerHeight() * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  return false;
}

$(window).on("load", function () {
  "use strict";

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $(".hover").each(function () {
      $(this).removeClass("hover");
    });
  }

  $(document).on("touchend mouseup", ".action", function (e) {
    if ($(this).data("action")) {

      if ($(this).data("action") === "iframe") {
        if ($(".wrapper").length) {
          if ($(".wrapper > .iframe > iframe").length === 0) {
            const el = document.createElement("iframe");
            if ($(window).innerWidth() > 1200) {
              el.style.width = 1200 + "px";
            } else {
              el.style.width = $(window).innerWidth() + "px";
            }
            document.getElementsByClassName("iframe")[0].appendChild(el);
            if ($(this).data("iframe")) {
              $(".wrapper > .iframe > iframe").attr("src", $(this).data("iframe"));
            }
          }
          if (!$(".wrapper").hasClass("opened")) {
            $(".wrapper").addClass("opened");
          }
          if (!$(".wrapper").hasClass("frame")) {
            $(".wrapper").addClass("frame");
          }
          if ($(".wrapper > span").length) {
            $(".wrapper > span").css({
              width: 100 + "%"
            });
            $("body > div > span").animate({
              opacity: 1
            }, 150);
          }
          setTimeout(function () {
            if ($(".wrapper > .iframe > iframe").length > 0) {
              $(".wrapper > .iframe > iframe").css({
                width: "100%"
              });
            }
          }, 150);
        }
      }

      if ($(this).data("action") === "close") {
        if ($(".wrapper").length) {
          if ($(".wrapper").hasClass("opened")) {
            if ($(".wrapper").hasClass("frame")) {
              if ($(".wrapper > .iframe > iframe").length > 0) {
                $(".wrapper > .iframe > iframe").css({
                  width: $(".wrapper > .iframe").innerWidth() + "px"
                });
              }
              $(".wrapper").removeClass("frame");
              setTimeout(function () {
                $(".wrapper > span").animate({
                  opacity: 0
                }, 150, function () {
                  $(".wrapper > span").css({
                    width: 0
                  });
                  $(".wrapper").removeClass("opened");
                });
                if ($(".wrapper > .iframe > iframe").length > 0) {
                  document.getElementsByTagName("iframe")[0].parentNode.removeChild(document.getElementsByTagName("iframe")[0]);
                }
              }, 150);
            }
          }
        }
      }

    }
    e.preventDefault();
  });

  isReady();
  return false;
});

$(window).on("orientationchange", function () {
  "use strict";
  location.reload();
  return false;
});

$(window).on("resize", function () {
  "use strict";
  isReady();
  return false;
});
