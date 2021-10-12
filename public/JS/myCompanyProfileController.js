document.querySelectorAll("textarea").forEach(ta => {
    ClassicEditor.create(document.querySelector('#' + ta.id), {
            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
            heading: {
                options: [{
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                }, ]
            }
        })
        .catch(error => {});
});

const form2 = document.getElementById("form2");

const editor = document.getElementById("editor");
const editor2 = document.getElementById("editor2");
const editor3 = document.getElementById("editor3");

const btnAddPhoto = document.getElementById("btnAddPhoto");
const btnSummary = document.getElementById("btnSummary");
const btnMision = document.getElementById("btnMision");
const btnVision = document.getElementById("btnVision");

btnAddPhoto.addEventListener('click', () => {
    $("#modalProfilePhoto").modal("show")
});

if (btnSummary != null) {
    btnSummary.addEventListener('click', () => {
        $("#modalSummary").modal("show")
    });
}

if (btnMision != null) {
    btnMision.addEventListener('click', () => {
        $("#modalMision").modal("show")
    });
}

if (btnVision != null) {
    btnVision.addEventListener('click', () => {
        $("#modalVision").modal("show")
    });
}

form2.addEventListener("submit", (forms) => {
    forms.preventDefault(); // no permite que se ejecute la accion del form
    checkInputs(editor); // validar inputs
    for (let i = 0; i < form2.length; i++) {
        //recorro el formulario
        const element = form2[i]
            .className; //obtengo el nombre de las clases de los componentes del form iterado
        if (
            element === "form-control is-valid" ||
            element === "form-select is-valid"
        ) {
            if (i == 0) {
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
    checkInputs(editor2); // validar inputs
    for (let i = 0; i < form3.length; i++) {
        //recorro el formulario
        const element = form3[i]
            .className; //obtengo el nombre de las clases de los componentes del form iterado
        if (
            element === "form-control is-valid" ||
            element === "form-select is-valid"
        ) {
            if (i == 0) {
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
    checkInputs(editor3); // validar inputs
    for (let i = 0; i < form4.length; i++) {
        //recorro el formulario
        const element = form4[i]
            .className; //obtengo el nombre de las clases de los componentes del form iterado
        if (
            element === "form-control is-valid" ||
            element === "form-select is-valid"
        ) {
            if (i == 0) {
                form4.submit();
                break;
            } //si llega a 7 es porque todos los componentes del form estan validados por lo tanto se reanuda la accion del form
        } else {
            break;
        } // de lo contrario simplemente corto el bucle
    }
});

function checkInputs(ed) {
    const editorValue = ed.value.trim();
    // comienza la validacion
    if (editorValue === "") {
        setErrorFor(ed, "Debe escribir algo");
    } else {
        setSuccessFor(ed);
    }
    //termina la validacion
};

function setErrorFor(input, message) {
    if (input.className != "form-select") {
        //para los form-control
        input.className =
            "form-control is-invalid "; // le asigna una clase de Bootstrap para un elemento no validado
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
        input.className =
            "form-control-file is-valid "; // le asigna una clase de Bootstrap para un elemento no validado
    }
}