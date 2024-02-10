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
const checkForm = document.querySelector(".grid");
const checkInInput = document.querySelector("#check-in-input");
const checkOutInput = document.querySelector("#check-out-input");
const numberInput = document.querySelector("#number-input");

const select = document.querySelector("#check-select");

let authorName;



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

  setTimeout(function () {
    Toastify({
      text: "Form submitted successfully!",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
    document.getElementById("my-form").reset();
    localStorage.removeItem("formData");
  }, 1000);
});

let array = [];

async function getAllData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}`);
  // console.log(res.data);
  array = res.data;
  console.log(array);
}

getAllData("reservations");

checkForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let newObj = {
    checkIn: checkInInput.value,
    checkOut: checkOutInput.value,
    rooms: numberInput.value,
    guests: authorName,
  };
  if (
    checkInInput.value != "" &&
    checkOutInput.value != "" &&
    numberInput.value != "" &&
    select.value != ""
  ) {
    await axios.post(`${DB_URL}/reservations`, newObj);
    // array.push(newObj);
  } else {
    alert("1111");
  }
  // console.log(checkInInput);
  // console.log(checkOutInput);
  // console.log(numberInput.value);
  // console.log(select.value);
});

select.addEventListener("change", function (e) {
  authorName = e.target.value;
  console.log(authorName);
});
