/* =========================================================
   No necesitas tocar este archivo.
   Dibuja, en la página principal: los tabs de categorías, el
   carrusel de "más vendidos" y los bloques de cada sección
   (foto lateral + título + descripción), todo desde
   js/secciones/*.js — así que agregar/quitar una sección ahí
   también actualiza automáticamente la página principal.
   ========================================================= */

function _renderTabs() {
  const cont = document.getElementById("tabsCategorias");
  if (!cont) return;
  cont.innerHTML = SECCIONES.map(
    (cat) => `<a class="tab-pill" href="#seccion-${cat.slug}">${cat.nombre}</a>`
  ).join("");
}

function _renderMasVendidos() {
  const track = document.getElementById("carouselTrack");
  const section = document.getElementById("carouselSection");
  if (!track || !section) return;

  const destacados = [];
  SECCIONES.forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.masVendido) destacados.push({ item, cat });
    });
  });

  if (!destacados.length) {
    section.style.display = "none";
    return;
  }

destacados.forEach(({ item, cat }) => track.appendChild(renderProductCard(item, cat)));

  _setupDragScroll(track);
}

function _setupDragScroll(el) {
  let arrastrando = false;
  let startX = 0;
  let scrollInicial = 0;

  el.addEventListener("mousedown", (e) => {
    arrastrando = true;
    el.classList.add("arrastrando");
    startX = e.pageX;
    scrollInicial = el.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    arrastrando = false;
    el.classList.remove("arrastrando");
  });

  el.addEventListener("mouseleave", () => {
    arrastrando = false;
    el.classList.remove("arrastrando");
  });

  el.addEventListener("mousemove", (e) => {
    if (!arrastrando) return;
    e.preventDefault();
    const distancia = e.pageX - startX;
    el.scrollLeft = scrollInicial - distancia;
  });

}

function _renderBloquesSeccion() {
  const cont = document.getElementById("featureBlocks");
  if (!cont) return;

  SECCIONES.forEach((cat, i) => {
    const block = document.createElement("section");
    block.className = "feature-block reveal" + (i % 2 === 1 ? " reverse" : "");
    block.id = `seccion-${cat.slug}`;
    block.innerHTML = `
      <div class="feature-photo" style="background-image:url('${cat.imagen_portada}')"></div>
      <div class="feature-copy">
        <span class="tag-label">${cat.etiqueta}</span>
        <h2>${cat.nombre}</h2>
        <p>${cat.descripcion}</p>
        <a href="categoria.html?c=${cat.slug}" class="btn btn-primary">Ver colección</a>
      </div>
    `;
    cont.appendChild(block);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  _renderTabs();
  _renderMasVendidos();
  _renderBloquesSeccion();
  setupReveal();
});
