const BASE_url = "https://deluxe-back.onrender.com";
const darkMode = document.querySelector(".dark-mode");
const moonMode = document.querySelector(".dark-mode-moon");
const body = document.querySelector("body");

const logOut = document.querySelector(".logout");

logOut.addEventListener("click", function () {
  localStorage.removeItem("isAdmin");
  window.location.href = "../login.html";
  // console.log("shalalal");
});

if (!localStorage.getItem("isAdmin")) {
  window.location.href = "../login.html";
}

localStorage.getItem("dark-mode") === "true" && body.classList.add("dark-mode");

darkMode.addEventListener("click", function () {
  body.classList.add("dark-mode");

  localStorage.getItem("dark-mode") === "true"
    ? localStorage.setItem("dark-mode", false)
    : localStorage.setItem("dark-mode", true);
});
moonMode.addEventListener("click", function () {
  body.classList.remove("dark-mode");

  localStorage.getItem("dark-mode") === "true"
    ? localStorage.setItem("dark-mode", false)
    : localStorage.setItem("dark-mode", true);
});
