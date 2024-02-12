const favsSection = document.querySelector(".favs-cards");

let favsProducts = getItemToLocalStorage();

function drawCards(data) {
  favsSection.innerHTML = "";
  data.forEach((element) => {
    favsSection.innerHTML += `
    <div class="fav-card">
    <img src="${element.image}" alt="product-img" />
    <i class="fa-solid fa-heart" onclick=removeFav("${element._id}",this)></i>
    <div class="info">
      <h1>${element.title}</h1>
      <p>${element.desc}</p>
      <h5>$ ${element.price}.00</h5>
    </div>
  </div>
    `;
  });
}

drawCards(favsProducts);

function removeFav(id, btn) {
  favsProducts = favsProducts.filter((item) => item.id !== id);

  btn.closest(".fav-card").remove();

  setItemToLocalStorage(favsProducts);
}

function setItemToLocalStorage(data) {
  localStorage.setItem("favorite", JSON.stringify(data));
}

function getItemToLocalStorage() {
  return JSON.parse(localStorage.getItem("favorite")) || [];
}
