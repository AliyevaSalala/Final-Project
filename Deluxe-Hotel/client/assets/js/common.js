const menuIcon = document.querySelector("#menu-icon");
const nav = document.querySelector("#nav");
const menuCircle = document.querySelector(".menu-circle");
const headerSearch = document.querySelector("#navbar-search");
const closeIcon = document.querySelector(".close-icon");
const navbarSearch = document.querySelector(".navbar-search");
const header = document.querySelector("header");
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const toTop = document.querySelector(".arrow-up");
const faUser = document.querySelector(".fa-user");

const DB_URL = "http://localhost:8000";

menuIcon.addEventListener("click", function () {
  nav.classList.toggle("show");

  this.classList.contains("fa-bars")
    ? (this.className = "fa-solid fa-xmark")
    : (this.className = "fa-solid fa-bars");
});

menuCircle.addEventListener("click", function () {
  document.body.classList.toggle("show-menu");
});

faUser?.addEventListener("click", function () {
  document.body.classList.toggle("show-account");
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

// BASKET
const basketCounter = document.querySelector(".basket-counter");

let basket = getItemLocalStorage();
basketCalculate();

function setItemLocalStorage(item) {
  localStorage.setItem("product", JSON.stringify(item));
}

function getItemLocalStorage() {
  return JSON.parse(localStorage.getItem("product")) || [];
}
function basketCalculate() {
  basketCounter.textContent = basket.reduce((acc, curr) => acc + curr.count, 0);
}

// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelector("#content").style.display = "none";

//   setTimeout(function () {
//     document.querySelector(".loading-container").style.display = "none";
//     document.querySelector("#content").style.display = "block";

//     AOS.init();
//   }, 500);
// });

let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#c19d68 ${scrollValue}%, #fff ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// LOGOUT

const isLoggedIn = localStorage.getItem("login") !== null;
const logOut = document.querySelector(".logout-icon");

if (isLoggedIn) {
  logOut.style.display = "block";
} else {
  logOut.style.display = "none";
}

logOut.addEventListener("click", async function () {
  try {
    const res = await axios.post(`${DB_URL}/logout`);
    if (res.status === 200) {
      localStorage.removeItem("login");
      window.location = "login.html";
    }
  } catch (error) {
    console.error(error);
  }
});
