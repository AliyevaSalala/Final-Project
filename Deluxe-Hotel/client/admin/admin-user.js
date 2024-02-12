const userTbdody = document.querySelector(".user-tbody");
const userSearch = document.querySelector("#user-search");

const form = document.querySelector(".user-form");
const userNameInput = document.querySelector("#user-name");
const userEmailInput = document.querySelector("#user-email");
const password = document.querySelector("#password");

let user = [];

async function getUsersData(endpoint) {
  const res = await axios(`${BASE_url}/${endpoint}`);
  console.log(res.data);
  user = res.data;
  userData(res.data);
}
getUsersData("users");

function userData(data) {
  userTbdody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td>${element.username}</td>
    <td>${element.email}</td>
    <td>${element.isAdmin ? "Admin" : "User"}</td>
    <td>
      <i class="fa-solid fa-trash" onclick=userDeletBtn("${
        element._id
      }",this)></i>
    </td>`;
    userTbdody.append(trElement);
  });
}

// USER DATA DELETE

async function userDeletBtn(id, btn) {
  if (confirm("are you sure delete??")) {
    const res = await axios.delete(`${BASE_url}/users/${id}`);
    if (res.status === 200) {
      btn.closest("tr").remove();
    }
  }
}

// Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, delete it!",
// }).then((result) => {
//   console.log("gh");
//   if (result.isConfirmed) {
//     Swal.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success",
//     });
//   }
// });

// USER-DATA-SEARCH

userSearch.addEventListener("input", function (e) {
  e.preventDefault();

  let filtered = user.filter((item) =>
    item.username
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  userData(filtered);
});

// ADD NEW DATA

// let editId = null;

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    username: userNameInput.value,
    email: userEmailInput.value,
    password: password.value,
  };

  if (
    userNameInput.value !== "" &&
    userEmailInput.value !== "" &&
    password.value !== ""
  ) {
    const res = await axios.post(`${BASE_url}/users`, obj);
    userData(res.data.allProducts);
    console.log(res);
  } else {
    alert("!!!!!!!!");
  }

  userNameInput.value = "";
  userEmailInput.value = "";
  password.value = "";
});
