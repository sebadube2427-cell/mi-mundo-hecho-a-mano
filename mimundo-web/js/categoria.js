/* =========================================================
   No necesitas tocar este archivo.
   Plantilla única para todas las secciones: lee el slug en la
   URL (categoria.html?c=joyeria), busca esa sección en
   js/secciones/*.js, arma el panel de filtros según sus
   subsecciones/especificaciones, y dibuja los productos.

   También puede llegar con filtros ya elegidos desde el
   mega-menú, ej: categoria.html?c=joyeria&material=Plata
   o categoria.html?c=joyeria&subseccion=aros
   ========================================================= */

function _valoresUnicos(items, clave) {
  const vals = new Set();
  items.forEach((it) => {
    const v = it.especificaciones && it.especificaciones[clave];
    if (v) vals.add(v);
  });
  return Array.from(vals).sort((a, b) => a.localeCompare(b, "es"));
}

function _grupoHtml(id, titulo, opciones) {
  const casillas = opciones
    .map(
      (op) => `
      <label class="filtro-opcion">
        <input type="checkbox" data-grupo="${id}" value="${op.valor}">
        <span>${op.texto}</span>
      </label>`
    )
    .join("");
  return `
    <fieldset class="filtro-grupo">
      <legend>${titulo}</legend>
      ${casillas}
    </fieldset>
  `;
}

function _buildFiltros(cat) {
  const cont = document.getElementById("filtrosGrupos");
  let html = "";

  if (cat.subsecciones && cat.subsecciones.length) {
    html += _grupoHtml(
      "subseccion",
      "Tipo",
      cat.subsecciones.map((s) => ({ valor: s.slug, texto: s.nombre }))
    );
  }

  (cat.filtros || []).forEach((f) => {
    const valores = _valoresUnicos(cat.items, f.clave);
    if (!valores.length) return;
    html += _grupoHtml(
      `spec:${f.clave}`,
      f.etiqueta,
      valores.map((v) => ({ valor: v, texto: v }))
    );
  });

  html += `
    <fieldset class="filtro-grupo filtro-precio">
      <legend>Precio</legend>
      <div class="filtro-precio-inputs">
        <label>Mín.
          <input type="number" id="filtroPrecioMin" min="0" step="1000" placeholder="0">
        </label>
        <label>Máx.
          <input type="number" id="filtroPrecioMax" min="0" step="1000" placeholder="Sin límite">
        </label>
      </div>
    </fieldset>
  `;

  cont.innerHTML = html;
}

// Marca las casillas según lo que venga en la URL (desde el mega-menú)
function _aplicarPresetDesdeUrl(cat, params) {
  const subseccion = params.get("subseccion");
  if (subseccion) {
    const el = document.querySelector(`[data-grupo="subseccion"][value="${CSS.escape(subseccion)}"]`);
    if (el) el.checked = true;
  }
  (cat.filtros || []).forEach((f) => {
    const valor = params.get(f.clave);
    if (!valor) return;
    const el = document.querySelector(`[data-grupo="spec:${f.clave}"][value="${CSS.escape(valor)}"]`);
    if (el) el.checked = true;
  });
}

function _leerFiltros() {
  const subseccion = new Set(
    Array.from(document.querySelectorAll('[data-grupo="subseccion"]:checked')).map((el) => el.value)
  );

  const specs = {};
  document.querySelectorAll('[data-grupo^="spec:"]:checked').forEach((el) => {
    const clave = el.dataset.grupo.split(":")[1];
    if (!specs[clave]) specs[clave] = new Set();
    specs[clave].add(el.value);
  });

  const minEl = document.getElementById("filtroPrecioMin");
  const maxEl = document.getElementById("filtroPrecioMax");
  const precioMin = minEl && minEl.value ? Number(minEl.value) : null;
  const precioMax = maxEl && maxEl.value ? Number(maxEl.value) : null;

  return { subseccion, specs, precioMin, precioMax };
}

function _itemPasaFiltros(item, filtros) {
  if (filtros.subseccion.size && !filtros.subseccion.has(item.subseccion)) return false;

  for (const clave in filtros.specs) {
    const valoresSeleccionados = filtros.specs[clave];
    const valorItem = item.especificaciones && item.especificaciones[clave];
    if (!valoresSeleccionados.has(valorItem)) return false;
  }

  if (filtros.precioMin !== null && item.precio < filtros.precioMin) return false;
  if (filtros.precioMax !== null && item.precio > filtros.precioMax) return false;

  return true;
}

function _renderResultados(cat, filtros) {
  const grid = document.getElementById("catGrid");
  const sinResultados = document.getElementById("catSinResultados");
  const contador = document.getElementById("catResultadosCount");

  const items = cat.items.filter((it) => _itemPasaFiltros(it, filtros));

  grid.innerHTML = "";
  items.forEach((item) => grid.appendChild(renderProductCard(item, cat)));

  sinResultados.style.display = items.length ? "none" : "block";
  contador.textContent = `Mostrando ${items.length} de ${cat.items.length} productos`;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("c");
  const cat = SECCIONES.find((c) => c.slug === slug);

  const notFound = document.getElementById("catNotFound");
  const content = document.getElementById("catContent");

  if (!cat) {
    notFound.style.display = "block";
    content.style.display = "none";
    return;
  }

  document.title = `${cat.nombre} — ${CONFIG.nombreNegocio}`;
  document.getElementById("catEtiqueta").textContent = cat.etiqueta;
  document.getElementById("catNombre").textContent = cat.nombre;
  document.getElementById("catDescripcion").textContent = cat.descripcion;

  _buildFiltros(cat);
  _aplicarPresetDesdeUrl(cat, params);
  _renderResultados(cat, _leerFiltros());

  document.getElementById("btnAplicarFiltros").addEventListener("click", () => {
    _renderResultados(cat, _leerFiltros());
    document.getElementById("filtrosPanel").classList.remove("open");
  });

  document.getElementById("btnLimpiarFiltros").addEventListener("click", () => {
    document.querySelectorAll("#filtrosGrupos input[type=checkbox]").forEach((el) => (el.checked = false));
    document.querySelectorAll("#filtrosGrupos input[type=number]").forEach((el) => (el.value = ""));
    _renderResultados(cat, _leerFiltros());
  });

  const btnAbrir = document.getElementById("btnAbrirFiltros");
  const panel = document.getElementById("filtrosPanel");
  if (btnAbrir) btnAbrir.addEventListener("click", () => panel.classList.add("open"));
  const btnCerrar = document.getElementById("cerrarFiltros");
  if (btnCerrar) btnCerrar.addEventListener("click", () => panel.classList.remove("open"));
});
