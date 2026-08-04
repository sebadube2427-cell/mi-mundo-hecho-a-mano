/* =========================================================
   SECCIÓN: Decoración de Hogar
   ========================================================= */

SECCIONES.push({
  slug: "decoracion-hogar",
  nombre: "Decoración de Hogar",
  etiqueta: "colección",
  descripcion: "Cuadros pintados a mano, espejos, portavelas y objetos que le dan un rincón especial a tu casa.",
  imagen_portada: "https://picsum.photos/seed/cat-decor/700/700",

  subsecciones: [
    { slug: "cuadros", nombre: "Cuadros" },
    { slug: "espejos", nombre: "Espejos" },
    { slug: "portavelas", nombre: "Portavelas" },
    { slug: "macetas", nombre: "Macetas" },
  ],

  filtros: [
    { clave: "material", etiqueta: "Material" },
    { clave: "color", etiqueta: "Color" },
  ],

  items: [
    {
      nombre: "Cuadro floral pintado a mano",
      descripcion: "Acrílico sobre tela, 30x40cm, listo para colgar.",
      precio: 28000,
      imagen: "https://picsum.photos/seed/decor1/500/500",
      subseccion: "cuadros",
      especificaciones: { material: "Tela/Acrílico", color: "Multicolor" },
      masVendido: true
    },
    {
      nombre: "Espejo decorado con mosaico",
      descripcion: "Marco intervenido a mano con técnica de mosaico.",
      precio: 24000,
      precio_oferta: 19000,
      imagen: "https://picsum.photos/seed/decor2/500/500",
      subseccion: "espejos",
      especificaciones: { material: "Vidrio", color: "Dorado" }
    },
    {
      nombre: "Set de portavelas pintados",
      descripcion: "Vidrio reciclado pintado a mano, set de 3.",
      precio: 16000,
      imagen: "https://picsum.photos/seed/decor3/500/500",
      subseccion: "portavelas",
      especificaciones: { material: "Vidrio", color: "Blanco" }
    },
    {
      nombre: "Maceta pintada a mano",
      descripcion: "Cerámica pintada con diseño floral, tamaño mediano.",
      precio: 13000,
      imagen: "https://picsum.photos/seed/decor4/500/500",
      subseccion: "macetas",
      especificaciones: { material: "Cerámica", color: "Terracota" }
    },
    {
      nombre: "Cuadro con frase pintada",
      descripcion: "Madera pintada a mano con frase a elección.",
      precio: 19000,
      imagen: "https://picsum.photos/seed/decor5/500/500",
      subseccion: "cuadros",
      especificaciones: { material: "Madera", color: "Blanco" }
    },
  ]
});
