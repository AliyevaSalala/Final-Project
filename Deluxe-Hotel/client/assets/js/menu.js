const menuSection = document.querySelector(".menu-content");
const menuBtnCategoyr = document.querySelectorAll(".menu-btn");

// menuBtnCategoyr.forEach((item) =>
//   item.addEventListener("click", function () {
//     document.querySelector(".menu-btn.active").classList.remove("active");
//     this.classList.add("active");
//   })
// );

let menus = [];

async function getData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}`);
  // console.log(res.data);
  // drawMenu(res.data);
  menus = res.data;
  let filtered = menus.filter((item) => item.menuCategory === "starters");
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
                      <i class="fa-regular fa-heart"></i>
                    </div>
                  </div>
                </div>
              </div>
    `;
  });
}

let categoryName = "starters";

// menuBtnCategoyr.forEach((item) => {
//   item.addEventListener("click", function () {
//     categoryName = this.innerText;
//     let filtered = menus.filter((item) => item.menuCategory === categoryName);

//     drawMenu(filtered);
//   });
// });
