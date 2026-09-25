const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Otwieranie i zamykanie menu po kliknięciu w hamburgera
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("toggle");
});

// Automatyczne zamykanie menu po kliknięciu w dowolny link (żeby nie zasłaniało strony)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("toggle");
  });
});

// --- LOGIKA KONWERTERA ZDJĘĆ ---

const fileInput = document.getElementById("file-input");
const dropZone = document.getElementById("drop-zone");
const previewContainer = document.getElementById("preview-container");
const imagePreview = document.getElementById("image-preview");
const convertBtn = document.getElementById("convert-btn");
const canvas = document.getElementById("canvas");
const fileInfo = document.getElementById("file-info");

if (fileInput) {
  // Obsługa wyboru pliku
  fileInput.addEventListener("change", function (e) {
    handleFile(e.target.files[0]);
  });

  // Obsługa Drag & Drop
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#6218a3";
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "#1e293b";
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  });
}

function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Proszę wybrać poprawne zdjęcie (JPG/JPEG).");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    imagePreview.src = event.target.result;
    previewContainer.style.display = "block";
    dropZone.style.display = "none";
    fileInfo.innerText = `Plik: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  };
  reader.readAsDataURL(file);
}

if (convertBtn) {
  convertBtn.addEventListener("click", function () {
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
      // Ustawienie wymiarów canvas na wymiary zdjęcia
      canvas.width = img.width;
      canvas.height = img.height;

      // Rysowanie zdjęcia na canvasie
      ctx.drawImage(img, 0, 0);

      // Konwersja canvasu na format PNG
      const pngUrl = canvas.toDataURL("image/png");

      // Tworzenie automatycznego linku do pobrania
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "skonwertowane-zdjecie.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      alert("Konwersja zakończona! Pobieranie PNG...");
    };

    img.src = imagePreview.src;
  });
}
