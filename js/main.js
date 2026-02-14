/**
 * Himalaya Seva Sangh - NGO Website
 * Interactive functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  // ========================================
  // Smooth Scrolling for Navigation Links
  // ========================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only handle internal links (starting with #)
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========================================
  // Active Navigation Link on Scroll
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && 
          window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.style.color = '';
      link.style.borderBottomColor = '';
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.style.color = 'var(--forest-green)';
        link.style.borderBottomColor = 'var(--sage-green)';
      }
    });
  });

  // ========================================
  // Contact Form Handling
  // ========================================
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const interest = document.getElementById('interest').value;
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      // In a real application, this would send data to a server
      setTimeout(() => {
        showFormMessage(
          `Thank you, ${name}! We've received your message and will get back to you soon.`,
          'success'
        );
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      }, 500);
    });
  }

  function showFormMessage(msg, type) {
    if (formMessage) {
      formMessage.textContent = msg;
      formMessage.className = `form-message ${type}`;
      formMessage.style.display = 'block';
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // ========================================
  // Scroll-based Animations (Optional Enhancement)
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add fade-in effect to cards
  const cards = document.querySelectorAll(
    '.focus-card, .program-card, .stat-card, .involvement-card, .story-card'
  );
  
  cards.forEach((card, index) => {
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    // Observe for intersection
    observer.observe(card);
  });

  // ========================================
  // Navbar Shadow on Scroll
  // ========================================
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
      }
    });
  }

  // ========================================
  // Performance: Reduce animations on slow connections
  // ========================================
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    // If slow connection detected, disable animations
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
        card.style.transition = 'none';
      });
    }
  }

  // ========================================
  // Accessibility: Keyboard navigation
  // ========================================
  navLinks.forEach(link => {
    link.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        link.click();
      }
    });
  });

  // ========================================
  // Console message
  // ========================================
  console.log('🌿 Himalaya Seva Sangh website loaded');
  console.log('This is a demonstration website for educational purposes.');
});
