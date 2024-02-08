const tBody = document.querySelector("tbody");

const totalPriceCount = document.querySelector(".total-price");

let basket = getItemLocalStorage();

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
        <button>+</button> <span>1</span> <button>-</button>
      </div>
    </td>
    <td><p>$${element.price}.00</p></td>
    <td>
      <div class="icon">
        <i class="fa-solid fa-x"></i>
      </div>
    </td>
      `;
    tBody.append(trElement);
  });
}

drawTable(basket);

function setItemLocalStorage(item) {
  localStorage.setItem("product", JSON.stringify(item));
}

function getItemLocalStorage() {
  return JSON.parse(localStorage.getItem("product")) || [];
}
