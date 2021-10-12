//elementos del DOM para validar el form2
const form2 = document.getElementById("formPostJob");
const btnSend = document.getElementById("btnSend");
const compania = document.getElementById("compania");
const tipoTrabajo = document.getElementById("tipoTrabajo");
const Posicion = document.getElementById("Posicion");
const Ubicacion = document.getElementById("Ubicacion");
const Descripcion = document.getElementById("Descripcion");
const Descripcion2 = document.getElementById("Descripcion2");
const correo = document.getElementById("correo");

const compania2 = document.getElementById("compania2");
const tipoTrabajo2 = document.getElementById("tipoTrabajo2");
const Posicion2 = document.getElementById("Posicion2");
const Ubicacion2 = document.getElementById("Ubicacion2");
const Descripcion21 = document.getElementById("Descripcion2-1");
const Descripcion22 = document.getElementById("Descripcion2-2");
const correo2 = document.getElementById("email2");
const url2 = document.getElementById("url2");

btnSend.addEventListener("click", () => {
  checkInputs(); // validar inputs
  for (let i = 0; i < form2.length; i++) {
    //recorro el form2ulario
    const element = form2[i].className; //obtengo el nombre de las clases de los componentes del form2 iterado
    if (
      element === "form-control is-valid" ||
      element === "form-select is-valid"
    ) {
      if (i == 6) {
        $("#exampleModal").modal("show");
        compania2.value = compania.value;
        tipoTrabajo2.value = tipoTrabajo.value;
        Posicion2.value = Posicion.value;
        Ubicacion2.value = Ubicacion.value;
        Descripcion21.value = Descripcion.value;
        Descripcion22.value = Descripcion2.value;
        correo2.value = correo.value;
        url2.value = document.getElementById("url").value;
        break;
      } //si llega a 7 es porque todos los componentes del form2 estan validados por lo tanto se reanuda la accion del form2
    } else {
      break;
    } // de lo contrario simplemente corto el bucle
  }
});

function checkInputs() {
  //funcion para validar inputs
  // variables que contienen los valores de los elementos del DOM
  // trim es para obviar los espacios en blanco

  const companiaValue = compania.value.trim();
  const tipoTrabajoValue = tipoTrabajo.value;
  const PosicionValue = Posicion.value.trim();
  const UbicacionValue = Ubicacion.value.trim();
  const DescripcionValue = Descripcion.value;
  const Descripcion2Value = Descripcion2.value;
  const correoValue = correo.value.trim();

  // comienza la validacion
  if (companiaValue === "") {
    setErrorFor(compania, "Debe proporcionar el nombre de la compañia.");
  } else {
    setSuccessFor(compania);
  }

  if (tipoTrabajoValue === "0") {
    setErrorFor(tipoTrabajo, "Seleccione una opcion.");
  } else {
    setSuccessFor(tipoTrabajo);
  }

  if (PosicionValue == 0) {
    setErrorFor(Posicion, "Seleccione una posicion de trabajo.");
  } else {
    setSuccessFor(Posicion);
  }

  if (UbicacionValue === "") {
    setErrorFor(Ubicacion, "Debe proporcionar la ubicacion de la compañia.");
  } else {
    setSuccessFor(Ubicacion);
  }

  if (DescripcionValue === "") {
    setErrorFor(Descripcion, "Debe proporcionar una descripcion del trabajo.");
  } else {
    setSuccessFor(Descripcion);
  }

  if (Descripcion2Value === "") {
    setErrorFor(Descripcion2, "Debe indicar como aplicar.");
  } else {
    setSuccessFor(Descripcion2);
  }

  if (correoValue === "") {
    setErrorFor(correo, "Debe proporcionar el correo de la compañia.");
  } else if (!iscorreo(correoValue)) {
    setErrorFor(correo, "El correo ingresado no es valido");
  } else {
    setSuccessFor(correo);
  }

  //termina la validacion
}
// funcion para cuando no este validado un elemento
// Recibe dos parametros: el elemento no validado y un mensaje de error
function setErrorFor(input, message) {
  if (input.className != "form-select") {
    //para los form2-control
    const form2Control = input.parentElement; // le asigna el valor de los elementos parentados al elemento
    const div = form2Control.querySelector("div"); // filtra los valores a solo los div
    input.className = "form-control is-invalid "; // le asigna una clase de Bootstrap para un elemento no validado
    div.innerText = message; // pone el parametro message al div que indica el error
  } else {
    //para los form2-control lo mismo que los valores de arriba
    const form2Control = input.parentElement;
    const div = form2Control.querySelector("div");
    input.className = "form-select is-invalid ";
    div.innerText = message;
  }
}
// funcion para cuando este validado un elemento
// Recibe un parametros: el elemento validado
function setSuccessFor(input) {
  if (input.className != "form-select") {
    input.className = "form-control is-valid"; // le asigna la clase de Bootstrap al elemento validado
  } else {
    input.className = "form-select is-valid"; // le asigna la clase de Bootstrap al elemento select              validado
  }
}

//funcion para validar que sea un correo valido
function iscorreo(correo) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    correo
  );
}
