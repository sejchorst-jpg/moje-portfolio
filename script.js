const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Otwieranie i zamykanie menu po kliknięciu w hamburgera
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("toggle");
});
const fileInfo = document.getElementById("file-info");

// Automatyczne zamykanie menu po kliknięciu w dowolny link (żeby nie zasłaniało strony)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("toggle");
  });
});
