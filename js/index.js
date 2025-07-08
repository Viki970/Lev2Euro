// Активен линк при клик
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.navbar-nav .nav-link');

  links.forEach(link => {
    link.addEventListener('click', () => {
      // Премахваме "active" от всички
      links.forEach(l => l.classList.remove('active'));
      // Добавяме "active" само на текущия линк
      link.classList.add('active');
    });
  });
});
// Активен линк при клик

