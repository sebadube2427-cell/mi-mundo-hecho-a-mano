/* =========================================================
   SECCIÓN: Joyería

   Para crear una sección nueva, copia este archivo completo,
   cámbiale el nombre (ej: js/secciones/velas.js) y edita todo
   lo de abajo. Luego agrégalo en las páginas HTML — ver el
   paso 1 de LEEME.md.
   ========================================================= */

SECCIONES.push({
  slug: "joyeria",
  nombre: "Joyería",
  etiqueta: "colección",
  descripcion: "Aros, collares, pulseras y anillos hechos a mano, en piezas únicas o series muy limitadas.",
  imagen_portada: "https://picsum.photos/seed/cat-joyeria/700/700",

  subsecciones: [
    { slug: "aros", nombre: "Aros" },
    { slug: "collares", nombre: "Collares" },
    { slug: "pulseras", nombre: "Pulseras" },
    { slug: "anillos", nombre: "Anillos" },
  ],

  filtros: [
    { clave: "material", etiqueta: "Material" },
    { clave: "color", etiqueta: "Color" },
  ],

  /* -------------------------------------------------------
     Cada producto puede tener:
     - slug: opcional. Si no lo pones, se genera solo desde el
       nombre (ej: "Aros de resina boho" → "aros-de-resina-boho").
       Ponlo tú mismo solo si quieres una URL más corta o si dos
       productos quedarían con el mismo slug automático.
     - imagenes: opcional, lista de fotos para la galería del
       producto. Si no la pones, se usa solo "imagen".
     - descripcion_larga: opcional, texto más detallado para la
       ficha del producto. Si no la pones, se usa "descripcion".
     ------------------------------------------------------- */
  items: [
    {
      nombre: "Aros de resina boho",
      descripcion: "Aros livianos con flores prensadas, hechos a mano.",
      descripcion_larga: "Aros livianos hechos a mano en resina transparente, con flores naturales prensadas selladas en su interior. Cada par es único porque las flores nunca quedan exactamente igual. Broche de acero quirúrgico, hipoalergénico.",
      precio: 12000,
      imagen: "https://picsum.photos/seed/joya1/500/500",
      imagenes: [
        "https://picsum.photos/seed/joya1/500/500",
        "https://picsum.photos/seed/joya1b/500/500",
        "https://picsum.photos/seed/joya1c/500/500",
      ],
      subseccion: "aros",
      especificaciones: { material: "Resina", color: "Transparente" },
      masVendido: true
    },
    {
      nombre: "Collar con dije de flor prensada",
      descripcion: "Dije de resina con flor natural prensada, cadena fina.",
      precio: 15000,
      precio_oferta: 11900,
      imagen: "https://picsum.photos/seed/joya2/500/500",
      subseccion: "collares",
      especificaciones: { material: "Plata", color: "Dorado" }
    },
    {
      nombre: "Pulsera de macramé con piedras",
      descripcion: "Tejida a mano con piedras naturales, ajustable.",
      precio: 9000,
      imagen: "https://picsum.photos/seed/joya3/500/500",
      subseccion: "pulseras",
      especificaciones: { material: "Hilo macramé", color: "Café" }
    },
    {
      nombre: "Aretes colgantes de arcilla polimérica",
      descripcion: "Diseño artesanal pintado a mano, muy livianos.",
      descripcion_larga: "Aretes colgantes trabajados a mano en arcilla polimérica, pintados uno a uno con pintura acrílica y sellados con barniz mate. Terminación en gancho de acero quirúrgico. Por ser piezas artesanales, pueden existir pequeñas variaciones entre pares.",
      precio: 10000,
      imagen: "https://picsum.photos/seed/joya4/500/500",
      imagenes: [
        "https://picsum.photos/seed/joya4/500/500",
        "https://picsum.photos/seed/joya4b/500/500",
      ],
      subseccion: "aros",
      especificaciones: { material: "Arcilla polimérica", color: "Rosado" },
      masVendido: true
    },
    {
      nombre: "Anillo ajustable de plata",
      descripcion: "Anillo fino ajustable, ideal para combinar.",
      precio: 11000,
      imagen: "https://picsum.photos/seed/joya5/500/500",
      subseccion: "anillos",
      especificaciones: { material: "Plata", color: "Plateado" }
    },
    {
      nombre: "Collar largo con mostacillas",
      descripcion: "Collar tejido a mano con mostacillas de colores.",
      precio: 13000,
      imagen: "https://picsum.photos/seed/joya6/500/500",
      subseccion: "collares",
      especificaciones: { material: "Mostacillas", color: "Rosado" }
    },
    {
      nombre: "Anillo fino de oro laminado",
      descripcion: "Anillo delicado bañado en oro, apilable.",
      precio: 14000,
      imagen: "https://picsum.photos/seed/joya7/500/500",
      subseccion: "anillos",
      especificaciones: { material: "Oro", color: "Dorado" }
    },
  ]
});
