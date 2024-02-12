const tbody = document.querySelector("tbody");
const userSearch = document.querySelector("#user-search");
const form = document.querySelector(".form-sec");
const titleInput = document.querySelector("#title-input");
const priceInput = document.querySelector("#price");
const descInput = document.querySelector("#desc-input");
const photoInput = document.querySelector("#photo");
const option = document.querySelector("select");

let menu = [];

async function getAllData(endpoint) {
  const res = await axios(`${BASE_url}/${endpoint}`);
  console.log(res.data);
  product = res.data;
  drawTable(res.data);
}
getAllData("reservations");

function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
  <td>${element.checkIn.slice(0, 10)}</td>
  <td>${element.checkOut.slice(0, 10)}</td>
  <td>${element.rooms}</td>
  <td>${element.guests}</td>
  <td>
      <i class="fa-solid fa-trash" onclick=userDeletBtn("${
        element._id
      }",this)></i>
      <i class="fa-solid fa-pen-to-square" onclick=editBtn("${
        element._id
      }")></i>
    </td>
  `;
    tbody.append(trElement);
  });
}

// USER DATA DELETE

async function userDeletBtn(id, btn) {
  if (confirm("are you sure delete??")) {
    const res = await axios.delete(`${BASE_url}/rezervations/${id}`);
    if (res.status === 200) {
      btn.closest("tr").remove();
    }
  }
}

// USER-DATA-SEARCH

userSearch.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = product.filter((item) =>
    item.checkIn
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

// ADD NEW DATA

let editStatus = null;

async function editBtn(id) {
  editStatus = id;
  window.scrollTo(0, 0);
  const res = await axios(`${BASE_url}/menu/${id}`);

  titleInput.value = res.data.title;
  priceInput.value = res.data.price;
  descInput.value = res.data.desc;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let newObj = {
    title: titleInput.value,
    price: priceInput.value,
    desc: descInput.value,
    menuCategory: option.value,
    image: base64,
  };

  if (!editStatus) {
    if (
      titleInput.value &&
      photoInput.value &&
      descInput.value &&
      priceInput.value
    ) {
      try {
        const res = await axios.post(`${BASE_url}/menu`, newObj);
        drawTable(res.data.allProducts);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("!!!!!!");
    }
  } else {
    await axios.patch(`${BASE_url}/menu/${editStatus}`, newObj);
  }

  titleInput.value = "";
  descInput.value = "";
  priceInput.value = "";
});
