const commentCounter = document.querySelector(".comment-counter");
const reservCounter = document.querySelector(".reserv-counter");
const menuCounter = document.querySelector(".menu-counter");
const productCounter = document.querySelector(".product-counter");
const userCounter = document.querySelector(".user-counter");

async function updateCounters() {
  try {
    const res = await axios(`${BASE_url}/reviews`);
    const comments = res.data;
    commentCounter.textContent = comments.length;

    const reservations = await axios(`${BASE_url}/reservations`);
    const reservationsData = reservations.data;
    reservCounter.textContent = reservationsData.length;

    const product = await axios(`${BASE_url}/products`);
    const productsData = product.data;
    // console.log(product.data);
    productCounter.textContent = productsData.length;

    const menu = await axios(`${BASE_url}/menu`);
    const menuData = menu.data;
    menuCounter.textContent = menuData.length;

    const user = await axios(`${BASE_url}/users`);
    // console.log(user.data);
    const userData = user.data;
    userCounter.textContent = userData.length;
  } catch (error) {
    console.error(error);
  }
}

updateCounters();
