const menuSection = document.querySelector(".menu-content");
const menuBtnCategoyr = document.querySelectorAll(".menu-btn");

menuBtnCategoyr.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".menu-btn.active").classList.remove("active");
    this.classList.add("active");
  })
);

let menus = [];

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

function addToFav(id, icon) {
  icon.className === "fa-regular fa-heart"
    ? (icon.className = "fa-solid fa-heart")
    : (icon.className = "fa-regular fa-heart");

  let favs = getItemToLocalStorage();

  let bool = favs.find((item) => item._id == id);

  let product = menus.find((item) => item._id === id);
  // console.log(product);
  if (bool) {
    favs = favs.filter((item) => item._id !== id);
  } else {
    favs.push(product);
  }

  setItemToLocalStorage(favs);

  // window.location.reload();
}

function setItemToLocalStorage(item) {
  localStorage.setItem("favorite", JSON.stringify(item));
}

function getItemToLocalStorage(item) {
  return JSON.parse(localStorage.getItem("favorite")) || [];
}
