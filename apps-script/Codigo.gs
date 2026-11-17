/**
 * CURSO GRATIS · Tu primera canción en Live 13
 * Aplicación web que recibe los registros de la sala y envía la constancia en PDF.
 *
 * Pasos (una sola vez):
 *  1. Pega el ID de tu plantilla de Google Slides en PLANTILLA_ID.
 *  2. Ejecuta configurar()  → crea la hoja "Curso Live 13 · Registros" en tu Drive.
 *  3. Ejecuta probarConstancia()  → te manda una constancia de prueba a ti.
 *  4. Implementar → Nueva implementación → Aplicación web
 *       Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario
 *     Copia la URL que termina en /exec y pégala en sala/curso.js (campo registro).
 */

const CONFIG = {
  PLANTILLA_ID: 'PEGA_AQUI_EL_ID_DE_TU_PLANTILLA_DE_SLIDES',
  CURSO: 'Tu primera canción en Live 13',
  REMITENTE: 'Ernesto Malaca',
  ASUNTO: 'Tu constancia · Tu primera canción en Live 13',
  ZONA: 'America/Mexico_City'
};

const COLS = ['Correo', 'Nombre', 'Registro', 'Última visita', 'Constancia enviada', 'Notas'];

/* ---------- Web ---------- */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    const correo = String(d.correo || '').trim().toLowerCase();
    const nombre = limpiarNombre_(d.nombre);
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(correo)) return json_({ ok: false, error: 'correo' });

    const hoja = hoja_();
    const fila = buscarFila_(hoja, correo);
    const ahora = new Date();

    if (d.tipo === 'registro') {
      if (fila) {
        hoja.getRange(fila, 2).setValue(nombre || hoja.getRange(fila, 2).getValue());
        hoja.getRange(fila, 4).setValue(ahora);
      } else {
        hoja.appendRow([correo, nombre, ahora, ahora, '', '']);
      }
      return json_({ ok: true });
    }

    if (d.tipo === 'constancia') {
      let f = fila;
      if (!f) { hoja.appendRow([correo, nombre, ahora, ahora, '', '']); f = hoja.getLastRow(); }
      if (hoja.getRange(f, 5).getValue()) return json_({ ok: true, ya: true });   // una por persona
      const nombreFinal = nombre || hoja.getRange(f, 2).getValue();
      enviarConstancia_(correo, nombreFinal);
      hoja.getRange(f, 5).setValue(ahora);
      return json_({ ok: true });
    }

    return json_({ ok: false, error: 'tipo' });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return json_({ ok: true, curso: CONFIG.CURSO }); }

/* ---------- Constancia ---------- */

function enviarConstancia_(correo, nombre) {
  const fecha = Utilities.formatDate(new Date(), CONFIG.ZONA, "d 'de' MMMM 'de' yyyy");
  const copia = DriveApp.getFileById(CONFIG.PLANTILLA_ID).makeCopy('Constancia · ' + nombre);
  try {
    const pres = SlidesApp.openById(copia.getId());
    pres.replaceAllText('{{NOMBRE}}', nombre);
    pres.replaceAllText('{{FECHA}}', fechaEs_(fecha));
    pres.replaceAllText('{{CURSO}}', CONFIG.CURSO);
    pres.saveAndClose();
    const pdf = copia.getAs('application/pdf').setName('Constancia - ' + nombre + '.pdf');
    const primer = nombre.split(' ')[0];
    GmailApp.sendEmail(correo, CONFIG.ASUNTO,
      'Hola, ' + primer + ':\n\n¡Terminaste el curso "' + CONFIG.CURSO + '"! Te adjunto tu constancia.\n\n' +
      'Gracias por aprender conmigo. Si haces algo con lo que viste en el curso, me encantaría escucharlo.\n\n' +
      'Ernesto Malaca\nAbleton Certified Trainer',
      {
        name: CONFIG.REMITENTE,
        attachments: [pdf],
        htmlBody:
          '<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#1A1A1A;max-width:560px">' +
          '<p>Hola, ' + esc_(primer) + ':</p>' +
          '<p><b>¡Terminaste el curso “' + esc_(CONFIG.CURSO) + '”!</b> Te adjunto tu constancia.</p>' +
          '<p>Gracias por aprender conmigo. Si haces algo con lo que viste en el curso, me encantaría escucharlo.</p>' +
          '<p>Ernesto Malaca<br>Ableton Certified Trainer</p></div>'
      });
  } finally {
    copia.setTrashed(true);   // la copia temporal se borra; el PDF va adjunto en el correo
  }
}

/* ---------- Configuración y pruebas ---------- */

function configurar() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('HOJA_ID');
  if (!id) {
    const ss = SpreadsheetApp.create('Curso Live 13 · Registros');
    const h = ss.getSheets()[0];
    h.setName('Registros');
    h.getRange(1, 1, 1, COLS.length).setValues([COLS]).setFontWeight('bold');
    h.setFrozenRows(1);
    id = ss.getId();
    props.setProperty('HOJA_ID', id);
  }
  // Comprueba la plantilla
  const pres = SlidesApp.openById(CONFIG.PLANTILLA_ID);
  const texto = pres.getSlides().map(s => s.getShapes().map(x => { try { return x.getText().asString(); } catch (e) { return ''; } }).join(' ')).join(' ');
  console.log('Hoja de registros: https://docs.google.com/spreadsheets/d/' + id);
  console.log('Plantilla: "' + pres.getName() + '" · ' + (texto.indexOf('{{NOMBRE}}') >= 0 ? 'tiene {{NOMBRE}} ✔' : 'NO encontré {{NOMBRE}}: agrégalo en un cuadro de texto'));
  console.log('Correos disponibles hoy: ' + MailApp.getRemainingDailyQuota());
}

function probarConstancia() {
  const yo = Session.getEffectiveUser().getEmail();
  enviarConstancia_(yo, 'María José López Hernández');
  console.log('Constancia de prueba enviada a ' + yo);
}

/* ---------- Utilidades ---------- */

function hoja_() {
  const id = PropertiesService.getScriptProperties().getProperty('HOJA_ID');
  if (!id) throw new Error('Ejecuta configurar() primero.');
  return SpreadsheetApp.openById(id).getSheetByName('Registros');
}

function buscarFila_(hoja, correo) {
  const n = hoja.getLastRow();
  if (n < 2) return 0;
  const vals = hoja.getRange(2, 1, n - 1, 1).getValues();
  for (let i = 0; i < vals.length; i++) if (String(vals[i][0]).toLowerCase() === correo) return i + 2;
  return 0;
}

function limpiarNombre_(n) {
  return String(n || '').replace(/[<>{}]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80)
    .split(' ').map(p => p ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p).join(' ')
    .replace(/\b(De|Del|La|Las|Los|Y)\b/g, m => m.toLowerCase()).replace(/^./, c => c.toUpperCase());
}

function fechaEs_(f) {
  const m = { January:'enero', February:'febrero', March:'marzo', April:'abril', May:'mayo', June:'junio', July:'julio',
              August:'agosto', September:'septiembre', October:'octubre', November:'noviembre', December:'diciembre' };
  return f.replace(/[A-Z][a-z]+/g, x => m[x] || x);
}

function esc_(s) { return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c])); }

function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
