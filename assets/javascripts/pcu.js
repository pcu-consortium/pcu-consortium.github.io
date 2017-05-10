$(function() {
  var main = $(document);
  var mainnav = $("#mainNav");
  var subnav = $("#subNav");
  var headerSize = mainnav.height() + subnav.height();
  var bodyTopPadding = 50;

  function updateSubNav() {
    var scrollTop = main.scrollTop();
    var titleSize = $(".page-header").height();

    if (subnav) {
      if (scrollTop > headerSize + titleSize - bodyTopPadding) {
        subnav.addClass("fix-subNav");
      } else {
        subnav.removeClass("fix-subNav");
      }

      $('a', subnav).each(function() {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        var topElement = refElement.offset().top;
        var heightElement = refElement.height();

        if (topElement <= scrollTop + headerSize + bodyTopPadding && topElement + heightElement > scrollTop + headerSize + bodyTopPadding) {
          if (!currentLink.hasClass("active")) {
            $('a', subnav).removeClass("active");
            currentLink.addClass("active");
          }
        } else {
          currentLink.removeClass("active");
        }
      });
    }
  }

  updateSubNav();

  main.on("scroll", function(e) {
    updateSubNav();
  });

  $('a', subnav).click(function() {
    console.info("ok");
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length
        ? target
        : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - headerSize - bodyTopPadding
        }, 1000);
        return false;
      }
    }
  });
});
