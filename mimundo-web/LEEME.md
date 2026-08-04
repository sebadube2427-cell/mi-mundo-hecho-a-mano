# Mi Mundo Hecho a Mano — Sitio Web (v3: secciones por archivo + filtros)

Esta versión agrega:
- **Una carpeta con un archivo por sección** (`js/secciones/`), y cada
  sección puede tener **subsecciones** (ej: Joyería → Aros, Collares...).
- **Panel de filtros lateral** en cada sección: material, color, tamaño,
  duración o cualquier especificación que tú definas, más un rango de
  precio, con un botón "Filtrar" (tal como pediste).
- Sigue teniendo: carrito de compras unificado, pago con Mercado Pago,
  y Google Analytics gratis (ver LEEME de la versión anterior si necesitas
  ese detalle — igual lo resumo más abajo).

## Qué archivos hay ahora
- `index.html` — página principal (hero + grilla de secciones).
- `categoria.html` — plantilla única para cualquier sección (filtros +
  productos), según `categoria.html?c=joyeria`.
- `carrito.html`, `pago-exitoso.html`, `pago-pendiente.html`,
  `pago-fallido.html` — igual que antes.
- `js/data-core.js` — datos generales del negocio (WhatsApp, Instagram) y
  el "contenedor" `SECCIONES` (normalmente no lo tocas).
- **`js/secciones/`** — una carpeta con **un archivo por sección**:
  `joyeria.js`, `decoracion-hogar.js`, `scrapbooking.js`, `talleres.js`.
  **Este es el que editas seguido.**
- `js/cart.js`, `js/ui.js`, `js/categoria.js`, `js/carrito.js`,
  `js/home.js` — la lógica del sitio, normalmente no los tocas.
- `js/analytics.js` — tu ID de Google Analytics, en un solo lugar.
- `netlify/functions/crear-preferencia.js` — crea el pago en Mercado Pago.

---

## 1) Cómo agregar una SECCIÓN nueva (ej: "Velas Aromáticas")

1. Ve a la carpeta `js/secciones/`, copia cualquier archivo (por ejemplo
   `scrapbooking.js`) y pégalo con un nombre nuevo, ej: `velas.js`.
2. Ábrelo y edita todos sus datos: `slug`, `nombre`, `etiqueta`,
   `descripcion`, `imagen_portada`, `subsecciones`, `filtros` e `items`
   (ver los pasos 2, 3 y 4 más abajo para cada parte).
3. Agrega **una línea** por ese archivo nuevo en las páginas HTML. Busca
   en cada archivo el bloque que dice:
   ```html
   <!-- SECCIONES: si agregas una sección nueva, agrega aquí su línea (ver LEEME.md) -->
   <script src="js/secciones/joyeria.js"></script>
   <script src="js/secciones/decoracion-hogar.js"></script>
   <script src="js/secciones/scrapbooking.js"></script>
   <script src="js/secciones/talleres.js"></script>
   <!-- fin secciones -->
   ```
   y agrega tu línea nueva ahí, por ejemplo:
   ```html
   <script src="js/secciones/velas.js"></script>
   ```
   Este bloque aparece en **6 archivos**: `index.html`, `categoria.html`,
   `carrito.html`, `pago-exitoso.html`, `pago-pendiente.html` y
   `pago-fallido.html`. Agrega la misma línea en los 6 (es pegar la misma
   línea seis veces, un trabajo mecánico, no hay que pensarlo mucho).

Con eso, la sección nueva aparece sola en el menú, en la página principal
y ya tiene su propia página con filtros funcionando.

**Para quitar una sección**: borra su archivo en `js/secciones/` y borra
esa misma línea `<script>` de los 6 archivos HTML.

## 2) Cómo agregar SUBSECCIONES (ej: Joyería → Aros, Collares...)

Dentro del archivo de tu sección (ej: `js/secciones/joyeria.js`), busca
`subsecciones`:
```js
subsecciones: [
  { slug: "aros", nombre: "Aros" },
  { slug: "collares", nombre: "Collares" },
],
```
- `slug`: identificador simple, sin tildes ni espacios (se usa internamente).
- `nombre`: lo que ve la clienta.

Agrega o quita bloques `{ slug: "...", nombre: "..." }` según necesites.
Si una sección no necesita subsecciones, deja `subsecciones: []`.

Luego, en cada producto (dentro de `items`), indica a cuál pertenece:
```js
{
  nombre: "Aros de resina boho",
  ...
  subseccion: "aros",   // debe coincidir con un "slug" de arriba
}
```
Las subsecciones aparecen automáticamente como el primer grupo de filtros
("Tipo") en el panel lateral de esa sección.

## 3) Cómo agregar una ESPECIFICACIÓN nueva a los productos (ej: "material")

Cada producto tiene un campo `especificaciones`, con las llaves que tú
quieras:
```js
{
  nombre: "Collar con dije de flor prensada",
  ...
  especificaciones: { material: "Plata", color: "Dorado" }
}
```
Puedes agregar cualquier llave nueva, por ejemplo `talla`, `peso`,
`aroma`, etc:
```js
especificaciones: { material: "Cera de soja", aroma: "Lavanda", talla: "M" }
```
Recuerda escribir **exactamente la misma llave** (sin tildes, en minúscula)
en todos los productos de esa sección donde quieras usarla, para que el
filtro los agrupe bien.

## 4) Cómo hacer que una especificación aparezca en el filtro lateral

Esto es el único paso "de programación" real, pero es muy mecánico. En el
mismo archivo de la sección, busca `filtros`:
```js
filtros: [
  { clave: "material", etiqueta: "Material" },
  { clave: "color", etiqueta: "Color" },
],
```
- `clave`: debe ser **exactamente igual** a la llave que usaste en
  `especificaciones` (paso 3).
- `etiqueta`: el título que ve la clienta en el panel de filtros.

Para agregar un filtro nuevo (ej. "aroma"):
```js
filtros: [
  { clave: "material", etiqueta: "Material" },
  { clave: "aroma", etiqueta: "Aroma" },
],
```
El panel de filtros arma solo las opciones (ej: "Lavanda", "Vainilla",
"Eucalipto"...) leyendo los valores que existan en tus productos — no hace
falta escribir la lista de opciones a mano en ningún otro lado.

El filtro de **precio** (mínimo y máximo) siempre aparece automáticamente
en todas las secciones, no necesitas configurarlo.

### Cómo funciona el filtro para la clienta
En el panel lateral, la clienta puede marcar varias opciones (por ejemplo
Material: Plata, Color: Rosado, Precio máximo: 15.000) y luego presiona el
botón **"Filtrar"** para aplicar todo junto. El botón **"Limpiar"** saca
todos los filtros y vuelve a mostrar todo. En el celular, el panel se abre
como un cajón lateral con el botón "Filtrar" que aparece arriba de los
productos.

---

## 5) Pago con Mercado Pago (resumen — igual que antes)
1. Entra a tu cuenta de Mercado Pago → **Credenciales de producción**
   (https://www.mercadopago.cl/developers/panel).
2. Copia tu **Access Token**.
3. En Netlify: **Site configuration → Environment variables** → agrega
   `MP_ACCESS_TOKEN` con ese valor.
4. Vuelve a publicar el sitio (**Deploys → Trigger deploy**).

Tu Access Token nunca se escribe en los archivos del sitio.

## 6) Publicar en Netlify (resumen)
1. Crea una cuenta gratis en https://app.netlify.com
2. Sube la carpeta a un repositorio de GitHub y en Netlify elige
   **"Import from Git"**, o arrastra la carpeta con **"Deploy manually"**.
3. Netlify detecta `netlify.toml` y activa la función de pago solo.
4. Configura `MP_ACCESS_TOKEN` (paso 5).
5. En **Domain settings**, conecta tu dominio propio.

Sigues pagando solo el **dominio**; Netlify es gratis para un sitio así.

## 6.1) Cómo probar el sitio ANTES de comprar dominio y hosting

**Opción rápida:** haz doble clic en `index.html` para abrirlo en tu
navegador. Puedes navegar, usar los filtros y agregar productos al
carrito. El botón "Pagar con Mercado Pago" no funcionará así (necesita la
función de servidor), pero el sitio lo detecta y ofrece WhatsApp en su
lugar, así que nunca se ve roto.

**Opción completa y gratis:** sigue el paso 6 de arriba (Netlify) sin
comprar dominio todavía — Netlify te da una URL gratis tipo
`algo.netlify.app`, 100% funcional, incluido el pago. Para simular una
compra sin cobrar de verdad, usa tus **credenciales de prueba** de
Mercado Pago (mismo panel de desarrolladores, tiene un botón para generar
"usuarios de prueba") en vez del Access Token de producción. Cuando estés
conforme, compras el dominio y lo conectas a esa misma cuenta de Netlify —
el sitio no cambia, solo agregas el dominio.

## 7) Google Analytics (gratis)
1. Crea una propiedad en https://analytics.google.com y copia tu ID
   (empieza con "G-").
2. Ábrelo en `js/analytics.js` y reemplaza `"G-XXXXXXXXXX"` por tu ID real.
3. Vuelve a publicar el sitio.

## 8) Fotos reales
Sube tus fotos a un servicio gratuito como https://imgur.com, copia el
enlace directo, y pégalo en el campo `imagen` (o `imagen_portada` para la
foto de portada de la sección) dentro del archivo correspondiente en
`js/secciones/`.

## Sobre Webpay (Transbank)
Igual que antes: Mercado Pago es autoservicio inmediato; Webpay requiere
afiliación comercial con Transbank. Si más adelante te afilias, se puede
migrar solo `netlify/functions/crear-preferencia.js` — el carrito y los
filtros no cambian.

---

Cualquier especificación nueva que quieras agregar (tallas, aromas,
técnicas, lo que sea) sigue el mismo patrón de los pasos 3 y 4. Si en
algún momento quieres que te deje ya armada una sección o un filtro nuevo,
solo dime cuál y lo dejo listo en los archivos.
