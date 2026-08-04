/* =========================================================
   GOOGLE ANALYTICS (gratis) — GA4

   1) Crea una cuenta gratis en https://analytics.google.com
   2) Crea una "propiedad" para tu sitio y copia tu ID de medición
      (empieza con "G-", ejemplo: G-ABC1234XYZ).
   3) Pégalo abajo, reemplazando el texto entre comillas.
   4) Listo — se activa solo, en todas las páginas del sitio.

   Mientras no pongas tu ID real, Analytics queda desactivado
   (no se envía ningún dato).
   ========================================================= */

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // <-- reemplaza esto por tu ID real

(function () {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf("XXXX") !== -1) return;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
})();
