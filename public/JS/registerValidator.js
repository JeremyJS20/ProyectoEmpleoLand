//elementos del DOM para validar el form
const form = document.getElementById("formSignUp");
const form2 = document.getElementById("formSignUp2");
const nombre = document.getElementById("name");
const nombre2 = document.getElementById("name2");
const Lname = document.getElementById("Lname");
const email = document.getElementById("email");
const email2 = document.getElementById("email2");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const confirmpassword = document.getElementById("confirmpassword");
const confirmpassword2 = document.getElementById("confirmpassword2");
const phone = document.getElementById("phone");
const phone2 = document.getElementById("phone2");
const identification = document.getElementById("identification");
const genre = document.getElementById("genre");
const address = document.getElementById("address");
const address2 = document.getElementById("address2");
const url = document.getElementById("url");
const logo = document.getElementById("logo");

form.addEventListener("submit", (forms) => {
  forms.preventDefault(); // no permite que se ejecute la accion del form
  checkInputs(); // validar inputs
  for (let i = 0; i < form.length; i++) {
    //recorro el formulario
    const element = form[i].className; //obtengo el nombre de las clases de los componentes del form iterado
    if (
      element === "form-control is-valid" ||
      element === "form-select is-valid"
    ) {
      if (i == 7) {
        form.submit();
        break;
      } //si llega a 7 es porque todos los componentes del form estan validados por lo tanto se reanuda la accion del form
    } else {
      break;
    } // de lo contrario simplemente corto el bucle
  }
});

form2.addEventListener("submit", (forms) => {
  forms.preventDefault(); // no permite que se ejecute la accion del form
  checkInputs2(); // validar inputs
  for (let i = 0; i < form2.length; i++) {
    //recorro el formulario
    const element = form2[i].className; //obtengo el nombre de las clases de los componentes del form iterado
    if (
      element === "form-control is-valid" ||
      element === "form-select is-valid" ||
      element === "form-control-file is-valid"
    ) {
      if (i == 6) {
        form2.submit();
        break;
      } //si llega a 7 es porque todos los componentes del form estan validados por lo tanto se reanuda la accion del form
    } else {
      break;
    } // de lo contrario simplemente corto el bucle
  }
});

function checkInputs() {
  //funcion para validar inputs
  // variables que contienen los valores de los elementos del DOM
  // trim es para obviar los espacios en blanco

  const nombreValue = nombre.value.trim();
  const LnameValue = Lname.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = confirmpassword.value.trim();
  const phoneValue = Number(phone.value.trim());
  const identificationValue = Number(identification.value.trim());
  const genreValue = genre.value;

  // comienza la validacion
  if (nombreValue === "") {
    setErrorFor(nombre, "Debe proporcionar su nombre");
  } else {
    setSuccessFor(nombre);
  }

  if (LnameValue === "") {
    setErrorFor(Lname, "Debe proporcionar su apellido");
  } else {
    setSuccessFor(Lname);
  }

  if (emailValue === "") {
    setErrorFor(email, "Debe proporcionar su Email");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "El Email ingresado no es valido");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Debe proporcionar una contraseña");
  } else {
    if (passwordValue.length < 6) {
      setErrorFor(password, "La contraseña debe tener 6 o más caracteres");
    } else {
      setSuccessFor(password);
    }
  }

  if (password2Value === "") {
    setErrorFor(confirmpassword, "Debe confirmar la contraseña ingresada");
  } else if (passwordValue !== password2Value) {
    setErrorFor(confirmpassword, "Las contraseñas no coinciden");
  } else {
    setSuccessFor(confirmpassword);
  }

  if (phoneValue === 0) {
    setErrorFor(phone, "Debe proporcionar su numero de telefono");
  } else {
    if (isNaN(phoneValue) || !isPhone(phoneValue)) {
      setErrorFor(phone, "El numero ingresado no es valido");
    } else {
      setSuccessFor(phone);
    }
  }

  if (identificationValue === 0) {
    setErrorFor(identification, "Debe proporcionar su cedula");
  } else {
    if (isNaN(identificationValue) || !isDNI(identificationValue)) {
      setErrorFor(identification, "La cedula ingresada no es valida");
    } else {
      setSuccessFor(identification);
    }
  }

  if (genreValue === "0") {
    setErrorFor(genre, "Seleccione una opcion");
  } else {
    setSuccessFor(genre);
  }
  //termina la validacion
}

function checkInputs2() {
  //funcion para validar inputs
  // variables que contienen los valores de los elementos del DOM
  // trim es para obviar los espacios en blanco

  const nombre2Value = nombre2.value.trim();
  const email2Value = email2.value.trim();
  const password2Value = password2.value.trim();
  const password22Value = confirmpassword2.value.trim();
  const phone2Value = Number(phone2.value.trim());
  const addressValue = address.value.trim();
  const address2Value = address2.value;
  const urlValue = url.value.trim();
  const logoValue = logo.value;
  console.log(logoValue)
// comienza la validacion
  if (nombre2Value === "") {
    setErrorFor(nombre2, "Debe proporcionar el nombre de la compañia");
  } else {
    setSuccessFor(nombre2);
  }

  if (email2Value === "") {
    setErrorFor(email2, "Debe proporcionar el email de la compañia");
  } else if (!isEmail(email2Value)) {
    setErrorFor(email2, "El Email ingresado no es valido");
  } else {
    setSuccessFor(email2);
  }

  if (password2Value === "") {
    setErrorFor(password2, "Debe proporcionar una contraseña");
  } else {
    if (password2Value.length < 6) {
      setErrorFor(password2, "La contraseña debe tener 6 o más caracteres");
    } else {
      setSuccessFor(password2);
    }
  }

  if (password22Value === "") {
    setErrorFor(confirmpassword2, "Debe confirmar la contraseña ingresada");
  } else if (password2Value !== password22Value) {
    setErrorFor(confirmpassword2, "Las contraseñas no coinciden");
  } else {
    setSuccessFor(confirmpassword2);
  }

  if (phone2Value === 0) {
    setErrorFor(phone2, "Debe proporcionar el numero de la compañia");
  } else {
    if (isNaN(phone2Value) || !isPhone(phone2Value)) {
      setErrorFor(phone2, "El numero ingresado no es valido");
    } else {
      setSuccessFor(phone2);
    }
  }

  if (addressValue === "") {
    setErrorFor(address, "Debe proporcionar la direccion de la compañia");
  } else {
    setSuccessFor(address);
  }
  if (address2Value === "0") {
    setErrorFor(address2, "Seleccione una provincia");
  } else {
    setSuccessFor(address2);
  }

  if (logoValue === "" || logoValue === undefined) {
    setErrorFor(logo,"Opcional");
  } else {
    setSuccessFor(logo);
  }

  if (urlValue === "") {
    setErrorFor(url,"Opcional");
  } else {
    setSuccessFor(url);
  }
  //termina la validacion
}

// funcion para cuando no este validado un elemento
// Recibe dos parametros: el elemento no validado y un mensaje de error
function setErrorFor(input, message) {
  if (input.className != "form-select") {
    //para los form-control
    const formControl = input.parentElement; // le asigna el valor de los elementos parentados al elemento
    const div = formControl.querySelector("div"); // filtra los valores a solo los div
    input.className = "form-control is-invalid "; // le asigna una clase de Bootstrap para un elemento no validado
    div.innerText = message; // pone el parametro message al div que indica el error
  } else if(input.className == "form-select") {
    //para los form-control lo mismo que los valores de arriba
    const formControl = input.parentElement;
    const div = formControl.querySelector("div");
    input.className = "form-select is-invalid ";
    div.innerText = message;
  } else{
    const formControl = input.parentElement; // le asigna el valor de los elementos parentados al elemento
    const div = formControl.querySelector("div"); // filtra los valores a solo los div
    input.className = "form-control-file is-invalid "; // le asigna una clase de Bootstrap para un elemento no validado
    div.innerText = message; // pone el parametro message al div que indica el error
  }
}
// funcion para cuando este validado un elemento
// Recibe un parametros: el elemento validado
function setSuccessFor(input) {
  if (input.className != "form-select") {
    input.className = "form-control is-valid"; // le asigna la clase de Bootstrap al elemento validado
  } else if(input.className == "form-select") {
    input.className = "form-select is-valid"; // le asigna la clase de Bootstrap al elemento select              validado
  } else{
    input.className = "form-control-file is-valid "; // le asigna una clase de Bootstrap para un elemento no validado
  }
}

//funcion para validar que sea un correo valido
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

//funcion para validar que se introduzca un telefono con el formato 0000000000 (10 digitos)
function isPhone(phone) {
  return /^\d{10}$/.test(phone);
}
//funcion para validar que se introduzca un id con el formato 0000000000 (10 digitos)

function isDNI(identification) {
  return /^\d{10}$/.test(identification);
}
