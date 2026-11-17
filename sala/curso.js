/* Contenido de la sala. Para publicar una clase, pega el ID del video de YouTube
   (lo que va después de "v=" o de "youtu.be/") en `video`. Si está vacío, la clase
   aparece como "Muy pronto". */
window.CURSO = {
  titulo: "Tu primera canción en Live 13",
  subtitulo: "Curso gratis para quienes adquirieron su licencia con Ernesto Malaca",
  autor: "Ernesto Malaca",

  // URL de la aplicación web de Apps Script que guarda los registros (vacío = no se envía).
  registro: "",

  clases: [
    {
      id: "c1",
      titulo: "Qué cambia y cómo moverte",
      duracion: "9 min",
      video: "",
      descripcion: "Abrimos Live 13 y te enseño el nuevo modo de cargar cosas: dispositivos y presets desde la propia cadena y desde el mezclador, sin pelearte con el navegador.",
      logras: "Tu proyecto listo y tu flujo para cargar sonidos más rápido."
    },
    {
      id: "c2",
      titulo: "El beat",
      duracion: "10 min",
      video: "",
      descripcion: "Armamos el ritmo de la canción con el nuevo Step Sequencer, con ajustes por fila y por paso, y diseñamos los sonidos del kit con Drum Synth.",
      logras: "El beat de tu canción, con un kit diseñado por ti."
    },
    {
      id: "c3",
      titulo: "Ideas melódicas",
      duracion: "9 min",
      video: "",
      descripcion: "Usamos Looplet para generar y transformar ideas melódicas a partir de lo que ya tienes, y elegimos la que va a guiar la canción.",
      logras: "La melodía y la armonía principal de tu canción."
    },
    {
      id: "c4",
      titulo: "Voz y audio",
      duracion: "10 min",
      video: "",
      descripcion: "Grabamos y editamos audio dentro de Live con plug-ins ARA 2 y Melodyne Essential: afinar, ajustar tiempos y limpiar una voz sin salir del proyecto.",
      logras: "Una voz o instrumento grabado y editado en tu canción."
    },
    {
      id: "c5",
      titulo: "Diseño de sonido con Racks",
      duracion: "9 min",
      video: "",
      descripcion: "Construimos un efecto propio con 32 macros y Multiband Racks, y lo guardamos para usarlo en cualquier proyecto.",
      logras: "Tu propio Rack, listo para reutilizar."
    },
    {
      id: "c6",
      titulo: "Mezcla y cierre",
      duracion: "10 min",
      video: "",
      descripcion: "Terminamos la canción con el Performance Mixer y las nuevas herramientas de dinámica, y la exportamos.",
      logras: "Tu canción terminada y exportada."
    }
  ],

  // Descarga de la canción del curso (vacío = "Muy pronto").
  cancion: { titulo: "Descarga la canción del curso", url: "" },

  // Constancia en PDF. Se desbloquea al marcar todas las clases como vistas
  // y la envía el Apps Script (necesita `registro`).
  constancia: { titulo: "Recibe tu constancia" },

  // Examen opcional (vacío = no aparece).
  examen: { titulo: "Examen opcional", url: "" }
};
