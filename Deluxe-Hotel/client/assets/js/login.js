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

signInForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let newObj = {
    email: userEmail.value,
    password: userPassword.value,
  };

  if (!userEmail.value || !userPassword.value) {
    Toastify({
      text: "Please enter email and password",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
    }).showToast();
    return;
  } else {
    try {
      const res = await axios.post(`${DB_URL}/signin`, newObj);
      if (res.status === 200) {
        if (!res.data.userInfo.isAdmin) {
          window.location.href = "./index.html";
        } else {
          localStorage.setItem("isAdmin", true);
          window.location.href = "./admin/admin.html";
        }
        userEmail.value = "";
        userPassword.value = "";
        Toastify({
          text: "Login successful!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();

        localStorage.setItem("login", true);
        return;
      }
    } catch (error) {
      Toastify({
        text: "Wrong email or password!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, red, #96c93d)",
      }).showToast();
      return;
    }
  }
});
