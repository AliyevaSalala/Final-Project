$(document).ready(function () {
  // Declare Carousel jquery object
  var owl = $(".owl-carousel");

  // Carousel initialization
  owl.owlCarousel({
    loop: false,
    margin: 0,
    navSpeed: 500,
    nav: true,
    autoplay: true,
    rewind: true,
    items: 1,
  });

  function setAnimation(_elem, _InOut) {
    var animationEndEvent =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

    _elem.each(function () {
      var $elem = $(this);
      var $animationType = "animated " + $elem.data("animation-" + _InOut);

      $elem.addClass($animationType).one(animationEndEvent, function () {
        $elem.removeClass($animationType);
      });
    });
  }

  owl.on("change.owl.carousel", function (event) {
    var $currentItem = $(".owl-item", owl).eq(event.item.index);
    var $elemsToanim = $currentItem.find("[data-animation-out]");
    setAnimation($elemsToanim, "out");
  });

  // Fired after current slide has been changed
  var round = 0;
  owl.on("changed.owl.carousel", function (event) {
    var $currentItem = $(".owl-item", owl).eq(event.item.index);
    var $elemsToanim = $currentItem.find("[data-animation-in]");

    setAnimation($elemsToanim, "in");
  });

  owl.on("translated.owl.carousel", function (event) {
    console.log(event.item.index, event.page.count);

    if (event.item.index == event.page.count - 1) {
      if (round < 1) {
        round++;
        console.log(round);
      } else {
        owl.trigger("stop.owl.autoplay");
        var owlData = owl.data("owl.carousel");
        owlData.settings.autoplay = false; //don't know if both are necessary
        owlData.options.autoplay = false;
        owl.trigger("refresh.owl.carousel");
      }
    }
  });
});

AOS.init();

const desSecBtn = document.querySelector(".desc-sec-btn");
const reviwSecBtn = document.querySelector(".review-sec-btn");
const reviewSec = document.querySelector(".review-sec");
const descBottom = document.querySelector(".desc-bottom");
const detailsSection = document.querySelector(".details-section");
const detailsPrice = document.querySelector(".price-box");

const id = new URLSearchParams(window.location.search).get("id");

reviwSecBtn.addEventListener("click", function () {
  reviewSec.style.display = "block";
  descBottom.style.display = "none";
  reviwSecBtn.classList.add("brown-color");
  desSecBtn.classList.remove("border-bottom");
});
desSecBtn.addEventListener("click", function () {
  reviewSec.style.display = "none";
  descBottom.style.display = "flex";
  desSecBtn.classList.add("border-bottom");
  reviwSecBtn.classList.remove("brown-color");
});

let login = localStorage.getItem("login");

async function getDetailsData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}/${id}`);
  // console.log(res.data);
  detailsSection.innerHTML = `
    <div class="texts">
    <img src="${res.data.image}" alt=""  class="hover-image"/>
      <div class="icons">
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
      <h1>${res.data.title}</h1>
    </div>
    <div class="details-img">
      <img src="${res.data.image}" alt="" />
    </div>
    `;
  detailsPrice.innerHTML = `
    <p>$ ${res.data.price}.0 <span>per Night</span></p>`;
}

getDetailsData("products");

const videoPlay = document.querySelector(".video-player");
const myVideo = document.querySelector("my-video");

function stopVideo() {
  videoPlay.style.display = "none";
}

// review section
const reviewForm = document.querySelector(".review-form");
const reviewTextArea = document.querySelector("#textarea");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");

async function submitReview(event) {
  event.preventDefault();

  const reviewText = reviewTextArea.value;
  const name = nameInput.value;
  const email = emailInput.value;

  try {
    if (!login) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to submit a review!",
        footer: '<a href="#">Why do I have this issue?</a>',
      }).then(() => {
        window.location.href = "login.html";
      });
      return;
    }
    if (!reviewText || !name || !email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return; // !!!!!
    }

    const res = await axios.post(`${DB_URL}/reviews/submit`, {
      reviewText,
      name,
      email,
    });
    Swal.fire({
      title: "Good job!",
      text: "YReview submitted successfully!",
      icon: "success",
    });
    reviewTextArea.value = "";
    nameInput.value = "";
    emailInput.value = "";
  } catch (error) {
    console.error(error);
    alert("Failed to submit review");
  }
}

reviewForm.addEventListener("submit", submitReview);

// CHECK AVAILABILITY

const checkForm = document.querySelector(".grid");
const checkInInput = document.querySelector("#check-in-input");
const checkOutInput = document.querySelector("#check-out-input");
const adult = document.querySelector("#adult");
const rooms = document.querySelector("#rooms");
const children = document.querySelector("#children");

let array = [];

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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This date is already reserved!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      } else {
        await axios.post(`${DB_URL}/reservations`, newObj);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reservation successful!",
          showConfirmButton: false,
          timer: 1500,
        });
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
