// main.js — import dari utils.js
import { cariKarakter, buatKartuHTML } from "./utils.js";

// Ambil elemen HTML
const input     = document.getElementById("searchInput");
const tombol    = document.getElementById("searchBtn");
const grid      = document.getElementById("grid");
const statusEl  = document.getElementById("status");

// ─── Fungsi utama ─────────────────────────────────────────────────────────
async function handleCari() {
  const query = input.value.trim();
  if (!query) return;

  // Tampilkan loading
  statusEl.textContent = "Mencari...";
  grid.innerHTML = "";
  tombol.disabled = true;

  try {
    const characters = await cariKarakter(query);  // ← await di sini
    console.log(characters[0]); // ← lihat di DevTools (F12 → Console)

    if (characters.length === 0) {
      statusEl.textContent = `Karakter "${query}" tidak ditemukan.`;
      return;
    }

    // .map() + arrow function + template literal semua kepake di sini
    const semuaKartu = characters.map(c => buatKartuHTML(c));
    grid.innerHTML   = semuaKartu.join("");
    statusEl.textContent = `Ditemukan ${characters.length} karakter`;

  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
  } finally {
    tombol.disabled = false;  // Selalu aktifkan tombol lagi
  }
}

// ─── Event listeners ──────────────────────────────────────────────────────
tombol.addEventListener("click", handleCari);

// Tekan Enter juga bisa search
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleCari();
});