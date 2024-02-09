const menuSection = document.querySelector(".menu-content");

async function getData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}`);
  console.log(res.data);
  drawMenu(res.data);
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
                      <i class="fa-solid fa-cart-shopping"></i>
                    </div>
                  </div>
                </div>
              </div>
    `;
  });
}
