/* =========================================================
   No necesitas tocar este archivo.
   Utilidades compartidas por todas las páginas: menú con
   mega-menú por sección (armado desde SECCIONES), formato de
   precios con descuento, WhatsApp, aviso (toast), tarjeta de
   producto reutilizable y animación al hacer scroll.
   ========================================================= */

function clp(n) {
  return "$" + Number(n).toLocaleString("es-CL");
}

function precioEfectivo(item) {
  return item.precio_oferta && item.precio_oferta < item.precio ? item.precio_oferta : item.precio;
}

function precioHtml(item) {
  if (item.precio_oferta && item.precio_oferta < item.precio) {
    const pct = Math.round(100 - (item.precio_oferta / item.precio) * 100);
    return `
      <div class="price-row">
        <span class="card-price">${clp(item.precio_oferta)}</span>
        <span class="card-price-old">${clp(item.precio)}</span>
        <span class="badge-descuento">-${pct}%</span>
      </div>
    `;
  }
  return `<div class="price-row"><span class="card-price">${clp(item.precio)}</span></div>`;
}

function whatsappUrl(mensaje) {
  const texto = encodeURIComponent(mensaje || CONFIG.whatsappMensaje);
  return `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
}

function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove("show"), 2600);
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Usa el "slug" del producto si lo definiste en js/secciones/*.js;
// si no, lo genera solo a partir del nombre (para que nunca falte).
function itemSlug(item) {
  return item.slug || slugify(item.nombre);
}

/* ---------------------------------------------------------
   Tarjeta de producto (se usa en categoria.js y en el
   carrusel de más vendidos de home.js)
   --------------------------------------------------------- */
function renderProductCard(item, cat) {
  const card = document.createElement("article");
  card.className = "card reveal in";

  const pills = [];
  if (item.subseccion) {
    const sub = (cat.subsecciones || []).find((s) => s.slug === item.subseccion);
    if (sub) pills.push(sub.nombre);
  }
  if (item.especificaciones) {
    Object.values(item.especificaciones).forEach((v) => pills.push(v));
  }
  const metaHtml = pills.length
    ? `<div class="class-meta">${pills.map((p) => `<span class="pill">${p}</span>`).join("")}</div>`
    : "";

  const urlDetalle = `producto.html?c=${cat.slug}&p=${itemSlug(item)}`;

  card.innerHTML = `
    <div class="card-tape"></div>
    ${item.precio_oferta ? '<span class="ribbon-oferta">Oferta</span>' : ""}
    <a href="${urlDetalle}" class="card-photo-link">
      <div class="card-photo" style="background-image:url('${item.imagen}')" role="img" aria-label="${item.nombre}"></div>
    </a>
    <div class="card-body">
      ${metaHtml}
      <a href="${urlDetalle}" class="card-title-link"><h3>${item.nombre}</h3></a>
      <p class="card-desc">${item.descripcion}</p>
      ${precioHtml(item)}
      <div class="card-actions">
        <button type="button" class="btn btn-primary btn-small btn-add">Agregar al carrito</button>
        <a class="btn btn-outline btn-small" href="${urlDetalle}">Ver detalle</a>
      </div>
    </div>
  `;

  card.querySelector(".btn-add").addEventListener("click", () => {
    Cart.add(cat.slug, cat.nombre, { ...item, precio: precioEfectivo(item) }, 1);
    showToast(`"${item.nombre}" se agregó al carrito 🛒`);
  });

  return card;
}

/* ---------------------------------------------------------
   Menú con mega-menú por sección.
   Escritorio: se abre al pasar el mouse.
   Celular: cada sección tiene una flechita ▾ para desplegar
   sus opciones sin salir del menú.
   --------------------------------------------------------- */
function _megaPanelHtml(cat) {
  const columnas = [];

  if (cat.subsecciones && cat.subsecciones.length) {
    columnas.push(`
      <div class="mega-col">
        <span class="mega-col-title">Tipo</span>
        ${cat.subsecciones
          .map((s) => `<a href="categoria.html?c=${cat.slug}&subseccion=${s.slug}">${s.nombre}</a>`)
          .join("")}
      </div>
    `);
  }

  if (cat.filtros && cat.filtros.length) {
    const f = cat.filtros[0];
    const valores = Array.from(
      new Set(cat.items.map((it) => it.especificaciones && it.especificaciones[f.clave]).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b, "es"));
    if (valores.length) {
      columnas.push(`
        <div class="mega-col">
          <span class="mega-col-title">${f.etiqueta}</span>
          ${valores
            .map((v) => `<a href="categoria.html?c=${cat.slug}&${f.clave}=${encodeURIComponent(v)}">En ${v.toLowerCase()}</a>`)
            .join("")}
        </div>
      `);
    }
  }

  return `
    <div class="mega-panel">
      <a class="mega-ver-todo" href="categoria.html?c=${cat.slug}">Ver todo ${cat.nombre} →</a>
      <div class="mega-cols">${columnas.join("")}</div>
      <div class="mega-photo" style="background-image:url('${cat.imagen_portada}')"></div>
    </div>
  `;
}

function buildNav() {
  const nav = document.getElementById("mainNav");
  if (nav) {
    const items = SECCIONES.map(
      (cat) => `
      <div class="nav-item">
        <div class="nav-link-row">
          <a href="categoria.html?c=${cat.slug}" class="nav-link">${cat.nombre}</a>
          <button type="button" class="nav-caret" aria-label="Mostrar opciones de ${cat.nombre}" aria-expanded="false">▾</button>
        </div>
        ${_megaPanelHtml(cat)}
      </div>
    `
    ).join("");

    nav.innerHTML = items;

    nav.querySelectorAll(".nav-caret").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const item = btn.closest(".nav-item");
        const isOpen = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen);
      });
    });
  }

  // El carrito vive fuera de #mainNav para que siempre se vea,
  // incluso con el menú de secciones cerrado en celular.
  const cartSlot = document.getElementById("navCartSlot");
  if (cartSlot) {
    cartSlot.innerHTML = `
      <a href="carrito.html" class="nav-cart" aria-label="Carrito de compras">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="cart-badge" data-cart-count style="display:none">0</span>
      </a>
    `;
  }
}

function setupMobileNav() {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (!navToggle || !mainNav) return;
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
  mainNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") mainNav.classList.remove("open");
  });
}

function setupContactLinks() {
  const wa = document.getElementById("whatsappLink");
  if (wa) wa.href = whatsappUrl();
  const ig = document.getElementById("instagramLink");
  if (ig) ig.href = `https://www.instagram.com/${CONFIG.instagram}/`;
  document.querySelectorAll("[data-footer-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function setupReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }
}

function setupHideOnScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const delta = y - lastY;

    if (y > 80 && delta > 4) {
      header.classList.add("nav-hidden"); // bajando: se oculta
    } else if (delta < -4) {
      header.classList.remove("nav-hidden"); // subiendo: reaparece
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
}

function setupPromoBar() {
  const bar = document.getElementById("promoBar");
  if (!bar) return;

  const btn = document.getElementById("promoClose");
  if (btn) {
    btn.addEventListener("click", () => {
      bar.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  setupMobileNav();
  setupContactLinks();
  setupReveal();
  setupHideOnScroll();
  setupPromoBar();
});
