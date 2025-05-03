(function () {
  function $(id) {
    return document.getElementById(id);
  }

  var card = $("card"),
    openB = $("open"),
    closeB = $("close"),
    timer = null;
  (pages = document.querySelectorAll(".page")), (currentPage = 0);

  // Open card function (same as before)
  openB.addEventListener("click", function () {
    card.setAttribute("class", "open-half");
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute("class", "open-fully");
      timer = null;
    }, 1000);
  });

  // Close card function (same as before)
  closeB.addEventListener("click", function () {
    card.setAttribute("class", "close-half");
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute("class", "");
      timer = null;
      // Reset to first page when closing
      pages.forEach((page) => page.classList.remove("active"));
      pages[0].classList.add("active");
      currentPage = 0;
    }, 1000);
  });

  // Next page functionality
  document.querySelectorAll(".next-page").forEach((button) => {
    button.addEventListener("click", function () {
      // Hide current page
      pages[currentPage].classList.remove("active");

      // Show next page
      currentPage = (currentPage + 1) % pages.length;
      pages[currentPage].classList.add("active");

      // Special animation for last page
      if (currentPage === pages.length - 1) {
        // Show close button on last page
        closeB.style.display = "inline";
      }
    });
  });
})();
