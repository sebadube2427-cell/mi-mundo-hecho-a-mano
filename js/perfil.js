/* =========================================================
   PERFIL — información sobre la profesora / creadora.
   Edita este archivo cuando quieras actualizar su historia,
   sus fotos o sus especialidades.
   ========================================================= */

const PROFESORA = {
  nombre: "Margot vazque", // <-- cambia esto por el nombre real
  foto: "https://picsum.photos/seed/profesora/700/850",
  titulo: "Fundadora de Mi Mundo Hecho a Mano",

  // Año en que empezó — se usa para calcular "X años creando" solo.
  desde: 2014,

  // Texto corto, se usa en el adelanto de la página principal.
  bio_corta: "Profesora certificada de arcilla polimerica, manualidades y decoración de hogar.",

  // Texto largo, se usa en la página "Sobre mí" completa.
  bio_larga: "Todo empezó pintando cuadros para regalar a mi familia y amigas, sin pensar que algún día sería mi oficio. Con los años fui sumando técnicas — resina, macramé, decoración de objetos, scrapbooking — siempre a mano, siempre con calma, siempre probando algo nuevo. Hoy 'Mi Mundo Hecho a Mano' reúne todo ese camino: las piezas que hago y vendo, y las clases donde enseño lo que he aprendido a quienes también quieren crear con sus manos.",

  especialidades: [
    "Pintura decorativa",
    "Joyería en resina",
    "Macramé",
    "Scrapbooking",
    "Decoración de objetos",
  ],

  // Opcional: hitos de su historia, se muestran como línea de tiempo.
  // Para agregar uno, copia un bloque { anio, texto }. Para quitarlo, bórralo.
  hitos: [
    { anio: "2018", texto: "Empezó pintando cuadros por encargo para familia y amigas." },
    { anio: "2020", texto: "Abrió su primer taller de pintura decorativa, en su propia casa." },
    { anio: "2022", texto: "Sumó joyería artesanal en resina y macramé al catálogo." },
    { anio: "2024", texto: "Incorporó scrapbooking y clases grupales y online." },
  ],

  // Opcional: fotos de trabajos propios para la galería de "Sobre mí".
  // Para agregar una, copia una línea con el link a la foto.
  fotos_trabajos: [
    "https://picsum.photos/seed/trabajo1/500/500",
    "https://picsum.photos/seed/trabajo2/500/500",
    "https://picsum.photos/seed/trabajo3/500/500",
    "https://picsum.photos/seed/trabajo4/500/500",
    "https://picsum.photos/seed/trabajo5/500/500",
    "https://picsum.photos/seed/trabajo6/500/500",
  ],
};