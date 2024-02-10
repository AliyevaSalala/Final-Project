const signInForm = document.querySelector(".sign-in-form");
const userEmail = document.querySelector("#user-email");
const userPassword = document.querySelector("#password");

const eyeSlash = document.querySelector(".fa-eye-slash");
const faEye = document.querySelector(".fa-eye");

eyeSlash.addEventListener("click", function () {
  userPassword.type = "text";
  faEye.style.display = "block";
  eyeSlash.style.display = "none";
});
faEye.addEventListener("click", function () {
  userPassword.type = "password";
  faEye.style.display = "none";
  eyeSlash.style.display = "block";
});

// signInForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const username = userEmail.value;
//   const password = userPassword.value;
//   if (!username || !password) {
//     Toastify({
//       text: "Please enter username and password.",
//       duration: 3000,
//       close: true,
//       gravity: "top",
//       position: "right",
//       backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
//     }).showToast();
//     return;
//   }
//   const users = JSON.parse(localStorage.getItem("users")) || {};
//   if (users[username] === password) {
//     Toastify({
//       text: "Login successful!",
//       duration: 3000,
//       close: true,
//       gravity: "top",
//       position: "right",
//       backgroundColor: "linear-gradient(to right, #50C9C3, #96DEDA)",
//     }).showToast();
//     // window.location.href = "shop.html";
//     localStorage.setItem("login", true);
//   } else {
//     Toastify({
//       text: "Wrong username or password!",
//       duration: 3000,
//       close: true,
//       gravity: "top",
//       position: "right",
//       backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
//     }).showToast();
//   }

//   userEmail.value = "";
//   userPassword.value = "";
// });
