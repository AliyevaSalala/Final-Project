const BASE_url = "http://localhost:8000";
const userTbdody = document.querySelector(".user-tbody");
const userSearch = document.querySelector("#user-search");
const darkMode = document.querySelector(".dark-mode");
const moonMode = document.querySelector(".dark-mode-moon");
const body = document.querySelector("body");

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

async function getUsersData(endpoint) {
  const res = await axios(`${BASE_url}/${endpoint}`);
  console.log(res.data);
}
getUsersData("users");
