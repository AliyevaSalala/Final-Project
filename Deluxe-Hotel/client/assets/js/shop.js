const categoryBtn = document.querySelectorAll(".categorybtn");
const productSection = document.querySelector(".product-cards");
const loadMoreBtn = document.querySelector(".load-more-btn");
const inputSearch = document.querySelector("#search");
const sortBtn = document.querySelector(".sort-btn");

categoryBtn.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".categorybtn.active").classList.remove("active");
    this.classList.add("active");
  })
);

let limit = 3;
let array = [];
let productCopy = [];

async function getAllData(endpoint) {
  const res = await axios(`${BASE_URL}/${endpoint}`);
  //   console.log(res.data);
  array = res.data;
  productCopy = structuredClone(array);
  //   drawCards(res.data);
  //   drawCards(array.slice(0, limit));
  let filtered = array.filter(
    (item) => item.room_type.toLocaleLowerCase() === "deluxe"
  );
  drawCards(filtered);
}

getAllData("rooms");

function drawCards(data) {
  productSection.innerHTML = "";
  data.forEach((item) => {
    productSection.innerHTML += `
    <div class="product-card">
                <img src="${item.image}" alt="" />
                <div class="card-body">
                  <h1>${item.title}</h1>
                  <div class="icons">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                  <p>
                    ${item.desc}
                  </p>
                  <p class="price">$${item.price}.0</p>
                  <a href="#">Book</a>
                </div>
              </div>


  `;
  });
}

let typeName = "deluxe";
// loadMoreBtn.addEventListener("click", function () {
//   limit += 3;
//   drawCards(array.slice(0, limit));
// });

categoryBtn.forEach((room) => {
  room.addEventListener("click", function () {
    typeName = this.innerText;
    let filtered = array.filter((item) => item.room_type === typeName);
    drawCards(filtered);
  });
});

inputSearch.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = array.filter((room) =>
    room.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawCards(filtered);
});
