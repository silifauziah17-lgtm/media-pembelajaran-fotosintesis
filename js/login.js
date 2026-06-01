/* ============================================
   LOGIN.JS - Simulasi Login dengan Local Storage
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const alertBox = document.getElementById("alert");

  function showAlert(message, type = "error") {
    alertBox.textContent = message;
    alertBox.className = "alert show alert-" + type;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      showAlert("Mohon isi username dan password.");
      return;
    }

    // Ambil daftar akun dari localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      showAlert("Username atau password salah. Silakan daftar dulu jika belum punya akun.");
      return;
    }

    // Simpan sesi user yang sedang login
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ nama: user.nama, username: user.username })
    );

    showAlert("Login berhasil! Mengarahkan ke beranda...", "success");
    setTimeout(() => (window.location.href = "index.html"), 900);
  });
});
