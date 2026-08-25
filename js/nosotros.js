/* =========================================================
   No necesitas tocar este archivo.
   Dibuja la página "Sobre mí" a partir de los datos que
   pusiste en js/perfil.js. Para cambiar el contenido, edita
   ese archivo — no este.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const p = PROFESORA;
  if (!p) return;

  document.getElementById("perfilFoto").style.backgroundImage = `url('${p.foto}')`;
  document.getElementById("perfilNombre").textContent = p.nombre;
  document.getElementById("perfilTitulo").textContent = p.titulo;

  const anios = new Date().getFullYear() - p.desde;
  document.getElementById("perfilAnios").textContent =
    `creando desde ${p.desde} · ${anios} ${anios === 1 ? "año" : "años"}`;

  document.getElementById("perfilEspecialidades").innerHTML = (p.especialidades || [])
    .map((e) => `<span class="pill">${e}</span>`)
    .join("");

  document.getElementById("perfilBioLarga").textContent = p.bio_larga;

  const timeline = document.getElementById("perfilTimeline");
  (p.hitos || []).forEach((h) => {
    const fila = document.createElement("div");
    fila.className = "timeline-item reveal";
    fila.innerHTML = `
      <span class="timeline-anio">${h.anio}</span>
      <span class="timeline-texto">${h.texto}</span>
    `;
    timeline.appendChild(fila);
  });

  const galeria = document.getElementById("perfilGaleria");
  (p.fotos_trabajos || []).forEach((url) => {
    const foto = document.createElement("div");
    foto.className = "work-photo reveal";
    foto.style.backgroundImage = `url('${url}')`;
    galeria.appendChild(foto);
  });

  setupReveal();
});