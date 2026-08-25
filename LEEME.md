# Mi Mundo Hecho a Mano — Sitio Web

Tienda online completa: secciones con subsecciones y filtros, mega-menú de
navegación, carrito de compras con pago unificado en Mercado Pago, ficha de
detalle para cada producto, y Google Analytics gratis.

## Estructura de archivos

- `index.html` — página principal (promo bar, hero, tabs de categorías,
  carrusel de más vendidos, bloques por sección).
- `categoria.html` — plantilla única para cualquier sección, con su panel
  de filtros (`categoria.html?c=joyeria`).
- `producto.html` — plantilla única para la ficha de cualquier producto,
  con galería de fotos (`producto.html?c=joyeria&p=aros-de-resina-boho`).
- `carrito.html` — el carrito de compras.
- `pago-exitoso.html`, `pago-pendiente.html`, `pago-fallido.html` — a estas
  páginas te devuelve Mercado Pago después de un pago.
- `js/data-core.js` — datos generales del negocio (WhatsApp, Instagram).
- **`js/secciones/`** — un archivo por sección (`joyeria.js`,
  `decoracion-hogar.js`, `scrapbooking.js`, `talleres.js`). **Este es el
  que editas seguido.**
- `js/analytics.js` — tu ID de Google Analytics, en un solo lugar.
- `js/ui.js`, `js/cart.js`, `js/home.js`, `js/categoria.js`,
  `js/producto.js`, `js/carrito.js` — la lógica del sitio, normalmente no
  los tocas.
- `netlify/functions/crear-preferencia.js` — crea el pago en Mercado Pago.
- `netlify.toml` — configuración de Netlify (no la toques).

---

## 1) Agregar o quitar una SECCIÓN completa

1. En `js/secciones/`, copia un archivo existente y ponle un nombre nuevo
   (ej: `velas.js`).
2. Edita `slug`, `nombre`, `etiqueta`, `descripcion`, `imagen_portada`,
   `subsecciones`, `filtros` e `items` (ver pasos 2 a 5).
3. Agrega una línea `<script src="js/secciones/velas.js"></script>` en el
   bloque marcado `<!-- SECCIONES: ... -->` dentro de **`index.html`,
   `categoria.html`, `producto.html`, `carrito.html`, `pago-exitoso.html`,
   `pago-fallido.html` y `pago-pendiente.html`** (7 archivos — es pegar la
   misma línea siete veces).

La sección nueva aparece sola en el menú, en la portada y ya tiene su
página y filtros funcionando. Para quitar una sección: borra su archivo y
esa misma línea en los 7 HTML.

## 2) Subsecciones (ej: Joyería → Aros, Collares...)

Dentro del archivo de la sección:
```js
subsecciones: [
  { slug: "aros", nombre: "Aros" },
  { slug: "collares", nombre: "Collares" },
],
```
Y en cada producto: `subseccion: "aros"` (debe coincidir con un slug de
arriba). Aparecen solas como el primer filtro ("Tipo") del panel lateral y
en el mega-menú de navegación.

## 3) Especificaciones y filtros (material, color, tamaño, lo que quieras)

Cada producto tiene un campo libre `especificaciones`:
```js
especificaciones: { material: "Plata", color: "Dorado" }
```
Para que una especificación aparezca como filtro, declárala en `filtros`
dentro del archivo de la sección:
```js
filtros: [
  { clave: "material", etiqueta: "Material" },
  { clave: "color", etiqueta: "Color" },
],
```
`clave` debe ser igual a la llave usada en `especificaciones`. Las
opciones del filtro se arman solas leyendo tus productos. El precio
(mínimo/máximo) aparece siempre automático. El primer filtro de la lista
también se usa para los accesos rápidos del mega-menú (ej. "En plata",
"En oro").

## 4) Fichas de producto (foto, descripción y "Agregar al carrito")

Cada producto ya tiene su propia página automáticamente — no tienes que
crear nada. Al hacer clic en la foto o el nombre de un producto (o en su
botón "Ver detalle"), se abre `producto.html` con su información.

Campos opcionales para mejorar esa ficha:
```js
{
  nombre: "Aros de resina boho",
  descripcion: "Aros livianos con flores prensadas, hechos a mano.",
  descripcion_larga: "Texto más largo y detallado, solo para la ficha.",
  precio: 12000,
  imagen: "https://...",
  imagenes: [ "https://...", "https://...", "https://..." ],  // galería
  slug: "aros-resina-boho", // opcional, ver más abajo
  ...
}
```
- Si no pones `imagenes`, la ficha usa solo `imagen`.
- Si no pones `descripcion_larga`, la ficha usa `descripcion`.
- Si no pones `slug`, se genera solo a partir del nombre. Solo agrégalo tú
  si quieres una URL más corta, o si dos productos de la misma sección
  quedarían con el mismo nombre.

## 5) Destacados y descuentos

```js
masVendido: true                 // aparece en el carrusel "Lo más vendido"
precio_oferta: 11900              // si es menor que "precio", muestra oferta
```

## 6) El menú (mega-menú) y el carrito

El menú de arriba se arma solo desde tus secciones: al pasar el mouse (o
tocar, en celular) sobre una sección, se despliegan sus subsecciones y sus
accesos rápidos por especificación. No necesitas tocar nada para esto,
se actualiza solo cuando agregas/quitas secciones o subsecciones.

El ícono del carrito (arriba a la derecha) se ve siempre, en todas las
páginas, tenga o no productos — no necesitas tocar nada.

## 7) Barra de promoción

Solo aparece en `index.html` (la portada), con un botón ✕ para cerrarla
(la persona que la cierra no la vuelve a ver, queda guardado en su
navegador). Para cambiar el texto, edítalo directo en `index.html`:
```html
<div class="promo-bar" id="promoBar">
  🇨🇱 Envíos a todo Chile · <strong>Ofertas de temporada en piezas seleccionadas</strong>
  <button type="button" class="promo-close" id="promoClose" aria-label="Cerrar aviso">✕</button>
</div>
```

---

## 8) Pago con Mercado Pago
1. Entra a tu cuenta de Mercado Pago → **Credenciales de producción**
   (https://www.mercadopago.cl/developers/panel) y copia tu Access Token.
2. En Netlify: **Site configuration → Environment variables** → agrega
   `MP_ACCESS_TOKEN` con ese valor.
3. Vuelve a publicar el sitio (**Deploys → Trigger deploy**).

Tu Access Token nunca se escribe en los archivos del sitio. Mientras
pruebas, puedes usar tus credenciales de prueba de Mercado Pago para
simular compras sin cobrar de verdad.

## 9) Publicar (GitHub + Netlify, con actualización automática)
1. Sube esta carpeta completa a un repositorio en https://github.com
   (arrastrando los archivos desde la web de GitHub, o con GitHub Desktop).
2. En https://app.netlify.com → **Add new site → Import an existing
   project → Deploy with GitHub** → elige tu repositorio.
3. Deja la configuración de build tal cual viene (Netlify detecta
   `netlify.toml` solo).
4. Configura `MP_ACCESS_TOKEN` (paso 8).
5. Cada vez que subas un cambio a GitHub, Netlify lo publica solo en
   30-60 segundos.
6. Cuando quieras, conecta tu dominio propio desde **Domain settings** —
   hasta entonces, la URL gratuita de Netlify (`algo.netlify.app`) ya es
   tu sitio real, funcionando, para probar desde el celular o compartir.

## 10) Google Analytics (gratis)
1. Crea una propiedad en https://analytics.google.com y copia tu ID
   (empieza con "G-").
2. Ábrelo en `js/analytics.js` y reemplaza `"G-XXXXXXXXXX"` por tu ID real.

## 11) Fotos reales
Sube tus fotos a un servicio gratuito como https://imgur.com, copia el
enlace directo, y pégalo en `imagen`, `imagenes` o `imagen_portada` dentro
del archivo correspondiente en `js/secciones/`.

## Sobre Webpay (Transbank)
Mercado Pago es autoservicio inmediato; Webpay requiere afiliación
comercial con Transbank. Si más adelante te afilias, se puede migrar solo
`netlify/functions/crear-preferencia.js` — el carrito, los filtros y las
fichas de producto no cambian.

---

Cualquier ajuste — colores, secciones nuevas, especificaciones nuevas, el
flujo de pago — dímelo y te dejo los archivos actualizados.
