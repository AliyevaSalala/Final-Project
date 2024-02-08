const signUpForm = document.querySelector(".sign-up-form");
const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const userPassword = document.querySelector("#password");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let username = userName.value;
  let useremail = userEmail.value;
  let password = userPassword.value;

  if (!userName || !userEmail || !userPassword) {
    Toastify({
      text: "Please fill in all fields..",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
    }).showToast();
    return;
  }
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users.hasOwnProperty(username)) {
    Toastify({
      text: "This username already exists. Please choose another username.",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
    }).showToast();
    return;
  }

  users[useremail] = password;
  localStorage.setItem("users", JSON.stringify(users));

  signUpForm.reset();
  Toastify({
    text: "Your registration has been successfully created!.",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
  return;
});
