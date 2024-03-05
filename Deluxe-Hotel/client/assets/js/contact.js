// function submitForm() {
//   if (firstName && lastName && email && phone) {
//     showToast("The form was sent successfully");
//   } else {
//     showToast("Please fill in the form", "red");
//   }
// }

AOS.init();

const firstNameInput = document.querySelector("#first-name");
const emailInput = document.querySelector("#email");

const textareaInput = document.querySelector("#textarea");
const myForm = document.querySelector("#my-form");

myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let firstName = firstNameInput.value.trim();
  let email = emailInput.value.trim();
  let textarea = textareaInput.value.trim();

  if (firstName === "" || email === "" || textarea === "") {
    Toastify({
      text: "Please fill in all fields",
      backgroundColor: "linear-gradient(to right, #FF6E14, #FFB42A)",
    }).showToast();
    return;
  }

//   saveFormData();
  Swal.fire({
    title: "Good job!",
    text: "Form submitted successfully!",
    icon: "success",
  });

  firstNameInput.value = "";
  emailInput.value = "";
  textareaInput.value = "";
});
