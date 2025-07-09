document.querySelectorAll(".animated-details").forEach(details => {
  const summary = details.querySelector("summary");
  const content = details.querySelector(".content");

  summary.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default toggle

    const isOpen = details.hasAttribute("open");

    // Затваряне на всички останали отворени <details>
    document.querySelectorAll(".animated-details[open]").forEach(openDetails => {
      if (openDetails !== details) {
        const openContent = openDetails.querySelector(".content");
        openContent.style.maxHeight = openContent.scrollHeight + "px";
        requestAnimationFrame(() => {
          openContent.style.maxHeight = "0px";
        });
        setTimeout(() => {
          openDetails.removeAttribute("open");
        }, 500); // време за анимация
      }
    });

    if (isOpen) {
      // Затваряне на текущото
      content.style.maxHeight = content.scrollHeight + "px";
      requestAnimationFrame(() => {
        content.style.maxHeight = "0px";
      });
      setTimeout(() => {
        details.removeAttribute("open");
      }, 500);
    } else {
      // Отваряне на текущото
      details.setAttribute("open", "");
      content.style.maxHeight = "0px";
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      });
    }
  });
});
