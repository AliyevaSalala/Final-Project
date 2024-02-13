const tbody = document.querySelector("tbody");
const userSearch = document.querySelector("#user-search");

const form = document.querySelector(".form-sec");
const typeInput = document.querySelector("#type-input");
const titleInput = document.querySelector("#title");
const priceInput = document.querySelector("#price");
const descInput = document.querySelector("#desc");
const photoInput = document.querySelector("#photo");
const sortBtn = document.querySelector(".sort-btn");

let product = [];
let productCopy = [];

async function getUsersData(endpoint) {
  const res = await axios(`${BASE_url}/${endpoint}`);
  console.log(res.data);
  product = res.data;
  productCopy = structuredClone(product);
  drawTable(res.data);
}
getUsersData("products");

function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td>${element.room_type}</td>
    <td>${element.title}</td>
    <td>${element.price}</td>
    <td>${element.desc.slice(0, 20)}...</td>
    <td><img src="${element.image}" alt="" /></td>
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
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${BASE_url}/products/${id}`);
          if (res.status === 200) {
            btn.closest("tr").remove();
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
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

  typeInput.value = res.data.room_type;
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
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields..",
      });
    }
  } else {
    await axios.patch(`${BASE_url}/products/${editStatus}`, newObj);
  }

  typeInput.value = "";
  titleInput.value = "";
  descInput.value = "";
  priceInput.value = "";
  photoInput.value = "";
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

// SORT-BTN

sortBtn.addEventListener("click", function () {
  let sorted;
  if (sortBtn.innerText === "Ascending") {
    sortBtn.innerText = "Descending";
    sorted = product.sort((a, b) => a.price - b.price);
  } else if (sortBtn.innerText === "Descending") {
    sortBtn.innerText = "Deafult";
    sorted = product.sort((a, b) => b.price - a.price);
  } else {
    sortBtn.innerText = "Ascending";
    sorted = productCopy;
  }
  drawTable(sorted);
});
