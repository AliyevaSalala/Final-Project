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
