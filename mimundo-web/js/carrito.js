/* =========================================================
   No necesitas tocar este archivo.
   Dibuja el carrito de compras y llama a la función que crea
   el pago con Mercado Pago para TODOS los productos juntos.
   ========================================================= */

function renderCarrito() {
  const items = Cart.getItems();
  const wrap = document.getElementById("cartWrap");
  const empty = document.getElementById("cartEmpty");
  const summary = document.getElementById("cartSummary");

  wrap.innerHTML = "";

  if (!items.length) {
    empty.style.display = "block";
    summary.style.display = "none";
    return;
  }

  empty.style.display = "none";
  summary.style.display = "block";

  items.forEach((it) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div class="cart-row-photo" style="background-image:url('${it.imagen}')"></div>
      <div class="cart-row-info">
        <span class="cart-row-cat">${it.categoriaNombre}</span>
        <h3>${it.nombre}</h3>
        <span class="cart-row-price">${clp(it.precio)}</span>
      </div>
      <div class="qty-stepper">
        <button type="button" class="qty-btn" data-action="menos">−</button>
        <span class="qty-value">${it.cantidad}</span>
        <button type="button" class="qty-btn" data-action="mas">+</button>
      </div>
      <div class="cart-row-subtotal">${clp(it.precio * it.cantidad)}</div>
      <button type="button" class="cart-row-remove" title="Quitar">✕</button>
    `;

    row.querySelector('[data-action="menos"]').addEventListener("click", () => {
      Cart.setCantidad(it.id, it.cantidad - 1);
      renderCarrito();
    });
    row.querySelector('[data-action="mas"]').addEventListener("click", () => {
      Cart.setCantidad(it.id, it.cantidad + 1);
      renderCarrito();
    });
    row.querySelector(".cart-row-remove").addEventListener("click", () => {
      Cart.remove(it.id);
      showToast("Producto quitado del carrito");
      renderCarrito();
    });

    wrap.appendChild(row);
  });

  document.getElementById("cartTotal").textContent = clp(Cart.total());
}

async function iniciarPago() {
  const items = Cart.getItems();
  if (!items.length) return;

  const boton = document.getElementById("btnPagar");
  boton.disabled = true;
  const textoOriginal = boton.textContent;
  boton.textContent = "Redirigiendo a Mercado Pago...";

  try {
    const resp = await fetch("/.netlify/functions/crear-preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((it) => ({
          nombre: it.nombre,
          precio: it.precio,
          cantidad: it.cantidad,
        })),
      }),
    });

    const data = await resp.json();

    if (!resp.ok || !data.init_point) {
      throw new Error(data.error || "No se pudo iniciar el pago");
    }

    window.location.href = data.init_point;
  } catch (err) {
    console.error(err);
    showToast("No se pudo conectar con el pago. Te contactamos por WhatsApp igual 🌿");
    boton.disabled = false;
    boton.textContent = textoOriginal;
    window.open(
      whatsappUrl("Hola! Quiero pagar mi pedido pero tuve un problema con el checkout online. ¿Me ayudas? 🌿"),
      "_blank"
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCarrito();
  const btnPagar = document.getElementById("btnPagar");
  if (btnPagar) btnPagar.addEventListener("click", iniciarPago);
  const btnVaciar = document.getElementById("btnVaciar");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      Cart.clear();
      renderCarrito();
    });
  }
});
