    ClassicEditor
        .create(document.querySelector('#editor'), {
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

    ClassicEditor
        .create(document.querySelector('#editor2'), {
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


    const btnLang = document.getElementById("btnLang")
    const btnPre = document.getElementById("btnPre")
    const btnSkills = document.getElementById("btnSkills")
    const btnForm = document.getElementById("btnForm")
    const btnForm2 = document.getElementById("btnForm2")
    const btnForm3 = document.getElementById("btnForm3")
    const btnForm4 = document.getElementById("btnForm4")
    const btnAddPhoto = document.getElementById("btnAddPhoto");
    const form1 = document.getElementById("form1")
    const form2 = document.getElementById("form2")
    const form4 = document.getElementById("form4")
    const form5 = document.getElementById("form5")
    const form6 = document.getElementById("form6")
    const form7 = document.getElementById("form7")

    const languages = document.getElementById("languages")
    const langLevel = document.getElementById("langLevel")
    const editor = document.getElementById("editor")
    const titles = document.getElementById("titles")
    const titles2 = document.getElementById("titles2")
    const titledIn = document.getElementById("titledIn")
    const place = document.getElementById("place")
    const place2 = document.getElementById("place2")
    const beginMonth = document.getElementById("beginMonth")
    const beginYear = document.getElementById("beginYear")
    const endMonth = document.getElementById("endMonth")
    const endYear = document.getElementById("endYear")
    const beginMonth2 = document.getElementById("beginMonth2")
    const beginYear2 = document.getElementById("beginYear2")
    const endMonth2 = document.getElementById("endMonth2")
    const endYear2 = document.getElementById("endYear2")

    const formType = document.getElementById("formType")
    const formedIn = document.getElementById("formedIn")
    const place3 = document.getElementById("place3")
    const beginMonth3 = document.getElementById("beginMonth3")
    const beginYear3 = document.getElementById("beginYear3")
    const endMonth3 = document.getElementById("endMonth3")
    const endYear3 = document.getElementById("endYear3")

    const employName = document.getElementById("employName")
    const enterpriseName = document.getElementById("enterpriseName")
    const beginMonth4 = document.getElementById("beginMonth4")
    const beginYear4 = document.getElementById("beginYear4")
    const endMonth4 = document.getElementById("endMonth4")
    const endYear4 = document.getElementById("endYear4")
    const editor2 = document.getElementById("editor2")

    document.getElementById('titledAct').addEventListener('click', () => {
        if (document.getElementById('titledAct').checked === true) {
            endMonth.disabled = true
            endYear.disabled = true
        } else {
            endMonth.disabled = false
            endYear.disabled = false
        }
    })

    document.getElementById('titledAct2').addEventListener('click', () => {
        if (document.getElementById('titledAct2').checked === true) {
            endMonth3.disabled = true
            endYear3.disabled = true
        } else {
            endMonth3.disabled = false
            endYear3.disabled = false
        }
    })

    document.getElementById('titledAct3').addEventListener('click', () => {
        if (document.getElementById('titledAct3').checked === true) {
            endMonth4.disabled = true
            endYear4.disabled = true
        } else {
            endMonth4.disabled = false
            endYear4.disabled = false
        }
    })

    btnAddPhoto.addEventListener('click', () => {
        $("#modalProfilePhoto").modal("show")
    });

    if (btnLang != null) {
        btnLang.addEventListener("click", () => {
            $("#modalLang").modal("show")
        });
    }

    if (btnPre != null) {
        btnPre.addEventListener("click", () => {
            $("#modalPresentation").modal("show")

        });
    }

    if (btnSkills != null) {
        btnSkills.addEventListener("click", () => {
            $("#modalSkills").modal("show")

        });
    }

    if (btnForm != null) {
        btnForm.addEventListener("click", () => {
            $("#modalAcademicalForm").modal("show")
        });
    }

    if (btnForm2 != null) {
        btnForm2.addEventListener("click", () => {
            $("#modalProfessionalForm").modal("show")
        });
    }

    if (btnForm3 != null) {
        btnForm3.addEventListener("click", () => {
            $("#modalComplementaryForm").modal("show")
        });
    }

    if (btnForm4 != null) {
        btnForm4.addEventListener("click", () => {
            $("#modalLabExpForm").modal("show")
        });
    }

    form1.addEventListener("submit", (forms) => {
        forms.preventDefault(); // no permite que se ejecute la accion del form
        checkInputs(); // validar inputs
        for (let i = 0; i < form1.length; i++) {
            //recorro el formulario
            const element = form1[i]
                .className; //obtengo el nombre de las clases de los componentes del form iterado
            if (
                element === "form-control is-valid" ||
                element === "form-select is-valid"
            ) {
                if (i == 1) {
                    form1.submit();
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

    form4.addEventListener("submit", (forms) => {
        forms.preventDefault(); // no permite que se ejecute la accion del form
        checkInputs3(); // validar inputs
        for (let i = 0; i < form4.length; i++) {
            //recorro el formulario
            const element = form4[i]
                .className; //obtengo el nombre de las clases de los componentes del form iterado
            if (
                element === "form-control is-valid" ||
                element === "form-select is-valid" ||
                element === "custom-control-input"
            ) {
                if (document.getElementById('titledAct').checked === true && i == 4) {
                    form4.submit();
                    break;
                }
                if (document.getElementById('titledAct').checked === false && i == 6) {

                    form4.submit();
                    break;
                }
            } else {
                break;
            } // de lo contrario simplemente corto el bucle
        }
    });

    form5.addEventListener("submit", (forms) => {
        forms.preventDefault(); // no permite que se ejecute la accion del form
        checkInputs4(); // validar inputs
        for (let i = 0; i < form5.length; i++) {
            //recorro el formulario
            const element = form5[i].className; //obtengo el nombre de las clases de los componentes del form iterado
            if (
                element === "form-control is-valid" ||
                element === "form-select is-valid"
            ) {
                if (i == 5) {
                    form5.submit();
                    break;
                }
            } else {
                break;
            } // de lo contrario simplemente corto el bucle
        }
    });

    form6.addEventListener("submit", (forms) => {
        forms.preventDefault(); // no permite que se ejecute la accion del form
        checkInputs5(); // validar inputs
        for (let i = 0; i < form6.length; i++) {
            //recorro el formulario
            const element = form6[i]
                .className; //obtengo el nombre de las clases de los componentes del form iterado
            if (
                element === "form-control is-valid" ||
                element === "form-select is-valid" ||
                element === "custom-control-input"
            ) {
                if (document.getElementById('titledAct2').checked === true && i == 4) {
                    form6.submit();
                    break;
                }
                if (document.getElementById('titledAct2').checked === false && i == 6) {

                    form6.submit();
                    break;
                }
            } else {
                break;
            } // de lo contrario simplemente corto el bucle
        }
    });

    form7.addEventListener("submit", (forms) => {
        forms.preventDefault(); // no permite que se ejecute la accion del form
        checkInputs6(); // validar inputs
        for (let i = 0; i < form7.length; i++) {
            //recorro el formulario
            const element = form7[i]
                .className; //obtengo el nombre de las clases de los componentes del form iterado
            if (
                element === "form-control is-valid" ||
                element === "form-select is-valid" ||
                element === "custom-control-input"
            ) {
                if (document.getElementById('titledAct3').checked === true && i == 5) {
                    form7.submit();
                    break;
                }
                if (document.getElementById('titledAct3').checked === false && i == 7) {
                    form7.submit();
                    break;
                }
            } else {
                break;
            } // de lo contrario simplemente corto el bucle
        }
    });


    function checkInputs() {
        const languagesValue = languages.value.trim();
        const langLevelValue = langLevel.value.trim();


        // comienza la validacion

        if (languagesValue === "") {
            setErrorFor(languages, "Debe seleccionar un idioma");
        } else {
            setSuccessFor(languages);
        }

        if (langLevelValue === "") {
            setErrorFor(langLevel, "Debe seleccionar un idioma");
        } else {
            setSuccessFor(langLevel);
        }

        //termina la validacion
    }

    function checkInputs2() {
        const editorValue = editor.value.trim();
        // comienza la validacion
        if (editorValue === "") {
            setErrorFor(editor, "Debe escribir algo");
        } else {
            setSuccessFor(editor);
        }

        //termina la validacion
    }

    function checkInputs3() {
        const titlesValue = titles.value.trim();
        const titledInValue = titledIn.value.trim();
        const placeValue = place.value.trim();
        const beginMonthValue = beginMonth.value.trim();
        const beginYearValue = beginYear.value.trim();
        const endMonthValue = endMonth.value.trim();
        const endYearValue = endYear.value.trim();
        const validateEnd = document.getElementById('titledAct').checked;
        // comienza la validacion
        if (titlesValue == 0) {
            setErrorFor(titles, "Debe escribir algo");
        } else {
            setSuccessFor(titles);
        }

        if (titledInValue === "") {
            setErrorFor(titledIn, "Debe escribir algo");
        } else {
            setSuccessFor(titledIn);
        }

        if (placeValue === "") {
            setErrorFor(place, "Debe escribir algo");
        } else {
            setSuccessFor(place);
        }

        if (beginMonthValue == 0) {
            setErrorFor(beginMonth, "Debe escribir algo");
        } else {
            setSuccessFor(beginMonth);
        }

        if (beginYearValue == 0) {
            setErrorFor(beginYear, "Debe escribir algo");
        } else {
            setSuccessFor(beginYear);
        }

        if (validateEnd === true) {
            setSuccessFor(endMonth);
            setSuccessFor(endYear);
            endMonth.value = 0
            endYear.value = 0
        } else {
            if (endMonthValue == 0) {
                setErrorFor(endMonth, "Debe escribir algo");
            } else {
                setSuccessFor(endMonth);
            }

            if (endYearValue == 0) {
                setErrorFor(endYear, "Debe escribir algo");
            } else {
                setSuccessFor(endYear);
            }
        }


        //termina la validacion
    }

    function checkInputs4() {
        const titlesValue = titles2.value.trim();
        const placeValue = place2.value.trim();
        const beginMonthValue = beginMonth2.value.trim();
        const beginYearValue = beginYear2.value.trim();
        const endMonthValue = endMonth2.value.trim();
        const endYearValue = endYear2.value.trim();

        // comienza la validacion
        if (titlesValue == 0) {
            setErrorFor(titles2, "Debe escribir algo");
        } else {
            setSuccessFor(titles2);
        }

        if (placeValue === "") {
            setErrorFor(place2, "Debe escribir algo");
        } else {
            setSuccessFor(place2);
        }

        if (beginMonthValue == 0) {
            setErrorFor(beginMonth2, "Debe escribir algo");
        } else {
            setSuccessFor(beginMonth2);
        }

        if (beginYearValue == 0) {
            setErrorFor(beginYear2, "Debe escribir algo");
        } else {
            setSuccessFor(beginYear2);
        }

        if (endMonthValue == 0) {
            setErrorFor(endMonth2, "Debe escribir algo");
        } else {
            setSuccessFor(endMonth2);
        }

        if (endYearValue == 0) {
            setErrorFor(endYear2, "Debe escribir algo");
        } else {
            setSuccessFor(endYear2);
        }


        //termina la validacion
    }

    function checkInputs5() {
        const titlesValue = formType.value.trim();
        const titledInValue = formedIn.value.trim();
        const placeValue = place3.value.trim();
        const beginMonthValue = beginMonth3.value.trim();
        const beginYearValue = beginYear3.value.trim();
        const endMonthValue = endMonth3.value.trim();
        const endYearValue = endYear3.value.trim();
        const validateEnd = document.getElementById('titledAct2').checked;
        // comienza la validacion
        if (titlesValue == 0) {
            setErrorFor(formType, "Debe escribir algo");
        } else {
            setSuccessFor(formType);
        }

        if (titledInValue === "") {
            setErrorFor(formedIn, "Debe escribir algo");
        } else {
            setSuccessFor(formedIn);
        }

        if (placeValue === "") {
            setErrorFor(place3, "Debe escribir algo");
        } else {
            setSuccessFor(place3);
        }

        if (beginMonthValue == 0) {
            setErrorFor(beginMonth3, "Debe escribir algo");
        } else {
            setSuccessFor(beginMonth3);
        }

        if (beginYearValue == 0) {
            setErrorFor(beginYear3, "Debe escribir algo");
        } else {
            setSuccessFor(beginYear3);
        }

        if (validateEnd === true) {
            setSuccessFor(endMonth3);
            setSuccessFor(endYear3);
            endMonth3.value = 0
            endYear3.value = 0
        } else {
            if (endMonthValue == 0) {
                setErrorFor(endMonth3, "Debe escribir algo");
            } else {
                setSuccessFor(endMonth3);
            }

            if (endYearValue == 0) {
                setErrorFor(endYear3, "Debe escribir algo");
            } else {
                setSuccessFor(endYear3);
            }
        }


        //termina la validacion
    }

    function checkInputs6() {
        const employNameValue = employName.value.trim();
        const enterpriseNameValue = enterpriseName.value.trim();
        const beginMonthValue = beginMonth4.value.trim();
        const beginYearValue = beginYear4.value.trim();
        const endMonthValue = endMonth4.value.trim();
        const endYearValue = endYear4.value.trim();
        const validateEnd = document.getElementById('titledAct3').checked;
        const editorValue = editor2.value.trim();

        // comienza la validacion
        if (employNameValue === "") {
            setErrorFor(employName, "Debe escribir algo");
        } else {
            setSuccessFor(employName);
        }

        if (enterpriseNameValue === "") {
            setErrorFor(enterpriseName, "Debe escribir algo");
        } else {
            setSuccessFor(enterpriseName);
        }

        if (beginMonthValue == 0) {
            setErrorFor(beginMonth4, "Debe escribir algo");
        } else {
            setSuccessFor(beginMonth4);
        }

        if (beginYearValue == 0) {
            setErrorFor(beginYear4, "Debe escribir algo");
        } else {
            setSuccessFor(beginYear4);
        }

        if (validateEnd === true) {
            setSuccessFor(endMonth4);
            setSuccessFor(endYear4);
            endMonth4.value = 0
            endYear4.value = 0
        } else {
            if (endMonthValue == 0) {
                setErrorFor(endMonth4, "Debe escribir algo");
            } else {
                setSuccessFor(endMonth4);
            }

            if (endYearValue == 0) {
                setErrorFor(endYear4, "Debe escribir algo");
            } else {
                setSuccessFor(endYear4);
            }
        }

        // comienza la validacion
        if (editorValue === "") {
            setErrorFor(editor2, "Debe escribir algo");
        } else {
            setSuccessFor(editor2);
        }

        //termina la validacion
    }


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