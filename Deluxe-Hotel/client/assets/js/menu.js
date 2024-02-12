const menuSection = document.querySelector(".menu-content");
const menuBtnCategoyr = document.querySelectorAll(".menu-btn");

menuBtnCategoyr.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".menu-btn.active").classList.remove("active");
    this.classList.add("active");
  })
);

let menus = [];
let login = localStorage.getItem("login");

async function getData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}`);
  // console.log(res.data);
  // drawMenu(res.data);
  menus = res.data;
  let filtered = menus.filter(
    (item) => item.menuCategory.toLocaleLowerCase() === "starters"
  );
  drawMenu(filtered);
  // console.log(menus);
}

getData("menu");

function drawMenu(data) {
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
                    <p>${element.desc}</p>
                  </div>
                </div>
                <div class="item-left">
                  <div class="item-left">
                    <div class="basket">
                      <p>$72.6</p>
                      <i class="${
                        favsProducts.some((item) => item.id === element._id)
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
let favsProducts = getItemToLocalStorage();

// function initializeFavorites() {
//   const favIcons = document.querySelectorAll(".favorite-icon");
//   favIcons.forEach((icon) => {
//     const id = icon.getAttribute("data-id");
//     if (favsProducts.some((item) => item.id === id)) {
//       icon.classList.add("fa-solid");
//     } else {
//       icon.classList.remove("fa-solid");
//     }
//   });
// }

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

    let bool = favs.find((item) => item._id == id);

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

// initializeFavorites();
