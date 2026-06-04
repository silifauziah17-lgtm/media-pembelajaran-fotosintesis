/* ============================================
   QUIZ.JS - Quiz interaktif
   Membutuhkan: data/quiz.js (DATA_QUIZ)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const quizCard = document.getElementById("quizCard");
  const resultBox = document.getElementById("quizResult");
  if (!quizCard) return;

  let current = 0;
  let benar = 0;
  let salah = 0;
  let dijawab = false;

  function render() {
    const total = DATA_QUIZ.length;
    const soal = DATA_QUIZ[current];
    const progress = ((current) / total) * 100;

    quizCard.innerHTML = `
      <div class="progress-info">
        <span>Soal ${current + 1} dari ${total}</span>
        <span>Benar: ${benar} | Salah: ${salah}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>

      <p class="question-text">${current + 1}. ${soal.pertanyaan}</p>

${
soal.tipe === "dropdown"
?
`
<div class="dropdown-box">
  <select id="dropdownAnswer">
    <option value="">-- Pilih Jawaban --</option>
    ${soal.pilihan.map((p,i)=>
      `<option value="${i}">${p}</option>`
    ).join("")}
  </select>

  <button id="cekDropdown">
    Cek Jawaban
  </button>
</div>
`

: soal.tipe === "benarsalah"

?

`
<div class="quiz-options" id="opts">

  <label data-i="true">
    <span class="option-letter">B</span>
    <span>Benar</span>
  </label>

  <label data-i="false">
    <span class="option-letter">S</span>
    <span>Salah</span>
  </label>

</div>
`

:

`
<div class="quiz-options" id="opts">
  ${soal.pilihan.map((p, i) => `
    <label data-i="${i}">
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span>${p}</span>
    </label>
  `).join("")}
</div>
`
}
      <div class="feedback" id="feedback"></div>
      <div class="quiz-actions">
        <button class="btn btn-secondary" id="resetBtn">↻ Ulang dari Awal</button>
        <button class="btn btn-primary" id="nextBtn" disabled>
          ${current === total - 1 ? "Lihat Hasil" : "Soal Berikutnya →"}
        </button>
      </div>
    `;

    dijawab = false;

    const opts = quizCard.querySelector("#opts");
    const feedback = quizCard.querySelector("#feedback");
    const nextBtn = quizCard.querySelector("#nextBtn");
    if(soal.tipe === "dropdown"){

  const btn = document.getElementById("cekDropdown");

  btn.addEventListener("click", () => {

    const pilihan = parseInt(
      document.getElementById("dropdownAnswer").value
    );

    if(isNaN(pilihan)){
      alert("Pilih jawaban terlebih dahulu!");
      return;
    }

    const benarIdx = soal.jawaban;

    if(pilihan === benarIdx){
      benar++;
      feedback.textContent = "✅ Benar!";
      feedback.className = "feedback show correct";
    }else{
      salah++;
      feedback.textContent =
      "❌ Salah. Jawaban yang benar: " +
      soal.pilihan[benarIdx];
      feedback.className = "feedback show wrong";
    }

    nextBtn.disabled = false;
  });


}
    

    if (opts) {
  opts.querySelectorAll("label").forEach(lbl => {
    lbl.addEventListener("click", () => {
      if (dijawab) return;
      dijawab = true;

      let pilihan;

if (soal.tipe === "benarsalah") {
  pilihan = lbl.dataset.i === "true";
} else {
  pilihan = parseInt(lbl.dataset.i, 10);
}

const benarIdx = soal.jawaban;

      opts.querySelectorAll("label").forEach(l => {
        let i;

if (soal.tipe === "benarsalah") {
  i = l.dataset.i === "true";
} else {
  i = parseInt(l.dataset.i, 10);
}

if (i === benarIdx) {
  l.classList.add("correct");
} else if (i === pilihan) {
  l.classList.add("wrong");
}

        l.style.pointerEvents = "none";
      });

      if (pilihan === benarIdx) {
        benar++;
        feedback.textContent = "✅ Benar! Jawaban tepat.";
        feedback.className = "feedback show correct";
      } else {
        salah++;
        if (soal.tipe === "benarsalah") {

  feedback.textContent =
    "❌ Salah. Jawaban yang benar: " +
    (benarIdx ? "Benar" : "Salah");

} else {

  feedback.textContent =
    "❌ Salah. Jawaban yang benar: " +
    String.fromCharCode(65 + benarIdx) +
    ". " +
    soal.pilihan[benarIdx];

}

        feedback.className = "feedback show wrong";
      }

      nextBtn.disabled = false;
    });
  });
}

    nextBtn.addEventListener("click", () => {
      if (current < DATA_QUIZ.length - 1) {
        current++;
        render();
      } else {
        showResult();
      }
    });

    quizCard.querySelector("#resetBtn").addEventListener("click", reset);
  }

  function showResult() {
    const total = DATA_QUIZ.length;
    const skor = Math.round((benar / total) * 100);
    let pesan, ikon;
    if (skor >= 80) { pesan = "Luar biasa! Pemahamanmu sangat baik. 🌟"; ikon = "🏆"; }
    else if (skor >= 60) { pesan = "Bagus! Terus tingkatkan pemahamanmu. 💪"; ikon = "🎉"; }
    else { pesan = "Tetap semangat! Coba pelajari materi lagi dan ulangi. 📚"; ikon = "🌱"; }

    quizCard.style.display = "none";
    resultBox.classList.add("show");
    resultBox.innerHTML = `
      <div class="result-icon">${ikon}</div>
      <h2 style="color:var(--hijau-daun);">Quiz Selesai!</h2>
      <div class="result-score">${skor}<span style="font-size:1.5rem;color:var(--teks-lembut);">/100</span></div>
      <p class="result-message">${pesan}</p>
      <div class="score-detail">
        <div class="item"><div class="num">${benar}</div><div class="lbl">Benar</div></div>
        <div class="item"><div class="num">${salah}</div><div class="lbl">Salah</div></div>
        <div class="item"><div class="num">${total}</div><div class="lbl">Total Soal</div></div>
      </div>
      <button class="btn btn-primary" id="ulangBtn">↻ Ulangi Quiz</button>
      <a href="materi.html" class="btn btn-secondary" style="margin-left:10px;">📖 Pelajari Materi</a>
    `;
    document.getElementById("ulangBtn").addEventListener("click", reset);
  }

  function reset() {
    current = 0; benar = 0; salah = 0;
    resultBox.classList.remove("show");
    resultBox.innerHTML = "";
    quizCard.style.display = "block";
    render();
  }

  render();
});
