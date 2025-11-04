const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
const totalSlides = slides.length;
let autoSlideTimer;
let isPaused = false; // for hover/focus pause

/*
 SLIDER FUNCTIONALITY
*/
function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));
  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
  showSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

document.getElementById("next").addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

document.getElementById("prev").addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const index = parseInt(e.currentTarget.dataset.index);
    showSlide(index);
    // update aria-pressed on all dots
    dots.forEach(d => d.setAttribute('aria-pressed','false'));
    e.currentTarget.setAttribute('aria-pressed','true');
    resetAutoSlide();
  });
  // allow keyboard activation
  dot.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  });
});

function startAutoSlide() {
  autoSlideTimer = setInterval(() => {
    nextSlide();
  }, 6000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

/*
 NAVBAR TOGGLE FUNCTIONALITY
*/
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");

// Scroll-spy: collect nav links and target sections
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = Array.from(navAnchors).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  // update aria attribute for accessibility
  menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Toggle .scrolled on navbar when window scrolls past 80px
function handleNavbarScroll() {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// IntersectionObserver for sections -> update active nav link
if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const anchor = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        if (anchor) anchor.classList.add('active');
      }
    });
  }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
} else {
  // Fallback: on scroll, compute nearest section
  window.addEventListener('scroll', () => {
    let index = sections.findIndex((sec, i) => {
      const rect = sec.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight * 0.4;
    });
    if (index === -1) index = 0;
    navAnchors.forEach(a => a.classList.remove('active'));
    const active = navAnchors[index];
    if (active) active.classList.add('active');
  });
}

document.addEventListener("click", function (event) {
  const clickedElement = event.target;

  // Condition 1: Check if the clicked element is *NOT* the navbar itself
  // Condition 2: Check if the clicked element is *NOT* inside the navbar

  const isClickInsideNavbar = navbar.contains(clickedElement);

  // You may also want to check if the clicked element is NOT the button that opens it:
  const isClickOnmenuToggle = menuToggle && menuToggle.contains(clickedElement);

  // If the navbar is currently visible AND the click is neither inside the navbar
  // nor on the toggle button, then close the navbar.
  if (
    navLinks.classList.contains("active") &&
    !isClickInsideNavbar &&
    !isClickOnmenuToggle
  ) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

/*
 SCROLL-REVEAL FUNCTIONALITY
*/
const fadeElements = document.querySelectorAll(".fade-in");

function checkVisibility() {
  const windowHeight = window.innerHeight;
  fadeElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
}

// Initial calls and event listeners
window.addEventListener("scroll", checkVisibility);

// Using DOMContentLoaded to ensure both slider and scroll-reveal run on load
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
  startAutoSlide();
  checkVisibility();
});

// Pause slider when user hovers or focuses on the hero area
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mouseenter', () => {
    clearInterval(autoSlideTimer);
    isPaused = true;
  });
  hero.addEventListener('mouseleave', () => {
    if (isPaused) resetAutoSlide();
    isPaused = false;
  });
  // keyboard focus pause
  hero.addEventListener('focusin', () => {
    clearInterval(autoSlideTimer);
    isPaused = true;
  });
  hero.addEventListener('focusout', () => {
    if (isPaused) resetAutoSlide();
    isPaused = false;
  });
}

// Keyboard navigation: left/right arrows to navigate slides, space to toggle play/pause
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextSlide();
    resetAutoSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
    resetAutoSlide();
  } else if (e.key === ' ' || e.code === 'Space') {
    // Toggle pause/play
    e.preventDefault();
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    } else {
      startAutoSlide();
    }
  }
});

/*
 Contact
*/
function sendMailto(event) {
  event.preventDefault();

  const form = document.getElementById("contact-form");
  const statusMessage = document.getElementById("form-message");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const recipient = "avtravel763@gmail.com";

  const subject = encodeURIComponent(
    `New Contact Form Submission from ${name}`
  );

  const body = encodeURIComponent(
    `Sender Name: ${name}\n` +
      `Sender Email: ${email}\n\n` +
      `--- Message ---\n${message}`
  );

  const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

  statusMessage.textContent =
    "Success! Opening your default email application... Please check your draft/outbox.";
  statusMessage.className = "form-message success";

  setTimeout(() => {
    window.location.href = mailtoLink;

    setTimeout(() => {
      statusMessage.className = "form-message";
      statusMessage.textContent = "";
    }, 7000);
  }, 200);

  form.reset();

  return false;
}

// --------------------------------------------------------------------------
// --- Scroll Effects (Header and Go-To-Top Button) ---
// --------------------------------------------------------------------------
const topButton = document.getElementById("go-to-top");
window.onscroll = function () {
  const scrollPosition =
    document.body.scrollTop || document.documentElement.scrollTop;

  // 2. Go-To-Top Button Visibility
  if (scrollPosition > 200) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};

topButton.addEventListener("click", function () {
  // Smooth scroll to the top of the page
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
