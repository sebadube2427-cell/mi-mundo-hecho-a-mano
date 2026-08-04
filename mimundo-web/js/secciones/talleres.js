/* =========================================================
   SECCIÓN: Talleres y Clases
   ========================================================= */

SECCIONES.push({
  slug: "talleres",
  nombre: "Talleres y Clases",
  etiqueta: "aprende a crear",
  descripcion: "Clases personalizadas (1 a 1) o grupales, presenciales u online. Elige la modalidad que más te acomode.",
  imagen_portada: "https://picsum.photos/seed/cat-talleres/700/700",

  subsecciones: [
    { slug: "individual", nombre: "Individual" },
    { slug: "grupal", nombre: "Grupal" },
    { slug: "online", nombre: "Online" },
  ],

  filtros: [
    { clave: "duracion", etiqueta: "Duración" },
  ],

  items: [
    {
      nombre: "Clase individual de pintura decorativa",
      descripcion: "Sesión 1 a 1, a tu ritmo, elige tú la técnica a aprender.",
      precio: 25000,
      imagen: "https://picsum.photos/seed/clase1/500/500",
      subseccion: "individual",
      especificaciones: { duracion: "2 horas" }
    },
    {
      nombre: "Clase grupal de pintura decorativa",
      descripcion: "Grupos reducidos (máx. 6 personas), ideal para ir con amigas.",
      precio: 18000,
      imagen: "https://picsum.photos/seed/clase2/500/500",
      subseccion: "grupal",
      especificaciones: { duracion: "2 horas" },
      masVendido: true
    },
    {
      nombre: "Taller de scrapbooking",
      descripcion: "Aprende a armar tu propio álbum o tarjetas decorativas.",
      precio: 20000,
      imagen: "https://picsum.photos/seed/clase3/500/500",
      subseccion: "grupal",
      especificaciones: { duracion: "2,5 horas" }
    },
    {
      nombre: "Clase personalizada online",
      descripcion: "Aprende desde casa, coordinamos día y horario por WhatsApp.",
      precio: 15000,
      imagen: "https://picsum.photos/seed/clase4/500/500",
      subseccion: "online",
      especificaciones: { duracion: "1,5 horas" }
    },
  ]
});
