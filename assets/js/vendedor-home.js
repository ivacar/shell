
  const selectFiltro = document.querySelector('.filtro select');
  const filas = document.querySelectorAll('#no-more-tables tbody tr');

  function parseFecha(fechaStr) {
    const [dia, mes, anio] = fechaStr.split('-').map(Number);
    return new Date(anio, mes - 1, dia); // Meses en JS van de 0-11
  }

  function diasDiferencia(fecha) {
    const hoy = new Date();
    const diffTime = hoy - fecha;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  function filtrarTabla(opcion) {
    filas.forEach(fila => {
      const textoFecha = fila.querySelector('td[data-title="Fecha"]').textContent.trim();
      const fecha = parseFecha(textoFecha);
      const diferencia = diasDiferencia(fecha);

      let mostrar = false;
      switch (opcion) {
        case 'semana':
          mostrar = diferencia <= 7;
          break;
        case 'quincena':
          mostrar = diferencia <= 15;
          break;
        case 'mes':
          mostrar = diferencia <= 30;
          break;
        case 'todo':
          mostrar = true;
          break;
        default:
          mostrar = true;
      }

      fila.style.display = mostrar ? '' : 'none';
    });
  }

  // Escuchar el cambio en el <select>
  selectFiltro.addEventListener('change', () => {
    const opcion = selectFiltro.value;
    filtrarTabla(opcion);
  });

