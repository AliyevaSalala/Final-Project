const BASE_url = "http://localhost:8000";
const userTbdody = document.querySelector(".user-tbody");
const userSearch = document.querySelector("#user-search");
const darkMode = document.querySelector(".dark-mode");
const moonMode = document.querySelector(".dark-mode-moon");
const body = document.querySelector("body");

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

let user = [];

async function getUsersData(endpoint) {
  const res = await axios(`${BASE_url}/${endpoint}`);
  //   console.log(res.data);
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
    <td>
      <i class="fa-solid fa-trash" onclick=userDeletBtn("${element._id}",this)></i>
      <i class="fa-solid fa-pen-to-square"></i>
    </td>`;
    userTbdody.append(trElement);
  });
}

// USER DATA DELETE

async function userDeletBtn(id, btn) {
  if (confirm("are you sure delete??")) {
    await axios.delete(`${BASE_url}/users/${id}`);
    if (res.status === 200) {
      btn.closest("tr").remove();
    }
  }
}

// async function userDeletBtn(id, btn) {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "Deleted!",
//         text: "Your file has been deleted.",
//         icon: "success",
//       });
//     }
//   });
// }

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
