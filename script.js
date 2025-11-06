const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
const totalSlides = slides.length;
let autoSlideTimer;

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
    const index = parseInt(e.target.dataset.index);
    showSlide(index);
    resetAutoSlide();
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

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

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

  // Send contact form drafts to primary and CEO addresses
  const recipients = [
    "avtravel763@gmail.com",
    "KMDMAMUN@GMAIL.COM",
    "MARKETBEEZ21@GMAIL.COM",
  ];
  // Join with comma so most mail clients put all addresses in the To field
  const recipient = recipients.join(",");

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
    "Success! Opening your default email application to compose a message to the listed recipients...";
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
