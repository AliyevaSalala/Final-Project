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

  // add animate.css class(es) to the elements to be animated
  function setAnimation(_elem, _InOut) {
    // Store all animationend event name in a string.
    // cf animate.css documentation
    var animationEndEvent =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

    _elem.each(function () {
      var $elem = $(this);
      var $animationType = "animated " + $elem.data("animation-" + _InOut);

      $elem.addClass($animationType).one(animationEndEvent, function () {
        $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
      });
    });
  }

  // Fired before current slide change
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
