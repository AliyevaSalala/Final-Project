const content = document.querySelector(".content");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  content.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  content.classList.remove("active");
});
