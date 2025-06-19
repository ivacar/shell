
$(document).ready(function () {
  $("#login").validate({
    rules: {
      usuario: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      usuario: {
        required: "Por favor, ingresa tu correo electrónico",
        email: "El correo electrónico debe ser válido"
      },
      password: {
        required: "Por favor, ingresa tu contraseña",
        minlength: "La contraseña debe tener al menos 6 caracteres"
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


  $('#togglePassword').on('click', function () {
    const passwordInput = $('#password');
    const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
    passwordInput.attr('type', type);

    // Cambia el ícono entre ojo y ojo tachado
    $(this).toggleClass('fa-eye fa-eye-slash');
  });

  //función para crear crear una nueva cuenta

  $(".cuenta").on("click", function () {
    $(".contenedor__section").hide();
    $("body").css("background-color", "#ffc700ff");
    $(".usuario__nuevo").show();
  });

  //funciones para la interaccion de formulario de nueva cuenta
  //En las cuales manipularemos los botones de cerrar e iniciar sesion
  //Por ultimo la funcion de validacion del formulario de nueva cuenta
  $(".close img").on("click", function () {
    $(".usuario__nuevo").hide();
    $("body").css("background-color", "#f2f2f8ff");
    $(".contenedor__section").show();
  });

  $(".back_login").on("click", function () {
    $(".usuario__nuevo").hide();
    $("body").css("background-color", "#f2f2f8ff");
    $(".contenedor__section").show();
  });

  $("#nuevo_usuario").validate({
    rules: {
      usuario: {
        required: true,
        minlength: 3
      },
      apellido: {
        required: true,
        minlength: 3
      },
      mail: {
        required: true,
        email: true
      },
      newpassword: {
        required: true,
        minlength: 6
      },
      pass_verify: {
        required: true,
        minlength: 6,
        equalTo: "#newpassword"
      },
      refaccionaria: {
        required: true
      },
      //  fecha: {
      //   required: true
      // },
      lorem: {
        required: true
      },
      terminos: {
        required: true
      }
    },
    messages: {
      usuario: {
        required: "Por favor, ingresa un nombre de usuario",
        minlength: "El nombre de usuario debe tener al menos 3 caracteres"
      },
      apellido: {
        required: "Por favor, ingresa un apellido de usuario",
        minlength: "El apellido de usuario debe tener al menos 3 caracteres"
      },
      mail: {
        required: "Por favor, ingresa un correo electrónico",
        email: "El correo electrónico debe ser válido"
      },
      newpassword: {
        required: "Por favor, ingresa tu contraseña",
        minlength: "La contraseña debe tener al menos 6 caracteres"
      },
      pass_verify: {
        required: "Por favor, verifica tu contraseña",
        minlength: "La contraseña debe tener al menos 6 caracteres",
        equalTo: "Las contraseñas no coinciden"
      }
    },
    submitHandler: function (form) {
      const pass = $("#password").val();
      const verify = $("#pass_verify").val();
      console.log("Password:", pass);
      console.log("Verificar:", verify);
      if (pass !== verify) {
        alert("Las contraseñas no coinciden");
      } else {
        form.submit();
      }
    }
  });
  //función del select de refaccionaria
  $('#refaccionaria').select2({
    placeholder: "Selecciona una refaccionaria",
    allowClear: true
  });

  //función para la fecha mediante selects
  const $dia = $('#dia');
  const $mes = $('#mes');
  const $anio = $('#anio');
  const $fechaFinal = $('#fechaFinal');
  const $fechaMostrada = $('#fechaMostrada');

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  function esBisiesto(anio) {
    return ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0));
  }

  function diasEnMes(mes, anio) {
    if (mes === 2) {
      return esBisiesto(anio) ? 29 : 28;
    }
    return [4, 6, 9, 11].includes(mes) ? 30 : 31;
  }

  function poblarDias(mes, anio) {
    const dias = diasEnMes(mes, anio);
    const diaAnterior = parseInt($dia.val()) || 1;
    $dia.empty();
    for (let d = 1; d <= dias; d++) {
      $dia.append(`<option value="${d}">${d}</option>`);
    }
    if (diaAnterior <= dias) {
      $dia.val(diaAnterior);
    }
  }

  function actualizarFecha() {
    const d = parseInt($dia.val());
    const m = parseInt($mes.val());
    const a = parseInt($anio.val());

    // Agregar cero delante si es necesario
    const dd = d.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const fecha = `${a}-${mm}-${dd}`;

    $fechaFinal.val(fecha);
    $fechaMostrada.text(fecha);
  }

  const añoActual = new Date().getFullYear();

  for (let m = 0; m < 12; m++) {
    $mes.append(`<option value="${m + 1}">${meses[m]}</option>`);
  }

  for (let a = añoActual; a >= 1900; a--) {
    $anio.append(`<option value="${a}">${a}</option>`);
  }

  $mes.val(1); // Enero
  $anio.val(añoActual);
  poblarDias(1, añoActual);
  actualizarFecha();

  $mes.on('change', function () {
    poblarDias(parseInt($mes.val()), parseInt($anio.val()));
    actualizarFecha();
  });

  $anio.on('change', function () {
    poblarDias(parseInt($mes.val()), parseInt($anio.val()));
    actualizarFecha();
  });

  $dia.on('change', actualizarFecha);
});
