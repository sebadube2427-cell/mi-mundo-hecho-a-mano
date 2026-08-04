/* =========================================================
   No necesitas tocar este archivo.
   Maneja el carrito de compras (guardado en el navegador
   de cada visitante, con localStorage) y el conteo del
   ícono del carrito en el menú.
   ========================================================= */

const Cart = (function () {
  const KEY = "mimundo_cart_v1";

  function _read() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function _write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    _updateBadge();
  }

  function _updateBadge() {
    const badges = document.querySelectorAll("[data-cart-count]");
    const count = getItems().reduce((sum, it) => sum + it.cantidad, 0);
    badges.forEach((b) => {
      b.textContent = count;
      b.style.display = count > 0 ? "inline-flex" : "none";
    });
  }

  function getItems() {
    return _read();
  }

  // id único por producto = categoría + nombre
  function _makeId(categoriaSlug, nombre) {
    return categoriaSlug + "::" + nombre;
  }

  function add(categoriaSlug, categoriaNombre, item, cantidad) {
    cantidad = cantidad || 1;
    const items = _read();
    const id = _makeId(categoriaSlug, item.nombre);
    const existing = items.find((it) => it.id === id);
    if (existing) {
      existing.cantidad += cantidad;
    } else {
      items.push({
        id,
        categoriaSlug,
        categoriaNombre,
        nombre: item.nombre,
        precio: item.precio,
        imagen: item.imagen,
        cantidad,
      });
    }
    _write(items);
  }

  function setCantidad(id, cantidad) {
    let items = _read();
    if (cantidad <= 0) {
      items = items.filter((it) => it.id !== id);
    } else {
      const it = items.find((i) => i.id === id);
      if (it) it.cantidad = cantidad;
    }
    _write(items);
  }

  function remove(id) {
    const items = _read().filter((it) => it.id !== id);
    _write(items);
  }

  function clear() {
    _write([]);
  }

  function total() {
    return _read().reduce((sum, it) => sum + it.precio * it.cantidad, 0);
  }

  function count() {
    return _read().reduce((sum, it) => sum + it.cantidad, 0);
  }

  document.addEventListener("DOMContentLoaded", _updateBadge);

  return { getItems, add, setCantidad, remove, clear, total, count };
})();
