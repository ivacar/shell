
$(document).ready(function () {
      //---- input fecha actual ----//
      let today = new Date();
      let day = String(today.getDate()).padStart(2, '0');
      let month = String(today.getMonth() + 1).padStart(2, '0');
      let year = today.getFullYear();

      $('#fecha').val(`${day}/${month}/${year}`);
      //---- fin input fecha actual ----//
      //---- input file ----//

      var inputs = document.querySelectorAll('.file-input')

      for (var i = 0, len = inputs.length; i < len; i++) {
            customInput(inputs[i])
      }

      function customInput(el) {
            const fileInput = el.querySelector('[type="file"]')
            const label = el.querySelector('[data-js-label]')

            fileInput.onchange =
                  fileInput.onmouseout = function () {
                        if (!fileInput.value) return

                        var value = fileInput.value.replace(/^.*[\\\/]/, '')
                        el.className += ' -chosen'
                        label.innerText = value
                  }
      }
      //---- fin input file ----//

      //----- sección down and up -----//|
      window.updateSpinner = function (button) {
            const container = button.closest('.downup');
            const input = container.querySelector('input');
            let value = parseInt(input.value) || 0;

            const action = button.getAttribute('data-action');
            if (action === 'down') {
                  value = Math.max(0, value - 1);
            } else if (action === 'up') {
                  value++;
            }

            input.value = value;
            updateTotals();
      };

      function updateTotals() {
            let totalLitros = 0;
            let totalPuntos = 0;

            document.querySelectorAll('.litro-input').forEach(input => {
                  const cantidad = parseInt(input.value) || 0;
                  const litros = parseFloat(input.dataset.litros);
                  const puntos = parseFloat(input.dataset.puntos);

                  totalLitros += cantidad * litros;
                  totalPuntos += cantidad * puntos;
            });

            document.getElementById('total-litros').value = totalLitros;
            document.getElementById('total-puntosgenerados').value = totalPuntos.toFixed(2);
      }
      //----- fin sección sección down and up -----//
      //----- Validacion de formulario -----//
      $("#nueva_venta").validate({
            rules: {
                  folio: {
                        required: true
                  },
                  file: {
                        required: true,
                        extension: "jpg|jpeg|png"
                  },
                  terminos: {
                        required: true
                  }
            },
            messages: {
                  folio: {
                        required: "Por favor, ingresa un folio valido",
                  },
                  file: {
                        required: "Por favor selecciona un archivo",
                        extension: "Solo se permiten archivos JPG, PNG o JPEG"
                  }
            },
            submitHandler: function (form) {
                  $.ajax({
                        url: 'http://localhost/shell/login.php',
                        type: 'POST',
                        data: $(form).serialize(),
                        dataType: 'json',
                        success: function (response) {
                              if (response.status === 'success') {
                                    Swal.fire({
                                          icon: 'success',
                                          title: '¡Bienvenido!',
                                          text: response.message,
                                          confirmButtonText: 'Continuar',
                                          timer: 2000,
                                          showConfirmButton: false
                                    });
                                    setTimeout(function () {
                                          window.location.href = 'vendedor-home.html';
                                    }, 2000);
                              } else {
                                    Swal.fire({
                                          icon: 'error',
                                          title: 'Error',
                                          text: response.message,
                                          confirmButtonText: 'Intentar de nuevo'
                                    });
                              }
                        },
                        error: function () {
                              Swal.fire({
                                    icon: 'warning',
                                    title: 'Servidor no responde',
                                    text: 'Revisa tu conexión o contacta al administrador',
                                    confirmButtonText: 'Ok'
                              });
                        }
                  });
            }

      });
      //----- fin Validacion de formulario -----//
});