const signUpForm = document.querySelector(".sign-up-form");
const userName = document.querySelector("#user-name");
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

// signUpForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   let username = userName.value;
//   let useremail = userEmail.value;
//   let password = userPassword.value;

//   if (!username || !useremail || !password) {
//     Toastify({
//       text: "Please fill in all fields..",
//       duration: 3000,
//       close: true,
//       gravity: "top",
//       position: "right",
//       backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
//     }).showToast();
//     return;
//   }

//   const users = JSON.parse(localStorage.getItem("users")) || {};

//   if (users.hasOwnProperty(useremail)) {
//     Toastify({
//       text: "This email is already registered. Please use another email.",
//       duration: 3000,
//       close: true,
//       gravity: "top",
//       position: "right",
//       backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
//     }).showToast();
//     return;
//   }

//   users[useremail] = password;
//   localStorage.setItem("users", JSON.stringify(users));

//   signUpForm.reset();
//   Toastify({
//     text: "Your registration has been successfully created!.",
//     duration: 3000,
//     close: true,
//     gravity: "top",
//     position: "right",
//     backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//   }).showToast();
//   return;
// });
