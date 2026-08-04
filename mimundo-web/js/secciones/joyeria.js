/* =========================================================
   SECCIÓN: Joyería

   Para crear una sección nueva, copia este archivo completo,
   cámbiale el nombre (ej: js/secciones/velas.js) y edita todo
   lo de abajo. Luego agrégalo en las 6 páginas HTML — ver el
   paso 1 de LEEME.md.
   ========================================================= */

SECCIONES.push({
  // identificador simple, sin tildes ni espacios — se usa en la URL
  slug: "joyeria",

  // lo que ve la clienta
  nombre: "Joyería",
  etiqueta: "colección",
  descripcion: "Aros, collares, pulseras y anillos hechos a mano, en piezas únicas o series muy limitadas.",
  imagen_portada: "https://picsum.photos/seed/cat-joyeria/700/700",

  /* -------------------------------------------------------
     SUBSECCIONES (opcional)
     Agrupan tus productos dentro de esta sección (ej: Aros,
     Collares...). Cada producto más abajo indica a cuál
     pertenece con el campo "subseccion" (usa el "slug").
     Si no quieres subsecciones en una sección, deja: []
     ------------------------------------------------------- */
  subsecciones: [
    { slug: "aros", nombre: "Aros" },
    { slug: "collares", nombre: "Collares" },
    { slug: "pulseras", nombre: "Pulseras" },
    { slug: "anillos", nombre: "Anillos" },
  ],

  /* -------------------------------------------------------
     FILTROS — qué "especificaciones" de los productos se
     pueden filtrar en el menú lateral, y con qué nombre.
     "clave" debe ser igual a la llave que uses en
     "especificaciones" dentro de cada producto (más abajo).
     Ver LEEME.md para agregar una especificación nueva.
     ------------------------------------------------------- */
  filtros: [
    { clave: "material", etiqueta: "Material" },
    { clave: "color", etiqueta: "Color" },
  ],

  items: [
    {
      nombre: "Aros de resina boho",
      descripcion: "Aros livianos con flores prensadas, hechos a mano.",
      precio: 12000,
      imagen: "https://picsum.photos/seed/joya1/500/500",
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
      precio: 10000,
      imagen: "https://picsum.photos/seed/joya4/500/500",
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
