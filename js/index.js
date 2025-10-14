(function () {
  function $(id) {
    return document.getElementById(id);
  }

  var card = $("card"),
    openB = $("open"),
    closeB = $("close"),
    timer = null,
    pages = document.querySelectorAll(".page"),
    currentPage = 0;

  // 🎵 Create audio element
  var birthdaySong = new Audio("happy-birthday-357371.mp3");
  birthdaySong.preload = "auto";
  birthdaySong.loop = true; // optional: repeat while card is open

  // Open card
  openB.addEventListener("click", function () {
    card.setAttribute("class", "open-half");

    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute("class", "open-fully");
      timer = null;

      // 🎶 Play song when card fully opens
      birthdaySong.currentTime = 0;
      birthdaySong.play().catch((e) => {
        console.warn("Autoplay blocked:", e);
      });
    }, 1000);
  });

  // Close card
  closeB.addEventListener("click", function () {
    card.setAttribute("class", "close-half");

    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute("class", "");
      timer = null;

      // 🔇 Stop song when card closes
      birthdaySong.pause();
      birthdaySong.currentTime = 0;

      // Reset to first page
      pages.forEach((page) => page.classList.remove("active"));
      pages[0].classList.add("active");
      currentPage = 0;
    }, 1000);
  });

  // Next page functionality
  document.querySelectorAll(".next-page").forEach((button) => {
    button.addEventListener("click", function () {
      pages[currentPage].classList.remove("active");

      currentPage = (currentPage + 1) % pages.length;
      pages[currentPage].classList.add("active");

      if (currentPage === pages.length - 1) {
        closeB.style.display = "inline";
      }
    });
  });
})();
