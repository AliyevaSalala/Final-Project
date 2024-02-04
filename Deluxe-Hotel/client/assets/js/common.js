const menuIcon = document.querySelector("#menu-icon");
const nav = document.querySelector("#nav");
const menuCircle = document.querySelector(".menu-circle");
const headerSearch = document.querySelector("#navbar-search");
const closeIcon = document.querySelector(".close-icon");
const navbarSearch = document.querySelector(".navbar-search");
const header = document.querySelector("header");
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// const liElemes = document.querySelectorAll("li");
// liElemes.forEach((item) => {
//   item.addEventListener("click", function () {
//     document.querySelector(".active")?.classList.remove("active");
//     item.classList.add("active");
//   });
// });

menuIcon.addEventListener("click", function () {
  nav.classList.toggle("show");

  this.classList.contains("fa-bars")
    ? (this.className = "fa-solid fa-xmark")
    : (this.className = "fa-solid fa-bars");
});

menuCircle.addEventListener("click", function () {
  document.body.classList.toggle("show-menu");
});
closeIcon?.addEventListener("click", function () {
  document.body.classList.toggle("show-menu");
});

// headerSearch.addEventListener("click", function () {
//   document.body.classList.toggle("show-search");
// });

// navbarSearch.addEventListener("click", function () {
//   document.body.classList.toggle("show-search");
// });

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    header.classList.add("header-scroll");
  } else {
    header.classList.remove("header-scroll");
  }
});

window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  //   cursorOutline.style.left = `${posX}px`;
  //   cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 700, fill: "forwards" }
  );
});
