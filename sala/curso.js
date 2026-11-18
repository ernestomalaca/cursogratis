/* Contenido de la sala.
   - video: el ID del video oculto de YouTube (lo que va después de "v=" o de "youtu.be/").
     Vacío = la clase aparece como "Muy pronto".
   - abre: opcional, fecha y hora en que se libera la clase, p. ej. "2026-11-20T20:00:00-06:00".
     Antes de esa hora la clase sale con candado y "Se libera pronto".
   - preguntas: opcionales, aparecen al terminar la clase y se pueden saltar.
     correcta = número de la opción buena, contando desde 0.
     BORRADOR: las preguntas se basan en el temario; ajústalas a lo que digas en cada video. */
window.CURSO = {
  titulo: "Tu primera canción en Live 13",
  subtitulo: "Curso gratis para quienes adquirieron su licencia con Ernesto Malaca",
  autor: "Ernesto Malaca",

  // URL de la aplicación web de Apps Script que guarda los registros (vacío = no se envía).
  registro: "https://script.google.com/macros/s/AKfycbzAV3Ubipmf6SLvuOmJmq4mzdgfJJcA69dB5C1tIZY0PY8MoCyVLvx4IjMF3G8v65U/exec",

  clases: [
    {
      id: "c1",
      titulo: "Qué cambia y cómo moverte",
      duracion: "9 min",
      video: "m2u5JE9OmcI",
      descripcion: "Abrimos Live 13 y te enseño el nuevo modo de cargar cosas: dispositivos y presets desde la propia cadena y desde el mezclador, sin pelearte con el navegador.",
      logras: "Tu proyecto listo y tu flujo para cargar sonidos más rápido.",
      abre: "",
      preguntas: [
        { q: "En Live 13, ¿desde dónde puedes cargar dispositivos y cambiar presets sin ir al navegador?",
          opciones: ["Desde la propia cadena de dispositivos y los slots del mezclador", "Solo desde el navegador, como siempre", "Desde la ventana de Preferencias"],
          correcta: 0, porque: "Con la navegación contextual cargas y cambias presets ahí mismo donde estás trabajando." },
        { q: "¿Qué edición de Live trae todas las novedades que vemos en el curso?",
          opciones: ["Live Intro", "Live Standard", "Live Suite"],
          correcta: 2, porque: "Varias de las novedades de Live 13 son exclusivas de Suite." }
      ]
    },
    {
      id: "c2",
      titulo: "El secuenciador",
      duracion: "10 min",
      video: "",
      descripcion: "Armamos el ritmo de la canción con el nuevo Step Sequencer, con ajustes por fila y por paso, y diseñamos los sonidos del kit con Drum Synth.",
      logras: "El beat de tu canción, con un kit diseñado por ti.",
      abre: "",
      preguntas: [
        { q: "¿Qué tiene de especial el nuevo Step Sequencer?",
          opciones: ["Solo sirve para baterías", "Ajustes independientes por fila y controles por paso", "Reemplaza al Piano Roll"],
          correcta: 1, porque: "Cada fila tiene sus propios ajustes y cada paso sus controles, ideal para beats, melodías y polirritmos." },
        { q: "¿Para qué usamos Drum Synth en esta clase?",
          opciones: ["Para diseñar los sonidos del kit", "Para mezclar el beat", "Para exportar los stems"],
          correcta: 0, porque: "Drum Synth genera los sonidos de batería desde cero, con varios motores." }
      ]
    },
    {
      id: "c3",
      titulo: "Ideas melódicas",
      duracion: "9 min",
      video: "",
      descripcion: "Usamos Looplet para generar y transformar ideas melódicas a partir de lo que ya tienes, y elegimos la que va a guiar la canción.",
      logras: "La melodía y la armonía principal de tu canción.",
      abre: "",
      preguntas: [
        { q: "¿Qué es Looplet?",
          opciones: ["Un nuevo modo de grabación de audio", "Un dispositivo de Max for Live para generar y transformar ideas melódicas", "Un efecto de reverb"],
          correcta: 1, porque: "Looplet viene en Live 13 Suite y sirve para explorar variaciones de una idea." },
        { q: "¿Con qué terminamos esta clase?",
          opciones: ["Con la mezcla final", "Con la melodía y la armonía principal de la canción", "Con la voz grabada"],
          correcta: 1, porque: "El objetivo era elegir la idea que va a guiar toda la canción." }
      ]
    },
    {
      id: "c4",
      titulo: "Voz y audio",
      duracion: "10 min",
      video: "",
      descripcion: "Grabamos y editamos audio dentro de Live con plug-ins ARA 2 y Melodyne Essential: afinar, ajustar tiempos y limpiar una voz sin salir del proyecto.",
      logras: "Una voz o instrumento grabado y editado en tu canción.",
      abre: "",
      preguntas: [
        { q: "¿Qué permiten los plug-ins compatibles con ARA 2 en Live 13?",
          opciones: ["Editar clips de audio dentro de Live", "Grabar video", "Sincronizar Live con otro DAW"],
          correcta: 0, porque: "Con ARA 2 el plug-in trabaja directo sobre el clip, sin exportar ni importar audio." },
        { q: "¿Qué editor de afinación incluye Live 13 Suite?",
          opciones: ["Auto-Tune Pro", "Melodyne Essential", "VocAlign"],
          correcta: 1, porque: "Suite trae Melodyne Essential para afinar y ajustar tiempos." }
      ]
    },
    {
      id: "c5",
      titulo: "Diseño de sonido con Racks",
      duracion: "9 min",
      video: "",
      descripcion: "Construimos un efecto propio con 32 macros y Multiband Racks, y lo guardamos para usarlo en cualquier proyecto.",
      logras: "Tu propio Rack, listo para reutilizar.",
      abre: "",
      preguntas: [
        { q: "¿Cuántas macros puede tener un Rack en Live 13?",
          opciones: ["8", "16", "32"],
          correcta: 2, porque: "Los Racks pasan a 32 macros." },
        { q: "¿Qué tipo de Rack nuevo aparece en Live 13?",
          opciones: ["Multiband Rack", "Video Rack", "Mastering Rack"],
          correcta: 0, porque: "Los Multiband Racks dividen la señal por bandas para procesar cada una por separado." }
      ]
    },
    {
      id: "c6",
      titulo: "Mezcla y cierre",
      duracion: "10 min",
      video: "",
      descripcion: "Terminamos la canción con el Performance Mixer y las nuevas herramientas de dinámica, y la exportamos.",
      logras: "Tu canción terminada y exportada.",
      abre: "",
      preguntas: [
        { q: "¿Qué herramienta nueva usamos para la mezcla?",
          opciones: ["El Performance Mixer", "El Session Mixer clásico", "Un plug-in externo"],
          correcta: 0, porque: "El Performance Mixer es una de las novedades de Live 13 para mezclar y tocar en vivo." },
        { q: "¿Cómo termina la clase?",
          opciones: ["Grabando la voz", "Exportando la canción terminada", "Armando el beat"],
          correcta: 1, porque: "Al final exportamos la canción completa." }
      ]
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
