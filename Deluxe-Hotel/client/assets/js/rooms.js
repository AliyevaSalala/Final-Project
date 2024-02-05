const categoryBtn = document.querySelectorAll(".categorybtn");

categoryBtn.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".categorybtn.active").classList.remove("active");
    this.classList.add("active");
  })
);

$(".owl-theme").owlCarousel({
  loop: true,
  margin: 10,
  responsiveClass: true,
  // autoplay: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    600: {
      items: 2,
      nav: false,
    },
    1000: {
      items: 3,
      nav: false,
      loop: true,
      margin: 20,
    },
  },
});

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  autoplay: true,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});

//material contact form animation
$(".contact-form")
  .find(".form-control")
  .each(function () {
    var targetItem = $(this).parent();
    if ($(this).val()) {
      $(targetItem).find("label").css({
        top: "-6px",
        fontSize: "16px",
        color: "#ff512f",
      });
    }
  });
$(".contact-form")
  .find(".form-control")
  .focus(function () {
    $(this).parent(".input-block").addClass("focus");
    $(this).parent().find("label").animate(
      {
        top: "-6px",
        fontSize: "16px",
        color: "#ff512f",
      },
      300
    );
  });
$(".contact-form")
  .find(".form-control")
  .blur(function () {
    if ($(this).val().length == 0) {
      $(this).parent(".input-block").removeClass("focus");
      $(this).parent().find("label").animate(
        {
          top: "20px",
          fontSize: "18px",
        },
        300
      );
    }
  });
