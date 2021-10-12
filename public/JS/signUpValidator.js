  //elementos del DOM para validar el form
  const form = document.getElementById("formSignUp");
  const form2 = document.getElementById("formSignUp2");
  const form3 = document.getElementById("formSignUp3");
  const form4 = document.getElementById("formSignUp4");
  const form5 = document.getElementById("formSignUp5");

  const name = document.getElementById("name")
  const lname = document.getElementById("Lname")
  const birthday = document.getElementById("birthday")
  const birthmonth = document.getElementById("birthmonth")
  const birthyear = document.getElementById("birthyear");
  const idbegin = document.getElementById("idbegin");
  const idmid = document.getElementById("idmid");
  const idend = document.getElementById("idend");
  const genre = document.getElementById("genre");

  const email = document.getElementById('email');
  const telbegin = document.getElementById('telbegin');
  const telbegin2 = document.getElementById('telbegin2');
  const telmid = document.getElementById('telmid');
  const telmid2 = document.getElementById('telmid2');
  const telend = document.getElementById('telend');
  const telend2 = document.getElementById('telend2');

  const street = document.getElementById('street');
  const homeNumber = document.getElementById('homeNumber');
  const postcode = document.getElementById('postcode');
  const dm = document.getElementById('dm');
  const city = document.getElementById('city');
  const province = document.getElementById('province');

  const email2 = document.getElementById('email2');
  const password = document.getElementById('password');
  const confirmpassword = document.getElementById('confirmpassword');

  const enterpriseName = document.getElementById('enterpriseName');
  const creationYear = document.getElementById('creationYear');
  const Area = document.getElementById('Area');

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
    for (let i = 0; i < form.length; i++) {
      //recorro el formulario
      const element = form[i].className; //obtengo el nombre de las clases de los componentes del form iterado
      if (
        element === "form-control is-valid" ||
        element === "form-select is-valid"
      ) {
        if (i == 8) {
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
        element === "form-select is-valid"
      ) {
        if (i == 6 && telbegin2 != null) {
          form2.submit();
          break;
        } else if(i == 3 && telbegin2 == null){
          form2.submit();
          break;
        } //si llega a 7 es porque todos los componentes del form estan validados por lo tanto se reanuda la accion del form
      } else {
        break;
      } // de lo contrario simplemente corto el bucle
    }
  });
  
  form3.addEventListener("submit", (forms) => {
    forms.preventDefault(); // no permite que se ejecute la accion del form
    checkInputs3(); // validar inputs
    for (let i = 0; i < form3.length; i++) {
      //recorro el formulario
      const element = form3[i].className; //obtengo el nombre de las clases de los componentes del form iterado
      if (
        element === "form-control is-valid" ||
        element === "form-select is-valid"
      ) {
        if (i == 5) {
          form3.submit();
          break;
        } //si llega a 7 es porque todos los componentes del form estan validados por lo tanto se reanuda la accion del form
      } else {
        break;
      } // de lo contrario simplemente corto el bucle
    }
  });

  form4.addEventListener("submit", (forms) => {
    forms.preventDefault(); // no permite que se ejecute la accion del form
    checkInputs4(); // validar inputs
    for (let i = 0; i < form4.querySelectorAll('input').length; i++) {
      //recorro el formulario
      const element = form4.querySelectorAll('input')[i].className; //obtengo el nombre de las clases de los componentes del form iterado
      if (
        element === "form-control is-valid" ||
        element === "form-select is-valid"
      ) {
        if (i == 2) {
          form4.submit();
          break;
        } //si llega a 7 es porque todos los componentes del form estan validados por lo tanto se reanuda la accion del form
      } else {
        break;
      } // de lo contrario simplemente corto el bucle
    }
  });

  form5.addEventListener("submit", (forms) => {
    forms.preventDefault(); // no permite que se ejecute la accion del form
    checkInputs5(); // validar inputs
    for (let i = 0; i < form5.length; i++) {
      //recorro el formulario
      const element = form5[i].className; //obtengo el nombre de las clases de los componentes del form iterado
      if (
        element === "form-control is-valid" ||
        element === "form-select is-valid"
      ) {
        if (i == 2) {
          form5.submit();
          break;
        } //si llega a 7 es porque todos los componentes del form estan validados por lo tanto se reanuda la accion del form
      } else {
        break;
      } // de lo contrario simplemente corto el bucle
    }
  });

  function checkInputs() {
    const nombreValue = name.value.trim();
    const LnameValue = lname.value.trim();
    const birthdayValue = birthday.value.trim();
    const birthmonthValue = birthmonth.value.trim();
    const birthyearValue = birthyear.value.trim();
    const identificationValue = Number(idbegin.value.trim() + idmid.value.trim() + idend.value.trim());
    const genreValue = genre.value.trim();
    // comienza la validacion
    if (nombreValue === "") {
      setErrorFor(name, "Debe proporcionar su nombre");
    } else {
      setSuccessFor(name);
    }

    if (LnameValue === "") {
      setErrorFor(Lname, "Debe proporcionar su apellido");
    } else {
      setSuccessFor(Lname);
    }

    if(birthdayValue === "0"){
      setErrorFor(birthday, "Debe proporcionar su fecha de nacimiento")
    } else{
      setSuccessFor(birthday)
    }
    
    if(birthmonthValue === "0"){
      setErrorFor(birthmonth, "Debe proporcionar su fecha de nacimiento")
    }else{
      setSuccessFor(birthmonth)
    }
    
    if(birthyearValue === "0"){
      setErrorFor(birthyear, "Debe proporcionar su fecha de nacimiento")
    } else{
      setSuccessFor(birthyear)
    }

    if (identificationValue === 0) {
      setErrorFor(idbegin, "Debe proporcionar su cedula");
      setErrorFor(idmid, "Debe proporcionar su cedula");
      setErrorFor(idend, "Debe proporcionar su cedula");
    } else {
      if (isNaN(identificationValue) || !isDNI(identificationValue)) {
        setErrorFor(idbegin, "La cedula ingresada no es valida");
        setErrorFor(idmid, "La cedula ingresada no es valida");
        setErrorFor(idend, "La cedula ingresada no es valida");
      } else {
        setSuccessFor(idbegin);
        setSuccessFor(idmid);
        setSuccessFor(idend);
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
    const emailValue = email.value.trim();
    const telRes = Number(1 + telbegin.value.trim() + telmid.value.trim() + telend.value.trim());
    var telPer = ""
    if(telbegin2 != null){
      telPer = Number(1 + telbegin2.value.trim() + telmid2.value.trim() + telend2.value.trim());
    }

    // comienza la validacion
    if (emailValue === "") {
      setErrorFor(email, "Debe proporcionar su correo");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "El Email ingresado no es valido");
    } else {
      setSuccessFor(email);
    }

    if (telRes === 0) {
      setErrorFor(telbegin, "Debe proporcionar su tel. residencial");
      setErrorFor(telmid, "Debe proporcionar su tel. residencial");
      setErrorFor(telend, "Debe proporcionar su tel. residencial");
    } else {
      if (isNaN(telRes) || !isPhone(telRes)) {
        setErrorFor(telbegin, "El numero ingresado no es valido");
        setErrorFor(telmid, "El numero ingresado no es valido");
        setErrorFor(telend, "El numero ingresado no es valido");
      } else {
        setSuccessFor(telbegin);
        setSuccessFor(telmid);
        setSuccessFor(telend);
      }
    }

    if(telbegin2 != null){
      if (telPer === 0) {
        setErrorFor(telbegin2, "Debe proporcionar su tel. personal");
        setErrorFor(telmid2, "Debe proporcionar su tel. personal");
        setErrorFor(telend2, "Debe proporcionar su tel. personal");
      } else {
        if (isNaN(telPer) || !isPhone(telPer)) {
          setErrorFor(telbegin2, "El numero ingresado no es valido");
          setErrorFor(telmid2, "El numero ingresado no es valido");
          setErrorFor(telend2, "El numero ingresado no es valido");
        } else {
          setSuccessFor(telbegin2);
          setSuccessFor(telmid2);
          setSuccessFor(telend2);
        }
      }
    }
    //termina la validacion
  }

  function checkInputs3() {
    const streetValue = street.value.trim();
    const hnValue = Number(homeNumber.value.trim());
    const postcodeValue = Number(postcode.value.trim());
    const dmValue = dm.value.trim();
    const cityValue = city.value.trim();
    const provinceValue = province.value.trim();

    // comienza la validacion
    if (streetValue === "") {
      setErrorFor(street, "Debe proporcionar su calle o avenida");
    } else {
      setSuccessFor(street);
    }

    if (hnValue === 0) {
      setErrorFor(homeNumber, "Debe proporcionar su numero de casa");
    } else {
      if (isNaN(hnValue)) {
        setErrorFor(homeNumber, "Debe proporcionar su numero de casa");
      } else {
        setSuccessFor(homeNumber);
      }
    }

    if (postcodeValue === 0) {
      setErrorFor(postcode, "Debe proporcionar el codigo postal");
    } else {
      if (isNaN(postcodeValue)) {
        setErrorFor(postcode, "Debe proporcionar el codigo postal");
      } else {
        setSuccessFor(postcode);
      }
    }

    if (dmValue === "") {
      setErrorFor(dm, "Debe proporcionar el distrito");
    } else {
      setSuccessFor(dm);
    }

    if (cityValue === "") {
      setErrorFor(city, "Debe proporcionar el municipio");
    } else {
      setSuccessFor(city);
    }

    if (provinceValue == 0) {
      setErrorFor(province, "Debe proporcionar la provincia");
    } else {
      setSuccessFor(province);
    }
    //termina la validacion
  }

  function checkInputs4() {
    const emailValue = email2.value.trim();
    const passwordValue = password.value.trim();
    const cpValue = confirmpassword.value.trim();

    // comienza la validacion
    if (emailValue === "") {
      setErrorFor(email2, "Debe proporcionar su Email");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email2, "El Email ingresado no es valido");
    } else {
      setSuccessFor(email2);
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

  function checkInputs5() {
    const enterpriseNameValue = enterpriseName.value.trim();
    const creationYearValue = creationYear.value.trim();
    const AreaValue = Area.value.trim();

    // comienza la validacion
    if (enterpriseNameValue === "") {
      setErrorFor(enterpriseName, "Debe proporcionar su Email");
    } else {
      setSuccessFor(enterpriseName);
    }

    if (creationYearValue == 0) {
      setErrorFor(creationYear, "Debe proporcionar su Email");
    } else {
      setSuccessFor(creationYear);
    }

    if (AreaValue == 0) {
      setErrorFor(Area, "Debe proporcionar su Email");
    } else {
      setSuccessFor(Area);
    }
    //termina la validacion
  }

  // funcion para cuando no este validado un elemento
  // Recibe dos parametros: el elemento no validado y un mensaje de error
  function setErrorFor(input, message) {
    if (input.className != "form-select") {
      //para los form-control
      input.className = "form-control is-invalid "; // le asigna una clase de Bootstrap para un elemento no validado
    } else if (input.className == "form-select") {
      //para los form-control lo mismo que los valores de arriba
      input.className = "form-select is-invalid ";
    } else {
      input.className =
      "form-control-file is-invalid "; // le asigna una clase de Bootstrap para un elemento no validado
    }
  }
  // funcion para cuando este validado un elemento
  // Recibe un parametros: el elemento validado
  function setSuccessFor(input) {
    if (input.className != "form-select") {
      input.className = "form-control is-valid"; // le asigna la clase de Bootstrap al elemento validado
    } else if (input.className == "form-select") {
      input.className =
      "form-select is-valid"; // le asigna la clase de Bootstrap al elemento select              validado
    } else {
      input.className = "form-control-file is-valid "; // le asigna una clase de Bootstrap para un elemento no validado
    }
  }

  //funcion para validar que sea un correo valido
  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(
        email
      );
  }

  //funcion para validar que se introduzca un telefono con el formato 0000000000 (10 digitos)
  function isPhone(phone) {
    return /^\d{11}$/.test(phone);
  }
  //funcion para validar que se introduzca un id con el formato 0000000000 (10 digitos)

  function isDNI(identification) {
    return /^\d{11}$/.test(identification);
  }

  function isValidPass(pass){
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(pass)
  }