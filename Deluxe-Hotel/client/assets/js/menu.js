const menuSection = document.querySelector(".menu-content");

async function getAlData(endpoint) {
  const res = await axios(`${BASE_URL}/menu`);
  console.log(res.data);
  // drawMenu(res.data);
}

getAlData();

function drawMenu(data) {
  menuSection.innerHTML = "";
  data.forEach((element) => {
    menuSection.innerHTML += `
    <div class="item-menu">
    <div class="item-right">
      <img
        src="${element.image}"
        alt="duruthemes"
      />
      <div class="texts">
        <h3>${element.name}</h3>
        <h6>${element.category}</h6>
        <p>${element.desc}</p>
      </div>
    </div>
    <div class="item-left">
      <div class="basket">
        <p>$${element.price}.0</p>
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
  </div>
    `;
  });
}
