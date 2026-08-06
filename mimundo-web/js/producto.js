/* =========================================================
   No necesitas tocar este archivo.
   Plantilla única para la ficha de cualquier producto: lee la
   sección y el producto desde la URL
   (producto.html?c=joyeria&p=aros-de-resina-boho), lo busca en
   js/secciones/*.js y dibuja galería, precio, detalles y el
   botón de agregar al carrito.
   ========================================================= */

let _cantidadActual = 1;

function _fotosDe(item) {
  return item.imagenes && item.imagenes.length ? item.imagenes : [item.imagen];
}

function _renderGaleria(item) {
  const fotos = _fotosDe(item);
  const principal = document.getElementById("prodFotoPrincipal");
  const miniaturas = document.getElementById("prodMiniaturas");

  function mostrar(url) {
    principal.style.backgroundImage = `url('${url}')`;
  }
  mostrar(fotos[0]);

  if (fotos.length > 1) {
    miniaturas.innerHTML = fotos
      .map((url, i) => `<button type="button" class="product-thumb${i === 0 ? " activa" : ""}" style="background-image:url('${url}')" data-src="${url}"></button>`)
      .join("");
    miniaturas.querySelectorAll(".product-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        mostrar(btn.dataset.src);
        miniaturas.querySelectorAll(".product-thumb").forEach((b) => b.classList.remove("activa"));
        btn.classList.add("activa");
      });
    });
  }
}

function _actualizarCantidadUI() {
  document.getElementById("prodCantidad").textContent = _cantidadActual;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slugSeccion = params.get("c");
  const slugProducto = params.get("p");

  const cat = SECCIONES.find((c) => c.slug === slugSeccion);
  const item = cat && cat.items.find((it) => itemSlug(it) === slugProducto);

  const notFound = document.getElementById("prodNotFound");
  const content = document.getElementById("prodContent");

  if (!cat || !item) {
    notFound.style.display = "block";
    content.style.display = "none";
    return;
  }

  document.title = `${item.nombre} — ${CONFIG.nombreNegocio}`;

  document.getElementById("prodBreadcrumb").href = `categoria.html?c=${cat.slug}`;
  document.getElementById("prodBreadcrumb").textContent = `← Volver a ${cat.nombre}`;

  _renderGaleria(item);

  const pills = [];
  if (item.subseccion) {
    const sub = (cat.subsecciones || []).find((s) => s.slug === item.subseccion);
    if (sub) pills.push(sub.nombre);
  }
  if (item.especificaciones) {
    Object.values(item.especificaciones).forEach((v) => pills.push(v));
  }
  document.getElementById("prodPills").innerHTML = pills.map((p) => `<span class="pill">${p}</span>`).join("");

  document.getElementById("prodNombre").textContent = item.nombre;
  document.getElementById("prodPrecio").innerHTML = precioHtml(item);
  document.getElementById("prodDescripcion").textContent = item.descripcion_larga || item.descripcion;

  document.getElementById("prodWhatsapp").href = whatsappUrl(
    `Hola! Tengo una consulta sobre "${item.nombre}" 🌿`
  );

  document.getElementById("prodMenos").addEventListener("click", () => {
    if (_cantidadActual > 1) _cantidadActual--;
    _actualizarCantidadUI();
  });
  document.getElementById("prodMas").addEventListener("click", () => {
    _cantidadActual++;
    _actualizarCantidadUI();
  });

  document.getElementById("prodAgregar").addEventListener("click", () => {
    Cart.add(cat.slug, cat.nombre, { ...item, precio: precioEfectivo(item) }, _cantidadActual);
    showToast(`"${item.nombre}" se agregó al carrito 🛒`);
  });
});
