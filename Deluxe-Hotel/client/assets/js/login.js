const content = document.querySelector(".content");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  content.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  content.classList.remove("active");
});

const signUpForm = document.querySelector("#sign-up-form");
const signUpUserName = document.querySelector("#sign-up-name");
const signUpEmail = document.querySelector("#sign-up-email");
const signUpUsPassword = document.querySelector("#sign-up-password");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let userName = signUpUserName.value;
  let userEmail = signUpEmail.value;
  let userPassword = signUpUsPassword.value;

  if (
    userName.trim() === "" ||
    userEmail.trim() === "" ||
    userPassword.trim() === ""
  ) {
    alert("Please fill in all fields for signup.");
    return;
  }
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  existingUsers.push({
    username: userName,
    useremail: userEmail,
    password: userPassword,
  });

  localStorage.setItem("users", JSON.stringify(existingUsers));

  // localStorage.setItem("userName", userName);
  // localStorage.setItem("userEmail", userEmail);
  // localStorage.setItem("password", userPassword);
  // alert("Signup successful!");
  signUpUserName.value = "";
  signUpEmail.value = "";
  signUpUsPassword.value = "";
  console.log(
    "Signup: Username - " +
      userName +
      ", UserEmail - " +
      userEmail +
      ", Password - " +
      userPassword
  );
});

const signInForm = document.querySelector("#sign-in-form");
const signInEmail = document.querySelector("#sign-in-email");
const signInPassword = document.querySelector("#sign-in-password");

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let userEmail = signInEmail.value;
  let userPassword = signInPassword.value;

  if (userEmail.trim() === "" || userPassword.trim() === "") {
    alert("Please fill in all fields for login.");
    return;
  }
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const userFound = existingUsers.some(function (user) {
    return user.username === username && user.password === password;
  });

  if (userFound) {
    alert("Login successful!");
  } else {
    alert("Invalid username or password!");
  }
});
