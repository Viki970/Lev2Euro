document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll('.timeline-row');

  const observerOptions = {
    threshold: 0.1 // колко част от елемента трябва да се вижда (10%)
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  rows.forEach(row => observer.observe(row));
});
