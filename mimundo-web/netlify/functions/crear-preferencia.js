// No necesitas tocar este archivo.
//
// Esta función corre en el servidor de Netlify (no en el navegador),
// por eso es el único lugar seguro para usar tu Access Token de
// Mercado Pago. El token se configura en Netlify como variable de
// entorno "MP_ACCESS_TOKEN" (ver LEEME.md) — nunca se escribe aquí
// directamente ni queda visible para los visitantes del sitio.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };
  }

  const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
  if (!ACCESS_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Falta configurar MP_ACCESS_TOKEN en las variables de entorno de Netlify. Revisa LEEME.md.",
      }),
    };
  }

  let items;
  try {
    const body = JSON.parse(event.body || "{}");
    items = body.items;
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Carrito vacío");
    }
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Carrito inválido" }) };
  }

  const siteUrl = process.env.URL || `https://${event.headers.host}`;

  const preference = {
    items: items.map((it) => ({
      title: String(it.nombre).slice(0, 250),
      quantity: Number(it.cantidad) || 1,
      unit_price: Number(it.precio),
      currency_id: "CLP",
    })),
    back_urls: {
      success: `${siteUrl}/pago-exitoso.html`,
      pending: `${siteUrl}/pago-pendiente.html`,
      failure: `${siteUrl}/pago-fallido.html`,
    },
    auto_return: "approved",
  };

  try {
    const resp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { statusCode: 500, body: JSON.stringify({ error: data }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ init_point: data.init_point }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
