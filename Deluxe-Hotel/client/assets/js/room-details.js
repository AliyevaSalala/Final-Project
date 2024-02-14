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
