/* ============================================
   MAIN.JS - Skrip Umum (Navbar, Auth Check, Footer Year, Loader)
   ============================================ */

// ===== Tahun otomatis di footer =====
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Loader
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hide"), 400);
    });
  }

  // Toggle navbar mobile
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
  }

  // Tandai menu aktif sesuai halaman
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  // Fade-in saat scroll
  const fadeEls = document.querySelectorAll(".fade-in");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => io.observe(el));

  // Cek apakah user sudah login (untuk tombol logout di navbar)
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    if (currentUser) {
      authBtn.textContent = "Keluar (" + currentUser.username + ")";
      authBtn.href = "#";
      authBtn.addEventListener("click", e => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
      });
    } else {
      authBtn.textContent = "Masuk";
      authBtn.href = "login.html";
    }
  }
});

// ===== Helper: proteksi halaman (panggil dari halaman yang perlu login) =====
function requireLogin() {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "login.html";
  }
}
