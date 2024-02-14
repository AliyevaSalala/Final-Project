const tbody = document.querySelector("tbody");
const userSearch = document.querySelector("#user-search");
const form = document.querySelector(".form-sec");
const checkIn = document.querySelector("#check-in");
const checkOut = document.querySelector("#check-out");
const rooms = document.querySelector("#rooms");
const adults = document.querySelector("#adults");
const children = document.querySelector("#children");

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
  <td>${element.children}</td>
  <td>${element.adult}</td>
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
    const res = await axios.delete(`${BASE_url}/reservations/${id}`);
    if (res.status === 200) {
      btn.closest("tr").remove();
    }
  }
}

// reserv-DATA-SEARCH

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
  // console.log(editStatus);
  window.scrollTo(0, 0);
  try {
    const res = await axios(`${BASE_url}/reservations/${id}`);
    // console.log(res.data);
    if (res && res.data) {
      checkIn.value = res.data.checkIn;
      checkOut.value = res.data.checkOut;
      rooms.value = res.data.rooms;
      adults.value = res.data.adult;
      children.value = res.data.children;
    } else {
      console.log("Invalid response data:", res);
    }
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let newObj = {
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    rooms: rooms.value,
    adult: adults.value,
    children: children.value,
  };

  if (!editStatus) {
    if (checkIn.value && checkOut.value && rooms.value && adults.value) {
      try {
        const res = await axios.post(`${BASE_url}/reservations`, newObj);
        // drawTable(res.data.allProducts);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reservation successful!!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
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
    await axios.patch(`${BASE_url}/reservations/${editStatus}`, newObj);
  }

  checkIn.value = "";
  checkOut.value = "";
  rooms.value = "";
  adults.value = "";
  children.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  checkIn.setAttribute("min", today);
  checkOut.setAttribute("min", today);
});
