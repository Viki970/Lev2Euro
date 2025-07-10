document.querySelectorAll(".animated-details").forEach(details => {
  const summary = details.querySelector("summary");
  const content = details.querySelector(".content");

  content.style.maxHeight = "0px";
  content.style.overflow = "hidden";
  content.style.transition = "max-height 0.5s ease";

  summary.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default toggle

    const isOpen = details.hasAttribute("open");
    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px"; // set to current height
      requestAnimationFrame(() => {
        content.style.maxHeight = "0px";
      });
      setTimeout(() => details.removeAttribute("open"), 300);
    } else {
      details.setAttribute("open", "");
      content.style.maxHeight = "0px";
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      });
    }
  });
});
