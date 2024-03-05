AOS.init();

document.querySelectorAll(".blog-card").forEach(function (card) {
  const link = card.querySelector("#read-more-link");
  const arrowUpButtons = card.querySelectorAll(".fa-arrow-up");
  const fullText = card.querySelector(".full-text");

  // Düğmeleri gizle
  arrowUpButtons.forEach(function (button) {
    button.style.display = "none";
  });

  link.addEventListener("click", function (event) {
    event.preventDefault();
    const shortText = this.parentNode.querySelector(".short-text");

    shortText.style.display = "none";
    fullText.style.display = "block";
    link.style.opacity = "0";

    // Arrow up düğmelerini göster
    arrowUpButtons.forEach(function (button) {
      button.style.display = "block";
    });
  });

  arrowUpButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const shortText = card.querySelector(".short-text");

      shortText.style.display = "block";
      fullText.style.display = "none";
      link.style.opacity = "1";

      // Arrow up düğmelerini gizle
      arrowUpButtons.forEach(function (button) {
        button.style.display = "none";
      });
    });
  });
});
