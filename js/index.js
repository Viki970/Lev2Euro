// Активен линк при клик
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.navbar-nav .nav-link');

  links.forEach(link => {
    link.addEventListener('click', () => {
      // Премахваме "active" от всички
      links.forEach(l => {
        //close navbar slowly
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar && navbar.classList.contains('show')) {
          navbar.style.transition = 'opacity 0.5s ease';
          navbar.style.opacity = 0;
          setTimeout(() => {
            navbar.classList.remove('show');
            navbar.style.opacity = 1; // Reset opacity for next open
          }, 200);
        }
        l.classList.remove('active');
      });
      // Добавяме "active" само на текущия линк
      link.classList.add('active');
    });
  });
});
// Активен линк при клик

