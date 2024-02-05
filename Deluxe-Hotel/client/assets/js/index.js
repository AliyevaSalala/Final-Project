// Owl Carousel
AOS.init();

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

// OWL-CAROUSEL-TWO



// window.onscroll = () => {
//   sections.forEach((sec) => {
//     let top = window.scrollY;
//     let offset = sec.offsetTop;
//     let height = sec.offsetHeight;

//     if (top >= offset && top < offset + height) {
//       sec.classList.add("show-animate");
//     } else {
//       sec.classList.remove("show-animate");
//     }
//   });
// };
