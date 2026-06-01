/* ============================================
   ANIMATION.JS - Render video edukasi
   Membutuhkan: data/video.js (DATA_VIDEO)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("videoGrid");
  if (!grid) return;

  grid.innerHTML = DATA_VIDEO.map(v => `
    <article class="video-card fade-in visible">
      <div class="video-frame">
        <iframe
          src="https://www.youtube.com/embed/${v.embedId}"
          title="${v.judul}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      <div class="video-body">
        <h3>${v.judul}</h3>
        <p>${v.deskripsi}</p>
      </div>
    </article>
  `).join("");
});
