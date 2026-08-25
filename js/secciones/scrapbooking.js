/* =========================================================
   SECCIÓN: Scrapbooking
   ========================================================= */

SECCIONES.push({
  slug: "scrapbooking",
  nombre: "Scrapbooking",
  etiqueta: "colección",
  descripcion: "Álbumes, tarjetas y papelería decorativa para guardar y regalar recuerdos con mucho cariño.",
  imagen_portada: "https://picsum.photos/seed/cat-scrap/700/700",

  subsecciones: [
    { slug: "albumes", nombre: "Álbumes" },
    { slug: "tarjetas", nombre: "Tarjetas" },
    { slug: "cajas", nombre: "Cajas de recuerdos" },
    { slug: "diarios", nombre: "Diarios" },
  ],

  filtros: [
    { clave: "material", etiqueta: "Material" },
    { clave: "tamano", etiqueta: "Tamaño" },
  ],

  items: [
    {
      nombre: "Álbum de fotos personalizado",
      descripcion: "Álbum artesanal a tu gusto, 20 páginas decoradas.",
      precio: 22000,
      imagen: "https://picsum.photos/seed/scrap1/500/500",
      subseccion: "albumes",
      especificaciones: { material: "Cartón forrado", tamano: "Grande" },
      masVendido: true
    },
    {
      nombre: "Set de tarjetas decorativas (x5)",
      descripcion: "Tarjetas para regalar, distintos diseños a mano.",
      precio: 8000,
      imagen: "https://picsum.photos/seed/scrap2/500/500",
      subseccion: "tarjetas",
      especificaciones: { material: "Papel", tamano: "Chico" }
    },
    {
      nombre: "Caja de recuerdos decorada",
      descripcion: "Caja de madera forrada y decorada a mano.",
      precio: 14000,
      imagen: "https://picsum.photos/seed/scrap3/500/500",
      subseccion: "cajas",
      especificaciones: { material: "Madera", tamano: "Mediano" }
    },
    {
      nombre: "Diario / journal decorado",
      descripcion: "Cuaderno tapa dura con intervención artesanal.",
      precio: 12000,
      imagen: "https://picsum.photos/seed/scrap4/500/500",
      subseccion: "diarios",
      especificaciones: { material: "Cartón forrado", tamano: "Mediano" }
    },
  ]
});
