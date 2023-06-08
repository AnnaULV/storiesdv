var result = null;

function isName(name) {
  "use strict";
  let regex = new RegExp(/^([а-яА-Яa-zA-Z][а-яА-Яa-zA-Z\- ]{1,20})+$/);
  return regex.test(name);
}

function isPhone(phone) {
  "use strict";
  var regex = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,20}$/);
  return regex.test(phone);
}

function isEmail(email) {
  "use strict";
  let regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  return regex.test(email);
}

function isCheck(el) {
  "use strict";
  if ($(el).data("check")) {
    if ($(el).data("check") === "name") {
      result = isName($(el).val());
    }
    if ($(el).data("check") === "phone") {
      result = isPhone($(el).val());
    }
    if ($(el).data("check") === "email") {
      result = isEmail($(el).val());
    }
    if (!result) {
      if ($(el).hasClass("success")) {
        $(el).removeClass("success");
      }
      $(el).addClass("error");
    } else {
      if ($(el).hasClass("error")) {
        $(el).removeClass("error");
      }
      $(el).addClass("success");
    }
  }
  return false;
}

function isRequire(classname) {
  "use strict";
  if ($(".form." + classname + " input.error").length > 0) {
    if ($(".form > div > form ul > li > button." + classname).hasClass("active")) {
      $(".form > div > form ul > li > button." + classname).removeClass("active");
    }
  } else {
    if ($(".form." + classname + " label.required > input").length !== $(".form." + classname + " label.required > input.success").length) {
      if ($(".form > div > form ul > li > button." + classname).hasClass("active")) {
        $(".form > div > form ul > li > button." + classname).removeClass("active");
      }
    } else {
      if (!$(".form > div > form ul > li > button." + classname).hasClass("active")) {
        $(".form > div > form ul > li > button." + classname).addClass("active");
      }
    }
  }
  return false;
}

function isForm(form, ct_data) {
  "use strict";
  if ($(".form." + form).hasClass("shake")) {
    $(".form." + form).removeClass("shake");
  }
  $(".form." + form + " > div > form > ul > li > div > label > input").each(function () {
    if ($(this).hasClass("error")) {
      $(this).removeClass("error");
    }
    if ($(this).hasClass("success")) {
      $(this).removeClass("success");
    }
  });
  var formData = new FormData(document.forms[form]);
  $.ajax({
    type: "POST",
    data: formData,
    url: "/resources/ajax/" + form + "/",
    cache: false,
    dataType: "json",
    processData: false,
    contentType: false
  }).done(function (result) {
    if (result.status === "success") {
      $(".form." + form).addClass("success");
      if ($(".button." + form).hasClass("active")) {
        $(".button." + form).removeClass("active");
      }
    } else {
      $(".form." + form).addClass("shake");
      if (result.field) {
        if ($(".form." + form + " > div > form input[name='" + result.field + "']").length > 0) {
          if ($(".form." + form + " > div > form input[name='" + result.field + "']").hasClass("success")) {
            $(".form." + form + " > div > form input[name='" + result.field + "']").removeClass("success");
          }
          if (!$(".form." + form + " > div > form input[name='" + result.field + "']").hasClass("error")) {
            $(".form." + form + " > div > form input[name='" + result.field + "']").addClass("error");
          }
        }
      }
      setTimeout(function () {
        if ($(".form." + form).hasClass("shake")) {
          $(".form." + form).removeClass("shake");
        }
      }, 1000);
      console.log(result.error);
      return false;
    }
  }).fail(function (result) {
    console.log("ошибка");
    return false;
  });
}


$(document).ready(function () {
  "use strict";

  $(document).on("propertychange change click keyup input paste", ".field", function (e) {
    let el = this;
    setTimeout(function () {
      if (!$(el).val()) {
        if ($(el).parent("label").hasClass("selected")) {
          $(el).parent("label").removeClass("selected");
        }
        if ($(el).hasClass("error")) {
          $(el).removeClass("error");
        }
        if ($(el).hasClass("success")) {
          $(el).removeClass("success");
        }
        if ($(el).hasClass("selected")) {
          $(el).removeClass("selected");
        }
      } else {
        if (!$(el).parent("label").hasClass("selected")) {
          $(el).parent("label").addClass("selected");
        }
        isCheck(el);
      }
      isRequire($(el).data("form"));
    }, 100);
    e.preventDefault();
  });

  $(document).on("click", ".button.feedback", function (e) {
    if ($(this).hasClass("active")) {
      if (!$(".form.feedback").hasClass("success")) {
        $(".form.feedback").addClass("success");
        /* isForm("feedback"); */
      }
    } else {
      $(".form.feedback").addClass("shake");
      $(".form.feedback > div > form > ul > li > div > label.required > input").each(function () {
        isCheck(this);
      });
    }
    setTimeout(function () {
      if ($(".form.feedback").hasClass("shake")) {
        $(".form.feedback").removeClass("shake");
      }
    }, 1000);
    e.preventDefault();
  });

  $("input[type=tel]").inputmask("+7 (999) 999-99-99");
  return false;
});
