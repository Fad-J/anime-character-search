// utils.js — export fungsi yang bisa dipakai di file lain

// Bikin satu kartu HTML dari data karakter
export function buatKartuHTML({ name, images, favorites }) {
  //                            ^^^^ langsung ambil dari root object
  const foto = images?.jpg?.image_url ?? "placeholder.jpg";

  return `
    <div class="card">
      <img src="${foto}" alt="${name}" loading="lazy">
      <div class="card-info">
        <h3 class="card-name">${name}</h3>
        <span class="favorit">★ ${favorites.toLocaleString("id-ID")} favorit</span>
      </div>
    </div>
  `;
}

// Fetch data karakter dari Jikan API (API anime publik, gratis)
export async function cariKarakter(query) {
  const url = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&limit=12`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Gagal mengambil data: HTTP ${response.status}`);
  }

  const json = await response.json();
  return json.data;  // Array of characters
}