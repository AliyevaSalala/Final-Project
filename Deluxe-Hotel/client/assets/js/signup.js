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

// async function getData(endpoint) {
//   const res = await axios(`${DB_URL}/${endpoint}`);
//   console.log(res.data);
// }

// getData("users");

signUpForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let newObj = {
    username: userName.value,
    email: userEmail.value,
    password: userPassword.value,
  };

  if (!userName.value || !userEmail.value || !userPassword.value) {
    Toastify({
      text: "Please fill in all fields..",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
    }).showToast();
    return;
  } else {
    try {
      const res = await axios.post(`${DB_URL}/signup`, newObj);
      if (res.status === 201) {
        userName.value = "";
        userEmail.value = "";
        userPassword.value = "";

        console.log(res);
        Toastify({
          text: "Your registration has been successfully created!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
        window.location = "login.html";
        return;
      }
    } catch (error) {
      Toastify({
        text: "This email is already registered. Please use another email",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, red, #96c93d)",
      }).showToast();
    }
  }
});
