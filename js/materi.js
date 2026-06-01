/* ============================================
   MATERI.JS - Render daftar & detail materi
   Membutuhkan: data/materi.js (DATA_MATERI)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("materiGrid");
  const detail = document.getElementById("materiDetail");
  if (!grid || !detail) return;

  // Render daftar materi
  function renderGrid() {
    grid.innerHTML = DATA_MATERI.map(
      m => `
      <article class="materi-card fade-in" data-id="${m.id}">
        <div class="materi-thumb">${m.icon}</div>
        <div class="materi-body">
          <span class="badge">${m.badge}</span>
          <h3>${m.judul}</h3>
          <p>${m.ringkasan}</p>
        </div>
      </article>`
    ).join("");

    // Event klik tiap kartu
    grid.querySelectorAll(".materi-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = parseInt(card.dataset.id, 10);
        showDetail(id);
      });
    });

    // Aktifkan animasi
    grid.querySelectorAll(".fade-in").forEach(el => el.classList.add("visible"));
  }

  // Tampilkan detail materi
  function showDetail(id) {
    const idx = DATA_MATERI.findIndex(m => m.id === id);
    if (idx === -1) return;
    const m = DATA_MATERI[idx];
    const prev = DATA_MATERI[idx - 1];
    const next = DATA_MATERI[idx + 1];

    detail.innerHTML = `
      <span class="badge" style="display:inline-block;background:var(--hijau-pucat);color:var(--hijau-daun);padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;margin-bottom:10px;">${m.badge}</span>
      <h2>${m.icon} ${m.judul}</h2>
      ${m.konten}
      <div class="materi-nav">
        <button class="btn btn-secondary" ${prev ? `data-go="${prev.id}"` : "disabled"}>
          ← ${prev ? prev.judul : "Materi Sebelumnya"}
        </button>
        <button class="btn btn-primary" ${next ? `data-go="${next.id}"` : "disabled"}>
          ${next ? next.judul : "Selesai"} →
        </button>
      </div>
    `;
    detail.classList.add("active");
    detail.scrollIntoView({ behavior: "smooth", block: "start" });

    detail.querySelectorAll("[data-go]").forEach(b => {
      b.addEventListener("click", () => showDetail(parseInt(b.dataset.go, 10)));
    });
  }

  renderGrid();
});
