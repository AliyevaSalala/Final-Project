const tBody = document.querySelector("tbody");

const totalPriceCount = document.querySelector(".total-price");
const subTotalprice = document.querySelector(".subtotal-price");
const basketSearch = document.querySelector("#basket-search");

// const basketCounter = document.querySelector(".basket-counter");

// let basket = getItemLocalStorage();
// basketCalculate();

let array = [];
let productCopy = [];

async function getAllData(endpoint) {
  const res = await axios(`${DB_URL}/${endpoint}`);
  // console.log(res.data);
  array = res.data;
  productCopy = structuredClone(array);
}

getAllData("products");

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td><img src="${element.image}" /></td>
    <td>
      <div class="texts">
        <h3>${element.title}- 2 Adults, 1 Children</h3>
        <p>Check In:</p>
        <h4>February 9, 2024</h4>
        <p>Check out:</p>
        <h4>February 15, 2024</h4>
      </div>
    </td>
    <td><p>$${element.price}.00</p></td>
    <td>
      <div class="btn">
        <button onclick=incBtn("${element._id}")>+</button> <span>${element.count}</span> <button onclick=decBtn("${element._id}",this)>-</button>
      </div>
    </td>
    <td><p>$${element.price}.00</p></td>
    <td>
      <div class="icon">
        <i class="fa-solid fa-x" onclick=deleteBtn("${element._id}",this)></i>
      </div>
    </td>
      `;
    tBody.append(trElement);
  });
}

drawTable(basket);

function deleteBtn(id, btn) {
  basket = basket.filter((item) => item._id !== id);

  btn.closest("tr").remove();
  totalPrice();
  subTotalPrice();
  basketCalculate();

  setItemLocalStorage(basket);
}

function incBtn(id) {
  let increment = basket.find((item) => item._id === id);
  increment.count += 1;

  drawTable(basket);
  totalPrice();
  subTotalPrice();
  basketCalculate();

  setItemLocalStorage(basket);
}

function decBtn(id, btn) {
  let decrement = basket.find((item) => item._id === id);

  if (decrement.count > 1) {
    decrement.count -= 1;
  } else {
    basket = basket.filter((item) => item._id !== id);
    btn.closest("tr").remove();
  }

  drawTable(basket);
  totalPrice();
  subTotalPrice();
  basketCalculate();

  setItemLocalStorage(basket);
}

function totalPrice() {
  totalPriceCount.textContent = basket.reduce(
    (acc, curr) => acc + curr.count * curr.price,
    0
  );
}

totalPrice();
function subTotalPrice() {
  subTotalprice.textContent = basket.reduce(
    (acc, curr) => acc + curr.count * curr.price,
    0
  );
}

subTotalPrice();


// BASKET-SEARCH

basketSearch.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = basket.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});
