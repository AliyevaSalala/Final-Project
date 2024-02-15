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

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#content").style.display = "none";

  setTimeout(function () {
    document.querySelector(".loading-container").style.display = "none";
    document.querySelector("#content").style.display = "block";

    AOS.init();
  }, 2000);
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
const adult = document.querySelector("#adult");
const rooms = document.querySelector("#rooms");
const children = document.querySelector("#children");

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

// REZERVATION

let array = [];

let login = localStorage.getItem("login");

async function checkReservation(startDate, endDate) {
  const reservations = await axios.get(`${DB_URL}/reservations`);
  const existingReservation = reservations.data.find(
    (reservation) =>
      reservation.checkIn <= endDate && reservation.checkOut >= startDate
  );
  return existingReservation !== undefined;
}

checkForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (login === "true") {
    let newObj = {
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      rooms: rooms.value,
      adult: adult.value,
      children: children.value,
    };
    if (
      checkInInput.value != "" &&
      checkOutInput.value != "" &&
      rooms.value != "" &&
      children.value != "" &&
      adult.value != ""
    ) {
      const isReserved = await checkReservation(
        checkInInput.value,
        checkOutInput.value
      );
      if (isReserved) {
        Toastify({
          text: "This date is already reserved!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #FF0000, #FF6347)",
        }).showToast();
      } else {
        await axios.post(`${DB_URL}/reservations`, newObj);
        Toastify({
          text: "Reservation successful!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      }
    }
  } else {
    window.location = "login.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  checkInInput.setAttribute("min", today);
  checkOutInput.setAttribute("min", today);
});
