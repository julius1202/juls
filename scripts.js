 // JavaScript for home.html and Movie.html: play and info buttons with accessibility and modal functionality
document.addEventListener('DOMContentLoaded', () => {
  // Play buttons functionality
  const playButtons = document.querySelectorAll('.play');
  playButtons.forEach(button => {
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.addEventListener('click', () => {
      alert('Play functionality to be implemented.');
    });
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        alert('Play functionality to be implemented.');
      }
    });
  });

  // Info buttons and modal functionality
  const infoButtons = document.querySelectorAll('.info');
  const modal = document.getElementById('infoModal');
  const modalContent = document.getElementById('modalContent');

  infoButtons.forEach(button => {
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'infoModal');
    button.addEventListener('click', () => {
      const movieTitle = button.getAttribute('data-title');
      const movieDesc = button.getAttribute('data-desc');
      modalContent.innerHTML = `<span id="closeModal" class="close" role="button" tabindex="0" aria-label="Close modal">&times;</span><h2 id="modalTitle">${movieTitle}</h2><p id="modalDesc">${movieDesc}</p>`;
      modal.style.display = 'block';

      const closeModalBtn = document.getElementById('closeModal');
      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      closeModalBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          modal.style.display = 'none';
        }
      });
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});

// JavaScript for Signin.html: login form validation and redirect
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  const errorMessage = document.querySelector('.error-message');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;

      if (email && password) {
        // Simulate successful login by redirecting to home.html
        window.location.href = 'home.html';
      } else {
        errorMessage.textContent = 'Please fill in all fields.';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Enhanced smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = targetId === '#top' ? document.body : document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80; // Height of fixed header
        const elementPosition = targetId === '#top' ? 0 : targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Enhanced visual feedback for clicked link
        const linkAnimation = this.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(1.1)', opacity: 0.8 },
          { transform: 'scale(1)', opacity: 1 }
        ], {
          duration: 300,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });

        // First scroll to the target with enhanced smooth behavior
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update active navigation link with enhanced animation
        document.querySelectorAll('.main-nav a').forEach(link => {
          link.classList.remove('active');
          link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        this.classList.add('active');
        
        // Update URL hash without scrolling
        history.pushState(null, null, targetId);

        // Enhanced mobile menu handling
        const mainNav = document.querySelector('.main-nav');
        if (mainNav.classList.contains('active')) {
          let scrollCheckTimeout;
          let scrollComplete = false;
          let lastScrollPosition = window.pageYOffset;
          let noMovementCount = 0;

          const checkScroll = () => {
            const currentPosition = window.pageYOffset;
            const targetPosition = offsetPosition;
            const distance = Math.abs(currentPosition - targetPosition);
            
            // Check if we've reached the target or if scrolling has stopped
            if (distance < 5 || currentPosition === lastScrollPosition) {
              noMovementCount++;
              if (noMovementCount >= 3) {
                scrollComplete = true;
              }
            } else {
              noMovementCount = 0;
            }

            lastScrollPosition = currentPosition;

            if (scrollComplete) {
              // Enhanced menu close animation
              const menuToggle = document.querySelector('.menu-toggle');
              if (menuToggle) {
                const menuAnimation = menuToggle.animate([
                  { transform: 'scale(1)', opacity: 1 },
                  { transform: 'scale(0.95)', opacity: 0.8 },
                  { transform: 'scale(1)', opacity: 1 }
                ], {
                  duration: 300,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });

                menuAnimation.onfinish = () => {
                  mainNav.classList.remove('active');
                  menuToggle.setAttribute('aria-expanded', 'false');
                };
              } else {
                mainNav.classList.remove('active');
              }
            } else {
              scrollCheckTimeout = setTimeout(checkScroll, 50);
            }
          };

          // Start checking scroll position
          scrollCheckTimeout = setTimeout(checkScroll, 50);

          // Cleanup on page unload
          window.addEventListener('beforeunload', () => {
            clearTimeout(scrollCheckTimeout);
          });
        }
      }
    });
  });

  // Enhanced section highlighting with Intersection Observer
  const sections = document.querySelectorAll('section, .location');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px 0px 0px', // Account for fixed header
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          const linkHref = link.getAttribute('href').substring(1);
          if (linkHref === currentId) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Handle initial page load
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  // Existing hamburger menu functionality
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  
  const mainNav = document.querySelector('.main-nav');
  const header = document.querySelector('header');
  header.insertBefore(menuToggle, mainNav);
  
  menuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    const isExpanded = mainNav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    if (isExpanded) {
      mainNav.style.display = '';
    } else {
      mainNav.style.display = '';
    }
  });

  // Existing theme toggle functionality
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  
  const subNav = document.querySelector('.sub-nav');
  subNav.insertBefore(themeToggle, subNav.firstChild);
  
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  let currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  }
  
  themeToggle.addEventListener('click', function() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
  });
  
  setTheme(currentTheme);
  
  prefersDarkScheme.addListener(function(e) {
    if (!localStorage.getItem('theme')) {
      currentTheme = e.matches ? 'dark' : 'light';
      setTheme(currentTheme);
    }
  });

  // Existing trailer modal functionality
  const modal = document.getElementById('trailerModal');
  const player = document.getElementById('trailerPlayer');
  const closeBtn = document.getElementById('closeTrailerModal');
  
  document.querySelectorAll('.play-trailer-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const src = btn.getAttribute('data-trailer');
      player.querySelector('source').src = src;
      player.load();
      modal.style.display = 'flex';
      player.play();
    });
  });
  
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    player.pause();
    player.currentTime = 0;
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      player.pause();
      player.currentTime = 0;
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      player.pause();
      player.currentTime = 0;
    }
  });

  // Reflection toggle functionality
  const toggleButton = document.getElementById('toggleReflection');
  const reflectionSection = document.querySelector('.project-reflection');

  if (toggleButton && reflectionSection) {
    // Add click handler
    toggleButton.addEventListener('click', function() {
      reflectionSection.classList.toggle('hidden');
      const icon = this.querySelector('.toggle-icon');
      icon.style.transform = reflectionSection.classList.contains('hidden') ? 'rotate(-90deg)' : 'rotate(0deg)';
    });
  }

  // Scroll button functionality
  document.querySelectorAll('.box-container').forEach(container => {
    const box = container.querySelector('.box');
    const scrollLeft = container.querySelector('.scroll-left');
    const scrollRight = container.querySelector('.scroll-right');

    // Show/hide scroll buttons based on scroll position
    const updateScrollButtons = () => {
      const scrollLeft = box.scrollLeft;
      const maxScroll = box.scrollWidth - box.clientWidth;

      container.querySelector('.scroll-left').style.opacity = scrollLeft > 0 ? '1' : '0';
      container.querySelector('.scroll-right').style.opacity = scrollLeft < maxScroll ? '1' : '0';
    };

    // Initial check
    updateScrollButtons();

    // Update on scroll
    box.addEventListener('scroll', updateScrollButtons);

    // Scroll left button
    scrollLeft.addEventListener('click', () => {
      box.scrollBy({
        left: -box.clientWidth * 0.8,
        behavior: 'smooth'
      });
    });

    // Scroll right button
    scrollRight.addEventListener('click', () => {
      box.scrollBy({
        left: box.clientWidth * 0.8,
        behavior: 'smooth'
      });
    });

    // Update on resize
    window.addEventListener('resize', updateScrollButtons);
  });

  // Search Bar Functionality
  const searchToggle = document.querySelector('.search-toggle');
  const searchBar = document.querySelector('.search-bar');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-bar input');

  searchToggle.addEventListener('click', () => {
    searchBar.classList.add('active');
    searchInput.focus();
  });

  searchClose.addEventListener('click', () => {
    searchBar.classList.remove('active');
    searchInput.value = '';
  });

  // Close search bar when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
      searchBar.classList.remove('active');
      searchInput.value = '';
    }
  });

  // Handle search input
  searchInput.addEventListener('input', (e) => {
    const searchQuery = searchInput.value.trim().toLowerCase();
    const movieBoxes = document.querySelectorAll('.box figure');
    if (searchQuery.length === 0) {
      movieBoxes.forEach(box => {
        box.style.display = '';
      });
      return;
    }
    movieBoxes.forEach(box => {
      const titleElem = box.querySelector('figcaption strong');
      const titleText = titleElem ? titleElem.textContent.toLowerCase() : '';
      if (titleText.includes(searchQuery)) {
        box.style.display = '';
      } else {
        box.style.display = 'none';
      }
    });
  });
})
