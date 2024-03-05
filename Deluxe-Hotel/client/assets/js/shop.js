AOS.init();

const categoryBtn = document.querySelectorAll(".categorybtn");
const productSection = document.querySelector(".product-cards");
const loadMoreBtn = document.querySelector(".load-more-btn");
const inputSearch = document.querySelector("#search");
const sortBtn = document.querySelector(".sort-btn");
// const basketCounter = document.querySelector(".basket-counter");

categoryBtn.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".categorybtn.active").classList.remove("active");
    this.classList.add("active");
  })
);

// let base64;

let limit = 3;
let array = [];
let productCopy = [];
let login = localStorage.getItem("login");
// let favsProducts = getItemToLocalStorage();

async function getAllData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}`);
  console.log(res.data);
  array = res.data;
  productCopy = structuredClone(array);
  let filtered = array.filter(
    (item) => item.room_type.toLocaleLowerCase() === "deluxe"
  );
  drawCards(filtered);
}

getAllData("products");

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
                  <div class="body-bottom">
                  <a href="room-details.html?id=${item._id}">Book</a>
                  <i class="fa-solid fa-cart-shopping" onclick=addToBasket("${item._id}")></i>
                  </div>
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

// categoryBtn.forEach((room) => {
//   room.addEventListener("click", function () {
//     typeName = this.innerText;
//     let filtered = array.filter((item) => item.room_type === typeName);
//     drawCards(filtered);
//   });
// });

categoryBtn.forEach((room) => {
  room.addEventListener("click", function () {
    typeName = this.innerText.toLocaleLowerCase();
    let filtered;
    if (
      typeName === "deluxe" ||
      typeName === "king" ||
      typeName === "queen" ||
      typeName === "suit" ||
      typeName === "standart"
    ) {
      filtered = array.filter(
        (item) => item.room_type.toLocaleLowerCase() === typeName
      );
    } else {
      filtered = array;
    }
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

// SORT
sortBtn.addEventListener("click", function () {
  let sorted;
  if (sortBtn.innerText === "Low to High") {
    sortBtn.innerText = "High to Low";
    sorted = array
      .filter((item) => item.room_type.toLowerCase() === typeName)
      .sort((a, b) => a.price - b.price);
  } else if (sortBtn.innerText === "High to Low") {
    sortBtn.innerText = "Default";
    sorted = array
      .filter((item) => item.room_type.toLowerCase() === typeName)
      .sort((a, b) => b.price - a.price);
  } else {
    sortBtn.innerText = "Low to High";
    sorted = productCopy.filter(
      (item) => item.room_type.toLowerCase() === typeName
    );
  }
  drawCards(sorted);
});

// sortBtn.addEventListener("click", function () {
//   let sorted;
//   if (sortBtn.innerText === "Low to High") {
//     sortBtn.innerText = "High to Low";
//     sorted = array.sort((a, b) => a.price - b.price);
//   } else if (sortBtn.innerText === "High to Low") {
//     sortBtn.innerText = "Deafult";
//     sorted = array.sort((a, b) => b.price - a.price);
//   } else {
//     sortBtn.innerText = "Low to High";
//     sorted = productCopy;
//   }
//   drawCards(sorted);
// });

// ADD-TO-BASKET

function addToBasket(id) {
  if (login === "true") {
    let basketProduct = array.find((item) => item._id === id);

    let index = basket.findIndex((item) => item._id === id);

    if (index > -1) {
      basket[index].count = basket[index].count + 1;
    } else {
      basket.push({ count: 1, ...basketProduct });
    }

    setItemLocalStorage(basket);
    basketCalculate();
  } else {
    window.location = "login.html";
  }
}

// function addToFav(id, icon) {
//   if (login === "true") {
//     if (icon.classList.contains("fa-regular")) {
//       icon.classList.remove("fa-regular");
//       icon.classList.add("fa-solid");
//     } else {
//       icon.classList.remove("fa-solid");
//       icon.classList.add("fa-regular");
//     }

//     let favs = getItemToLocalStorage();

//     let bool = favs.find((item) => item._id == id);

//     let product = array.find((item) => item._id === id);

//     if (bool) {
//       favs = favs.filter((item) => item._id !== id);
//     } else {
//       favs.push(product);
//     }

//     setItemToLocalStorage(favs);
//   } else {
//     window.location = "login.html";
//   }
// }

// function setItemToLocalStorage(data) {
//   localStorage.setItem("favs", JSON.stringify(data));
// }

// function getItemToLocalStorage() {
//   return JSON.parse(localStorage.getItem("favs")) || [];
// }
