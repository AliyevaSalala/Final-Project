const userTbdody = document.querySelector(".user-tbody");
const userSearch = document.querySelector("#user-search");

const form = document.querySelector(".user-form");
const userNameInput = document.querySelector("#user-name");
const userEmailInput = document.querySelector("#user-email");
const password = document.querySelector("#password");

let users = [];

async function getUsersData(endpoint) {
  try {
    const res = await axios(`${BASE_url}/${endpoint}`);
    users = res.data;
    userData(res.data);
    console.log(users);
  } catch (error) {
    console.error(error);
  }
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
      <i class="fa-solid fa-user-pen" onclick="changeUserRole('${
        element._id
      }', ${!element.isAdmin})"></i>
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

// USER-DATA-SEARCH

userSearch.addEventListener("input", function (e) {
  e.preventDefault();

  let filtered = users.filter((item) =>
    item.username
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  userData(filtered);
});

// ADD NEW DATA

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
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "new user created successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all fields..",
    });
  }

  userNameInput.value = "";
  userEmailInput.value = "";
  password.value = "";
});

// Change user role

async function changeUserRole(id, newRole) {
  try {
    const res = await axios.patch(`${BASE_url}/users/${id}`, {
      isAdmin: newRole,
    });
    if (res.status === 200) {
      getUsersData("users");
    }
  } catch (error) {
    console.error("Error while changing user role:", error);
  }
}
