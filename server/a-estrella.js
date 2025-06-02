// Calcula huecos libres entre eventos y rango de días
function calcularHuecosLibres(eventos, inicioDia, finDia) {
  const huecos = [];

  // Convertimos eventos a formato con start.dateTime y end.dateTime
  const eventosFormateados = eventos.map(ev => {
    const start = new Date(`${ev.fecha}T${ev.hora}:00Z`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // duración fija 1h
    return { start: { dateTime: start }, end: { dateTime: end } };
  });

  // Agrupamos días en rango
  const dias = {};
  for (let d = new Date(inicioDia); d <= finDia; d.setDate(d.getDate() + 1)) {
    const fecha = new Date(d);
    fecha.setUTCHours(0, 0, 0, 0);
    dias[fecha.toISOString().split("T")[0]] = [];
  }

  // Asignamos eventos a su día
  for (const evento of eventosFormateados) {
    const fecha = new Date(evento.start.dateTime).toISOString().split("T")[0];
    if (dias[fecha]) {
      dias[fecha].push(evento);
    }
  }

  // Para cada día, calculamos huecos entre 08:00 y 19:00
  for (const [fechaStr, eventosDia] of Object.entries(dias)) {
    const inicioLaboral = new Date(`${fechaStr}T08:00:00Z`);
    const finLaboral = new Date(`${fechaStr}T19:00:00Z`);

    const eventosOrdenados = eventosDia.sort(
      (a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime)
    );

    let cursor = inicioLaboral;

    for (const evento of eventosOrdenados) {
      const inicioEvento = new Date(evento.start.dateTime);
      if (inicioEvento > cursor) {
        huecos.push({
          inicio: new Date(cursor),
          fin: new Date(Math.min(inicioEvento, finLaboral)),
        });
      }

      const finEvento = new Date(evento.end.dateTime);
      if (finEvento > cursor) {
        cursor = new Date(Math.max(cursor, finEvento));
      }
    }

    if (cursor < finLaboral) {
      huecos.push({ inicio: new Date(cursor), fin: new Date(finLaboral) });
    }
  }

  return huecos;
}

// Divide huecos grandes en bloques del tamaño de la cita
function dividirHuecosEnBloques(huecos, duracionCita) {
  const bloques = [];

  for (const hueco of huecos) {
    let inicioBloque = new Date(hueco.inicio);

    while (inicioBloque.getTime() + duracionCita * 60000 <= hueco.fin.getTime()) {
      const finBloque = new Date(inicioBloque.getTime() + duracionCita * 60000);

      bloques.push({ inicio: new Date(inicioBloque), fin: finBloque });

      inicioBloque = finBloque;
    }
  }

  return bloques;
}

// Costo real g(n): penaliza proximidad a otros eventos
function costoReal(bloque, eventos) {
  const inicio = new Date(bloque.inicio);
  let costo = 0;

  for (const ev of eventos) {
    const inicioEv = new Date(`${ev.fecha}T${ev.hora}:00Z`).getTime();
    const finEv = inicioEv + 60 * 60 * 1000;

    let distancia = 0;
    if (inicio.getTime() < inicioEv) {
      distancia = (inicioEv - inicio.getTime()) / (1000 * 60);
    } else if (inicio.getTime() > finEv) {
      distancia = (inicio.getTime() - finEv) / (1000 * 60);
    } else {
      distancia = 0;
    }

    if (distancia === 0) {
      costo += 1000; // penalización alta por superposición o cercanía inmediata
    } else {
      costo += 1 / distancia; // penaliza más si está más cerca
    }
  }

  return costo;
}

// Heurística h(n): preferencias de hora ideal y día
function calcularHeuristica(bloque, preferencias = {}) {
  const inicio = new Date(bloque.inicio);
  let score = 0;

  if (preferencias.horaIdeal) {
    const [idealHour, idealMinute] = preferencias.horaIdeal.split(":").map(Number);
    const idealDate = new Date(inicio);
    idealDate.setUTCHours(idealHour, idealMinute, 0);

    score += Math.abs(inicio - idealDate) / (1000 * 60); 
  }

  if (
    preferencias.diasPreferidos &&
    preferencias.diasPreferidos.includes(inicio.getUTCDay())
  ) {
    score -= 10; // recompensa día preferido
  } else {
    score += 10; // penalización día no preferido
  }

  return score;
}

// Calcula f(n) = g(n) + h(n)
function calcularF(bloque, preferencias, eventos) {
  return costoReal(bloque, eventos) + calcularHeuristica(bloque, preferencias);
}

// Busca el bloque con menor f(n)
function buscarHorarioOptimo(huecos, duracionCita, preferencias = {}, eventos = []) {
  const bloques = dividirHuecosEnBloques(huecos, duracionCita);

  if (bloques.length === 0) return null;

  const candidatos = bloques.map((bloque) => ({
    bloque,
    f: calcularF(bloque, preferencias, eventos),
  }));

  candidatos.sort((a, b) => a.f - b.f);

  return candidatos[0].bloque.inicio;
}

module.exports = {
  calcularHuecosLibres,
  buscarHorarioOptimo,
};
