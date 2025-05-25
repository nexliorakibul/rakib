// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navLinks = document.querySelectorAll('.nav__link'),
    themeButton = document.getElementById('theme-button');

  // Show/Hide mobile menu
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
  });

  // Remove mobile menu when link clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });

  // Scroll active link highlighting
  const sections = document.querySelectorAll('section[id]');

  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 60,
        sectionId = current.getAttribute('id'),
        navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', scrollActive);

  // Dark / Light theme toggle
  const darkThemeClass = 'dark';
  const iconMoon = 'fa-moon';
  const iconSun = 'fa-sun';

  // Check saved theme
  const savedTheme = localStorage.getItem('selected-theme');
  const savedIcon = localStorage.getItem('selected-icon');

  // Apply saved theme
  if (savedTheme) {
    document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](darkThemeClass);
    themeButton.firstElementChild.classList[savedIcon === iconSun ? 'add' : 'remove'](iconSun);
    themeButton.firstElementChild.classList[savedIcon === iconSun ? 'remove' : 'add'](iconMoon);
  }

  themeButton.addEventListener('click', () => {
    // Toggle dark theme
    document.body.classList.toggle(darkThemeClass);

    // Toggle icon
    if (document.body.classList.contains(darkThemeClass)) {
      themeButton.firstElementChild.classList.add(iconSun);
      themeButton.firstElementChild.classList.remove(iconMoon);
      localStorage.setItem('selected-theme', 'dark');
      localStorage.setItem('selected-icon', iconSun);
    } else {
      themeButton.firstElementChild.classList.add(iconMoon);
      themeButton.firstElementChild.classList.remove(iconSun);
      localStorage.setItem('selected-theme', 'light');
      localStorage.setItem('selected-icon', iconMoon);
    }
  });

  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
  });
});
