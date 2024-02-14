const commentTbdody = document.querySelector(".comment-tbody");
const userSearch = document.querySelector("#user-search");

const form = document.querySelector(".user-form");
const userNameInput = document.querySelector("#user-name");
const userEmailInput = document.querySelector("#user-email");
const textarea = document.querySelector("#textarea");

let array = [];

async function getUsersData(endpoint) {
  try {
    const res = await axios(`${BASE_url}/${endpoint}`);
    console.log(res.data);
    array = res.data;
    drawTable(res.data);
  } catch (error) {
    console.error(error);
  }
}
getUsersData("reviews");

function drawTable(data) {
  commentTbdody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td>${element.name}</td>
    <td>${element.email}</td>
    <td>${element.reviewText.slice(0, 10)}...</td>
    <td>
      <i class="fa-solid fa-trash" onclick=commentDeletBtn("${
        element._id
      }",this)></i>
    </td>`;
    commentTbdody.append(trElement);
  });
}

// USER DATA DELETE

async function commentDeletBtn(id, btn) {
  if (confirm("are you sure delete??")) {
    const res = await axios.delete(`${BASE_url}/reviews/${id}`);
    if (res.status === 200) {
      btn.closest("tr").remove();
    }
  }
}

// USER-DATA-SEARCH

userSearch.addEventListener("input", function (e) {
  e.preventDefault();

  let filtered = array.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

// ADD NEW DATA

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    name: userNameInput.value,
    email: userEmailInput.value,
    reviewText: textarea.value,
  };

  if (
    userNameInput.value !== "" &&
    userEmailInput.value !== "" &&
    textarea.value !== ""
  ) {
    const res = await axios.post(`${BASE_url}/reviews/submit`, obj);
    // drawTable(res.data);
    console.log(res);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Created successfully!!!",
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
  textarea.value = "";
});
