
AOS.init();
const menuSection = document.querySelector(".menu-content");
const menuBtnCategoyr = document.querySelectorAll(".menu-btn");

menuBtnCategoyr.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".menu-btn.active").classList.remove("active");
    this.classList.add("active");
  })
);

let menus = [];
let favsProducts = getItemToLocalStorage();
// let favorites = getFavoritesFromLocaleStorages();
let login = localStorage.getItem("login");

async function getData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}`);
  menus = res.data;
  let filtered = menus.filter(
    (item) => item.menuCategory.toLocaleLowerCase() === "starters"
  );
  drawMenu(filtered);
}

getData("menu");

function drawMenu(data) {
  console.log(favsProducts);
  menuSection.innerHTML = "";
  data.forEach((element) => {
    menuSection.innerHTML += `
    <div class="item-menu">
                <img
                  src="${element.image}"
                  alt="duruthemes"
                  class="hover-image"
                />
                <div class="item-right">
                  <img
                    src="${element.image}"
                    alt="duruthemes"
                  />
                  <div class="texts">
                    <h3>${element.title}</h3>
                    <p>${element.desc.slice(0, 40)}..</p>
                  </div>
                </div>
                <div class="item-left">
                  <div class="item-left">
                    <div class="basket">
                      <p>$ ${element.price}</p>
                      <i class="${
                        favsProducts.some((item) => item._id === element._id)
                          ? "fa-solid fa-heart"
                          : "fa-regular fa-heart"
                      }" onclick=addToFav("${element._id}",this)></i>
                    </div>
                  </div>
                </div>
              </div>
    `;
  });
}

// function drawMenu(data) {
//   menuSection.innerHTML = "";

//   data.forEach((element) => {
//     const productCardElement = document.createElement("div");
//     productCardElement.className = "item-menu";
//     const productImageElement = document.createElement("img");
//     productImageElement.src = element.image;
//     const productTitleDivElement = document.createElement("div");

//     productTitleDivElement.className = "item-right";
//     const productImageElement2 = document.createElement("img");
//     productImageElement2.src = element.image;

//     const textElement = document.createElement("div");
//     textElement.className = "texts";
//     const productTitleElement = document.createElement("h3");
//     productTitleElement.textContent = element.title;
//     const productDescriptionElement = document.createElement("p");
//     productDescriptionElement.textContent = element.desc;

//     const itemLeftElem = document.createElement("div");
//     itemLeftElem.className = "item-left";
//     const itemleftelem2 = document.createElement("div");
//     itemleftelem2.className = "item-left";
//     const productPriceElement = document.createElement("p");
//     productPriceElement.textContent = element.price;
//     const favIconElement = document.createElement("i");

//     const bool = favorites.find((item) => item.id === element._id);

//     favIconElement.className = !bool
//       ? "fa-regular fa-heart"
//       : "fa-solid fa-heart";
//     console.log(element);

//     favIconElement.addEventListener("click", function () {
//       this.className === "fa-regular fa-heart"
//         ? (this.className = "fa-solid fa-heart")
//         : (this.className = "fa-regular fa-heart");

//       console.log(element);

//       let favoriteProducts = getFavoritesFromLocaleStorages();

//       const favIndex = favoriteProducts.findIndex(
//         (item) => item.id === element._id
//       );

//       if (favIndex === -1) {
//         favoriteProducts.push(element);
//       } else {
//         favoriteProducts.splice(favIndex, 1);
//       }

//       setProductToLocaleStorage(favoriteProducts);
//     });

//     productTitleDivElement.append(productImageElement2, textElement);
//     textElement.append(productTitleElement, productDescriptionElement);
//     itemleftelem2.append(productPriceElement, favIconElement);
//     itemLeftElem.append(itemleftelem2);
//     productCardElement.append(productImageElement, textElement, itemleftelem2);
//     menuSection.append(productCardElement);
//   });
// }

// function setProductToLocaleStorage(products) {
//   localStorage.setItem("favs", JSON.stringify(products));
// }

// function getFavoritesFromLocaleStorages() {
//   return JSON.parse(localStorage.getItem("favs")) ?? [];
// }
let categoryName = "starters";

menuBtnCategoyr.forEach((item) => {
  item.addEventListener("click", function () {
    categoryName = this.textContent;
    let filtered = menus.filter(
      (item) =>
        item.menuCategory.toLocaleLowerCase() ===
        categoryName.toLocaleLowerCase()
    );

    drawMenu(filtered);
    // console.log(filtered);
    console.log(this);
  });
});

// ADD TO-FAVORITE

function addToFav(id, icon) {
  if (login === "true") {
    if (icon.classList.contains("fa-regular")) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }

    let favs = getItemToLocalStorage();

    let bool = favs.find((item) => item._id === id);

    let product = menus.find((item) => item._id === id);

    if (bool) {
      favs = favs.filter((item) => item._id !== id);
    } else {
      favs.push(product);
    }

    setItemToLocalStorage(favs);
  } else {
    window.location = "login.html";
  }
}

function setItemToLocalStorage(data) {
  localStorage.setItem("favorite", JSON.stringify(data));
}

function getItemToLocalStorage() {
  return JSON.parse(localStorage.getItem("favorite")) || [];
}
