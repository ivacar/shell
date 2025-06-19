
$(document).ready(function () {
      // Inicializar el acordeón
      const headers = document.querySelectorAll('.accordion-header');
      headers.forEach(header => {
            header.addEventListener('click', () => {
                  const content = header.nextElementSibling;
                  content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
      });
      // finalizar el 

      // Inicializar calculos



      let totalCanje = 0;
      let seleccionados = [];

      $('.agregar-btn').on('click', function () {
            let puntos = parseInt($(this).data('puntos'));
            let tienda = $(this).closest('.accordion-item').find('.accordion-header img').attr('alt') || 'Premio';
            let valor = puntos + ' pesos';
            let index = $(this).index('.agregar-btn');

            if (!$(this).hasClass('agregado')) {
                  totalCanje += puntos;
                  seleccionados.push({ id: index, tienda: tienda, valor: valor, puntos: puntos });

                  $(this).addClass('agregado').text('Quitar');
            } else {
                  totalCanje -= puntos;
                  seleccionados = seleccionados.filter(item => item.id !== index);

                  $(this).removeClass('agregado').text('Agregar');
            }

            $('.banner__canje .puntos p:nth-child(2) span').text(`$${totalCanje.toLocaleString('es-MX')}.00`);
      });

      $('.banner__canje a').on('click', function (e) {
            e.preventDefault();

            if (seleccionados.length === 0) {
                  Swal.fire('Sin selección', 'Por favor, selecciona al menos un premio para canjear.', 'warning');
                  return;
            }

            // Armar HTML con bloques de texto
            let html = '';
            seleccionados.forEach(item => {
                  html += `
            <div style="margin-bottom: 12px; border-bottom: 1px solid #ccc; padding-bottom: 8px;font-size:0.8rem; text-align:left;">
                <p><strong>Tienda:</strong> ${item.tienda}</p>
                <p><strong>Premio:</strong> Tarjeta de ${item.valor}</p>
                <p><strong>Puntos:</strong> ${item.puntos}</p>
            </div>
        `;
            });

            html += `<p style="font-weight:bold; text-align:right;">Total: $${totalCanje.toLocaleString('es-MX')}.00</p>`;

            Swal.fire({
                  title: '¿Confirmar canje?',
                  html: html,
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: 'Sí, canjear',
                  cancelButtonText: 'Cancelar',
                  customClass: {
                        htmlContainer: 'swal-text-left'
                  }
            }).then((result) => {
                  if (result.isConfirmed) {
                        // $.ajax({
                        //       url: '/canjear', 
                        //       method: 'POST',
                        //       contentType: 'application/json',
                        //       data: JSON.stringify({ premios: seleccionados, total: totalCanje }),
                        //       success: function (response) {
                        //             Swal.fire('¡Canje en proceso!', 'Recibirás un correo con los detalles.', 'success');

                        //             totalCanje = 0;
                        //             seleccionados = [];
                        //             $('.agregar-btn.agregado').removeClass('agregado').text('Agregar');
                        //             $('.banner__canje .puntos p:nth-child(2) span').text(`$0.00`);
                        //       },
                        //       error: function () {
                        //             Swal.fire('Error', 'Hubo un problema al procesar el canje. Inténtalo más tarde.', 'error');
                        //             console.log('data');
                        //       }
                        // });

                        //---- Envio simulado ----
                        //Acomodar esta alerta en el ajax
                        console.log("Datos a enviar:");
                        console.log(JSON.stringify({ premios: seleccionados, total: totalCanje }, null, 2));

                        Swal.fire({
                              title: '¡Canje en proceso!',
                              text: 'Recibirás un correo con los detalles.',
                              icon: 'success',
                              confirmButtonText: 'OK'
                        }).then(() => {
                              window.location.href = 'vendedor-home.html'; // Cambia a tu ruta real
                        });

                        // Limpieza (puedes hacerla aquí si no te importa conservar datos al redirigir)
                        totalCanje = 0;
                        seleccionados = [];
                        $('.agregar-btn.agregado').removeClass('agregado').text('Agregar');
                        $('.banner__canje .puntos p:nth-child(2) span').text(`$0.00`);
                  }
            });
      });
});


