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
    if ($(".form > div > form ol > li > div > button." + classname).hasClass("active")) {
      $(".form > div > form ol > li > div > button." + classname).removeClass("active");
    }
  } else {
    if ($(".form." + classname + " label.required > input").length !== $(".form." + classname + " label.required > input.success").length) {
      if ($(".form > div > form ol > li > div > button." + classname).hasClass("active")) {
        $(".form > div > form ol > li > div > button." + classname).removeClass("active");
      }
    } else {
      if (!$(".form > div > form ol > li > div > button." + classname).hasClass("active")) {
        $(".form > div > form ol > li > div > button." + classname).addClass("active");
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
      isCalltouch(ct_data);
      ym(80608846, 'reachGoal', form);
      console.log("СЃРѕРѕР±С‰РµРЅРёРµ СѓСЃРїРµС€РЅРѕ РѕС‚РїСЂР°РІР»РµРЅРѕ");
      return true;
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
    console.log("РѕС€РёР±РєР° РѕС‚РїСЂР°РІРєРё С„РѕСЂРјС‹");
    return false;
  });
}

function isFilter(form) {
  "use strict";

  if ($("#chips_child_list > div").length > 0) {
    $("#chips_child_list > div").each(function (i) {
      if ($(this).hasClass("filter")) {
        $(this).removeClass("filter");
      }
    });
  }

  var formData = new FormData(document.forms[form]);
  $.ajax({
    type: "POST",
    data: formData,
    url: "/resources/ajax/filter/",
    cache: false,
    dataType: "json",
    processData: false,
    contentType: false
  }).done(function (result) {
    if (result.status === "success") {

      if (result.query) {
        let json = JSON.parse(result.query),
          _key,
          _urlParams = "?";
        for (_key in json) {
          if (json[_key] instanceof Array) {
            let _i = 0;
            while (_i < json[_key].length) {
              if ($("#" + _key.toLowerCase() + "_" + json[_key][_i]).length > 0) {
                if (!$("#" + _key.toLowerCase() + "_" + json[_key][_i]).hasClass("filter")) {
                  $("#" + _key.toLowerCase() + "_" + json[_key][_i]).addClass("filter");
                }
              }
              _urlParams = _urlParams + _key + "[]=" + json[_key][_i] + "&";
              _i++;
            }
          } else {
            _urlParams = _urlParams + _key + "=" + json[_key] + "&";
          }
        }

        top.history.pushState(null, null, window.location.pathname + _urlParams.slice(0, -1));
        if (window !== top) {
          $("body > div > .iframe", window.parent.document).data("back", window.location.pathname + _urlParams.slice(0, -1));
        }

        if ($("#chips_child_list > div").length > 0) {
          $("#chips_child_list > div").each(function (i) {
            if ($(this).hasClass("filter")) {
              $(this).removeClass("filter");
              if (!$(this).hasClass("visible")) {
                $(this).addClass("visible");
              }
            } else {
              if ($(this).hasClass("visible")) {
                $(this).removeClass("visible");
              }
            }
          });
        }

      }

      if (result.items) {
        let json = JSON.parse(result.items);
        $.each(json, function (i) {
          // console.log(json[i].MODULE_CODE + "_" + json[i].ID);
          if ($("#" + json[i].MODULE_CODE + "_" + json[i].ID).length > 0) {
            if (!$("#" + json[i].MODULE_CODE + "_" + json[i].ID).hasClass("visible")) {
              $("#" + json[i].MODULE_CODE + "_" + json[i].ID).addClass("visible");
            }
            if (!$("#" + json[i].MODULE_CODE + "_" + json[i].ID).hasClass("filter")) {
              $("#" + json[i].MODULE_CODE + "_" + json[i].ID).addClass("filter");
            }
          }
        });
      }

      if ($(".objects > .object").length > 0) {
        $(".objects > .object").each(function (i) {
          if (!$(this).hasClass("filter")) {
            if ($(this).hasClass("visible")) {
              $(this).removeClass("visible");
            }
          } else {
            $(this).removeClass("filter");
          }
        });
      }

    }
  }).fail(function (result) {
    console.log("РѕС€РёР±РєР° РѕС‚РїСЂР°РІРєРё С„РѕСЂРјС‹");
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
        var ct_data = {
          sessionId: window.ct("calltracking_params", "utnwhqm1").sessionId
        };
        ct_data.comment = $(".form.feedback textarea").val();
        $(".form.feedback input").each(function () {
          if ($(this).attr("name") === "QUEST[FORM]") {
            ct_data.subject = $(this).val();
          }
          if ($(this).attr("name") === "QUEST[NAME]") {
            ct_data.fio = $(this).val();
          }
          if ($(this).attr("name") === "QUEST[PHONE]") {
            ct_data.phoneNumber = $(this).val();
          }
          if ($(this).attr("name") === "QUEST[EMAIL]") {
            ct_data.email = $(this).val();
          }
        });
        /* $(".form.feedback").addClass("success"); */
        isForm("feedback", ct_data);
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

  $(document).on("click", ".button.callback", function (e) {
    if ($(this).hasClass("active")) {
      if (!$(".form.callback").hasClass("success")) {
        var ct_data = {
          sessionId: window.ct("calltracking_params", "utnwhqm1").sessionId
        };
        $(".form.callback input").each(function () {
          if ($(this).attr("name") === "QUEST[FORM]") {
            ct_data.subject = $(this).val();
          }
          if ($(this).attr("name") === "QUEST[NAME]") {
            ct_data.fio = $(this).val();
          }
          if ($(this).attr("name") === "QUEST[PHONE]") {
            ct_data.phoneNumber = $(this).val();
          }
        });
        /* $(".form.callback").addClass("success"); */
        isForm("callback", ct_data);
      }
    } else {
      $(".form.callback").addClass("shake");
      $(".form.callback > div > form > ul > li > div > label.required > input").each(function () {
        isCheck(this);
      });
    }
    setTimeout(function () {
      if ($(".form.callback").hasClass("shake")) {
        $(".form.callback").removeClass("shake");
      }
    }, 1000);
    e.preventDefault();
  });

  $(document).on("click", ".checkbox > span", function (e) {
    if (!$(this).hasClass("checked")) {
      $(this).addClass("checked");
      $(this).prev("input").checked = true;
      $(this).prev("input").prop("checked", true);
    } else {
      $(this).removeClass("checked");
      $(this).prev("input").checked = false;
      $(this).prev("input").prop("checked", false);
    }
    if ($(this).prev("input").data("changed") && $(this).prev("input").data("changed") === "filter") {
      isFilter("filter");
    }
    e.preventDefault();
  });

  $(document).on("touchend mouseup", ".button.clear", function (e) {
    $(".filter > form > ul > li > div > ol > li > label > .changed").each(function (i) {
      $(this).checked = false;
      $(this).prop("checked", false);
      if ($(this).next("span").hasClass("checked")) {
        $(this).next("span").removeClass("checked");
      }
    });
    isFilter("filter");
    e.preventDefault();
  });

  $(document).on("click", "#chips_child_list > div > button", function (e) {
    if ($(this).data("checkbox")) {
      $(".checkbox > span." + $(this).data("checkbox")).click();
    }
  });

  if ($(".wrapper > .aside > .close + .indent > .filter > form").length > 0) {
    isFilter("filter");
  }

  $("input[type=tel]").inputmask("+7 (999) 999-99-99");
  return false;
});