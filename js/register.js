/* ============================================
   REGISTER.JS - Pendaftaran Akun ke Local Storage
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const alertBox = document.getElementById("alert");

  function showAlert(message, type = "error") {
    alertBox.textContent = message;
    alertBox.className = "alert show alert-" + type;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const konfirmasi = document.getElementById("konfirmasi").value;

    // Validasi
    if (!nama || !username || !password || !konfirmasi) {
      showAlert("Semua kolom wajib diisi.");
      return;
    }
    if (username.length < 3) {
      showAlert("Username minimal 3 karakter.");
      return;
    }
    if (password.length < 6) {
      showAlert("Password minimal 6 karakter.");
      return;
    }
    if (password !== konfirmasi) {
      showAlert("Konfirmasi password tidak cocok.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.username === username)) {
      showAlert("Username sudah digunakan, gunakan username lain.");
      return;
    }

    users.push({ nama, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    showAlert("Pendaftaran berhasil! Mengarahkan ke halaman login...", "success");
    setTimeout(() => (window.location.href = "login.html"), 1200);
  });
});
