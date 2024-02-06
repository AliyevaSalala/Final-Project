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
const firstName = document.querySelector("#fist-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");

// function submitForm() {
//   Toastify({
//     text: "Succefuly!",
//     duration: 5000,
//     gravity: "bottom",
//     position: "right",
//     backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//   }).showToast();
// }

function submitForm() {
  if (firstName && lastName && email && phone) {
    showToast("The form was sent successfully");
  } else {
    showToast("Please fill in the form", "red");
  }
}

function showToast(
  message,
  backgroundColor = "linear-gradient(to right, #00b09b, #96c93d)"
) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: backgroundColor,
  }).showToast();
}
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

