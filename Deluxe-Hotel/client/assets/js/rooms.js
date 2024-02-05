const categoryBtn = document.querySelectorAll(".categorybtn");
const productSection = document.querySelector(".products-cards");
const loadMoreBtn = document.querySelector(".load-more-btn");

categoryBtn.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".categorybtn.active").classList.remove("active");
    this.classList.add("active");
  })
);

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

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  autoplay: true,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});

let limit = 3;
let array = [];
let productCopy = [];

async function getAllData(endpoint) {
  const res = await axios(`${BASE_URL}/${endpoint}`);
  // console.log(res.data);
  array = res.data;
  productCopy = structuredClone(array);
  // drawCards(res.data);
  drawCards(array.slice(0, limit));
  // let filtered = array.filter(
  //   (item) => item.room_type.toLocaleLowerCase() === "family"
  // );
  // drawCards(filtered);
}

getAllData("rooms");

function drawCards(data) {
  productSection.innerHTML = "";
  data.forEach((item) => {
    productSection.innerHTML += `  <div class="product-card">
    <img src="${item.image}" alt="rooms" />
    <button class="price">$${item.price}/Night</button>
    <div class="card-info">
      <a href="#"><h3>1 DOUBLE BED - 2 GUEST</h3></a>
      <a href="#"><h1>${item.room_type}</h1></a>
      <button>Select Options</button>
    </div>
    <div class="card-details">
      <div class="icons">
        <i class="fa-solid fa-bath"></i>
        <i class="fa-solid fa-bell-concierge"></i>
        <i class="fa-solid fa-tv"></i>
        <i class="fa-solid fa-camera"></i>
        <i class="fa-solid fa-utensils"></i>
      </div>
      <a href="room-details.html?id=${item.room_id}"> View Details</a>
    </div>
  </div>
    
    `;
  });
}

// let typeName = "family";
loadMoreBtn.addEventListener("click", function () {
  limit += 3;
  drawCards(array.slice(0, limit));
});

// categoryBtn.forEach((room) => {
//   room.addEventListener("click", function () {
//     typeName = this.innerText;
//     let filtered = array.filter((item) => (item.room_type = typeName));
//     drawCards(filtered);
//   });
// });
