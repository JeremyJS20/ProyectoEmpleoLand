const form = document.getElementById("formReset");
  
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');

const btnShowPass = document.getElementById('btnShowPass');

btnShowPass.addEventListener('click', () => {
if(password.type == "password"){
  password.type = "text";
  btnShowPass.innerHTML = '<i class="fas fa-eye-slash"></i>'
} else{
  password.type = "password";
  btnShowPass.innerHTML = '<i class="fas fa-eye"></i>'
}    
})

password.addEventListener('input', () => {
if(password.value.length < 8){
  document.getElementById('small1').className = "form-text text-danger"
} else{
  document.getElementById('small1').className = "form-text text-success"
}

if(password.value.length < 15){
  document.getElementById('small2').className = "form-text text-success"
} else{
  document.getElementById('small2').className = "form-text text-danger"
}

var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

for (let i = 0; i < nums.length; i++) {
  const element = nums[i];
  if(password.value.includes(element)){
    document.getElementById('small4').className = "form-text text-success"
    break;
  } else{
    document.getElementById('small4').className = "form-text text-danger"
  }
}

for (let i = 0; i < password.value.length; i++) {
  var letra = password.value.charAt(i);
  if (letra === letra.toUpperCase()) {
    document.getElementById('small3').className = "form-text text-success"
    break;
  } else {
    document.getElementById('small3').className = "form-text text-danger"
  }
}

var specialCharts = ['@', '$', '&', '*', '%', '!', '?']

for (let i = 0; i < specialCharts.length; i++) {
  const element = specialCharts[i];
  if(password.value.includes(element)){
    document.getElementById('small5').className = "form-text text-success"
    break;
  } else{
    document.getElementById('small5').className = "form-text text-danger"
  }
}
});

form.addEventListener("submit", (forms) => {
  forms.preventDefault(); // no permite que se ejecute la accion del form
  checkInputs(); // validar inputs
  for (let i = 0; i < form.querySelectorAll('input').length; i++) {
    //recorro el formulario
    const element = form.querySelectorAll('input')[i].className; //obtengo el nombre de las clases de los componentes del form iterado
    if (
      element === "form-control is-valid" ||
      element === "form-select is-valid"
    ) {
      if (i == 2) {
        form.submit();
        break;
      } //si llega a 7 es porque todos los componentes del form estan validados por lo tanto se reanuda la accion del form
    } else {
      break;
    } // de lo contrario simplemente corto el bucle
  }
});

function checkInputs() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const cpValue = confirmpassword.value.trim();

  // comienza la validacion
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
    if (isValidPass(passwordValue) != true) {
      setErrorFor(password, "");
    } else {
      setSuccessFor(password);
    }
  }

  if (cpValue === "") {
    setErrorFor(confirmpassword, "Debe confirmar la contraseña ingresada");
  } else if (passwordValue !== cpValue) {
    setErrorFor(confirmpassword, "Las contraseñas no coinciden");
  } else {
    setSuccessFor(confirmpassword);
  }
  //termina la validacion
}

// funcion para cuando no este validado un elemento
// Recibe dos parametros: el elemento no validado y un mensaje de error
function setErrorFor(input, message) {
  input.className = "form-control is-invalid ";
}
// funcion para cuando este validado un elemento
// Recibe un parametros: el elemento validado
function setSuccessFor(input) {
  input.className = "form-control is-valid"; // le asigna la clase de Bootstrap al elemento validado
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(
      email
    );
}

function isValidPass(pass){
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(pass)
}