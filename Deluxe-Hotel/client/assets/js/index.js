// Owl Carousel
AOS.init();

$(".owl-theme").owlCarousel({
  loop: true,
  margin: 10,
  responsiveClass: true,
  // autoplay: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    600: {
      items: 2,
      nav: false,
    },
    1000: {
      items: 3,
      nav: false,
      loop: true,
      margin: 20,
    },
  },
});

$(".counter").each(function () {
  var $this = $(this),
    countTo = $this.attr("data-count");

  $({ countNum: $this.text() }).animate(
    {
      countNum: countTo,
    },

    {
      duration: 7000,
      easing: "linear",
      step: function () {
        $this.text(Math.floor(this.countNum));
      },
      complete: function () {
        $this.text(this.countNum);
        //alert('finished');
      },
    }
  );
});

// contact-form
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const textareaInput = document.querySelector("#textarea");
const myForm = document.querySelector("#my-form");
const checkForm = document.querySelector(".check-form");
const checkInInput = document.querySelector("#check-in-input");
const checkOutInput = document.querySelector("#check-out-input");
// const numberInput = document.querySelector("#number-input");

const roomSelect = document.querySelector("#room-select");
const guestsSelect = document.querySelector("#guests-select");

// let authorName;

function saveFormData() {
  const formData = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    textarea: textareaInput.value.trim(),
  };
  localStorage.setItem("formData", JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem("formData");
  if (savedData) {
    const formData = JSON.parse(savedData);
    firstNameInput.value = formData.firstName;
    lastNameInput.value = formData.lastName;
    emailInput.value = formData.email;
    phoneInput.value = formData.phone;
    textareaInput.value = formData.textarea;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadFormData();
});

myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Form validation
  let firstName = firstNameInput.value.trim();
  let lastName = lastNameInput.value.trim();
  let email = emailInput.value.trim();
  let phone = phoneInput.value.trim();
  let textarea = textareaInput.value.trim();

  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    phone === "" ||
    textarea === ""
  ) {
    Toastify({
      text: "Please fill in all fields",
      backgroundColor: "linear-gradient(to right, #FF6E14, #FFB42A)",
    }).showToast();
    return;
    //     Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: "Something went wrong!",
    //   footer: '<a href="#">Why do I have this issue?</a>'
    // });
  }

  saveFormData();
  Swal.fire({
    title: "Good job!",
    text: "Form submitted successfully!",
    icon: "success",
  });

  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  textareaInput.value = "";
});

let array = [];

async function getAllData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}`);
  // console.log(res.data);
  array = res.data;
  console.log(array);
}

getAllData("reservations");
let login = localStorage.getItem("login");

checkForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (login === "true") {
    let newObj = {
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      rooms: roomSelect.value,
      guests: guestsSelect.value,
    };
    if (
      checkInInput.value != "" &&
      checkOutInput.value != "" &&
      roomSelect.value != "" &&
      guestsSelect.value != ""
    ) {
      await axios.post(`${DB_URL}/reservations`, newObj);
      Toastify({
        text: " successful!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    }
  } else {
    window.location = "login.html";
  }
});

// LOGOUT

const logOut = document.querySelector(".logout-icon");

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
