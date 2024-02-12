const BASE_url = "http://localhost:8000";
const tbody = document.querySelector("tbody");
const userSearch = document.querySelector("#user-search");
const darkMode = document.querySelector(".dark-mode");
const moonMode = document.querySelector(".dark-mode-moon");
const body = document.querySelector("body");
const form = document.querySelector(".form-sec");
const titleInput = document.querySelector("#title-input");
const priceInput = document.querySelector("#price");
const descInput = document.querySelector("#desc-input");
const photoInput = document.querySelector("#photo");
const option = document.querySelector("select");

localStorage.getItem("dark-mode") === "true" && body.classList.add("dark-mode");

darkMode.addEventListener("click", function () {
  body.classList.add("dark-mode");

  localStorage.getItem("dark-mode") === "true"
    ? localStorage.setItem("dark-mode", false)
    : localStorage.setItem("dark-mode", true);
});
moonMode.addEventListener("click", function () {
  body.classList.remove("dark-mode");

  localStorage.getItem("dark-mode") === "true"
    ? localStorage.setItem("dark-mode", false)
    : localStorage.setItem("dark-mode", true);
});

let menu = [];

async function getAllData(endpoint) {
  const res = await axios(`${BASE_url}/${endpoint}`);
  console.log(res.data);
  product = res.data;
  drawTable(res.data);
}
getAllData("menu");

function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td>${element.title}</td>
    <td><img src="${element.image}" alt="" /></td>
    <td>${element.price}</td>
    <td>${element.desc.slice(0, 20)}...</td>
    <td>${element.menuCategory}</td>
    <td>
      <i class="fa-solid fa-trash" onclick=userDeletBtn("${
        element._id
      }",this)></i>
      <i class="fa-solid fa-pen-to-square" onclick=editBtn("${
        element._id
      }")></i>
    </td>`;
    tbody.append(trElement);
  });
}

// USER DATA DELETE

async function userDeletBtn(id, btn) {
  if (confirm("are you sure delete??")) {
    const res = await axios.delete(`${BASE_url}/menu/${id}`);
    if (res.status === 200) {
      btn.closest("tr").remove();
    }
  }
}

// USER-DATA-SEARCH

userSearch.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = product.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

// ADD NEW DATA

let editStatus = null;
let base64;

async function editBtn(id) {
  editStatus = id;
  window.scrollTo(0, 0);
  const res = await axios(`${BASE_url}/products/${id}`);

  titleInput.value = res.data.title;
  priceInput.value = res.data.price;
  descInput.value = res.data.desc;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let newObj = {
    room_type: typeInput.value,
    title: titleInput.value,
    price: priceInput.value,
    desc: descInput.value,
    image: base64,
  };

  if (!editStatus) {
    if (
      typeInput.value &&
      titleInput.value &&
      photoInput.value &&
      descInput.value &&
      priceInput.value
    ) {
      try {
        const res = await axios.post(`${BASE_url}/products`, newObj);
        // drawTable(res.data.allProducts);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("!!!!!!");
    }
  } else {
    await axios.patch(`${BASE_url}/products/${editStatus}`, newObj);
  }

  typeInput.valu = "";
  titleInput.value = "";
  descInput.value = "";
  priceInput.value = "";
});

photoInput.addEventListener("change", function (e) {
  console.log(e.target.files[0]);
  uploadImageUrl(e);
});

const uploadImageUrl = async (e) => {
  try {
    const file = e.target.files[0];
    base64 = await convertBase64(file);
    // console.log(base64);
  } catch (error) {
    console.log(error);
  }
};

const convertBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = () => {
      reject(error);
    };
  });
};
