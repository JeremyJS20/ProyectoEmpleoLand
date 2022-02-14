const crypto = require("crypto");
const { response } = require("express");
const passport = require("passport");
require("../JSNode/passport")(passport);
const restler = require('restler');
const host = 'https://empleoland-restapi.herokuapp.com/'
let multiUso = "";
let multiUso2 = "";
let date = "";
let passHashed = "";
let idUser = "";

// Controladores routerPoster
exports.signInController = (req, res) => {
  signIn(req, res);
};

exports.signInRedirectToController = (req, res) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return;
    } else if (!user) {
      return res.render("signIn", {
        error: "Correo electronico o contraseña son incorrectas",
        status: " alert-danger d-block",
        action: req.originalUrl
      });
    } else {
      if (user.userType === "Company") {
        req.login(user, (err) => {
          req.session.passport.user = user.IDUsuario;
          req.session.save(function (err) {
            // session saved
            res.redirect("/myPostedEmploys/1");
          });
        });
      } else {
        req.login(user, (err) => {
          req.session.passport.user = user.IDUsuario;
          req.session.save(function (err) {
            // session saved
            multiUso = req.params.url.replaceAll("*", "/")
            res.redirect(multiUso);
          });
        });
      }

      return;
    }
  })(req, res);
};

exports.signUpCandidateController = (req, res) => {
  idUser =
    "U-" +
    req.body.name.trim().substr(0, 2).toUpperCase() +
    req.body.Lname.trim().substr(0, 2).toUpperCase() +
    (Math.floor(Math.random() * (9999 - 1000)) + 1000);

  let date = "";

  if (Number(req.body.birthday) < 10) {
    if (Number(req.body.birthmonth) < 10) {
      multiUso2 = new Date(req.body.birthyear, ("0" + (req.body.birthmonth - 1)), ("0" + req.body.birthday))
      date = multiUso2.getFullYear() + "-0" + (multiUso2.getMonth() + 1) + "-0" + multiUso2.getDate() + " " +
        multiUso2.getHours() + "0:" + multiUso2.getMinutes() + "0:" + multiUso2.getSeconds() + "0"

    } else {
      multiUso2 = new Date(req.body.birthyear, (req.body.birthmonth - 1), ("0" + req.body.birthday))

      date = multiUso2.getFullYear() + "-" + (multiUso2.getMonth() + 1) + "-0" + multiUso2.getDate() + " " +
        multiUso2.getHours() + "0:" + multiUso2.getMinutes() + "0:" + multiUso2.getSeconds() + "0"
    }
  } else {
    if (Number(req.body.birthmonth) < 10) {
      multiUso2 = new Date(req.body.birthyear, ("0" + (req.body.birthmonth - 1)), req.body.birthday)

      date = multiUso2.getFullYear() + "-0" + (multiUso2.getMonth() + 1) + "-" + multiUso2.getDate() + " " +
        multiUso2.getHours() + "0:" + multiUso2.getMinutes() + "0:" + multiUso2.getSeconds() + "0"
    } else {

      multiUso2 = new Date(req.body.birthyear, req.body.birthmonth, req.body.birthday)
      date = multiUso2.getFullYear() + "-" + (multiUso2.getMonth() + 1) + "-" + multiUso2.getDate() + " " +
        multiUso2.getHours() + "0:" + multiUso2.getMinutes() + "0:" + multiUso2.getSeconds() + "0"
    }
  }

  multiUso = [
    idUser,
    req.body.name,
    req.body.Lname,
    date,
    req.body.idbegin + req.body.idmid + req.body.idend,
    req.body.genre.substr(0, 1),
    req.cookies.email
  ];

  if (req.cookies.candidateData) {
    res.clearCookie('candidateData')
  }

  res.cookie("candidateData", multiUso);
  res.redirect('/createUser2/' + req.params.user + '/' + req.params.token)
};

exports.signUpCandidateController2 = (req, res) => {
  let telRes = "+1" + req.body.telbegin + "-" + req.body.telmid + "-" + req.body.telend;
  let telPer = "+1" + req.body.telbegin2 + "-" + req.body.telmid2 + "-" + req.body.telend2;

  multiUso = [];
  multiUso.push(telRes, telPer);

  res.cookie('candidateData2', multiUso);
  res.redirect('/createUser3/' + req.params.user + '/' + req.params.token);
};

exports.signUpCandidateController3 = (req, res) => {
  multiUso = []
  multiUso.push(req.body.street, ("#" + req.body.homeNumber), ("#" + req.body.postcode), req.body.dm, req.body.city, req.body.province)

  res.cookie('candidateData3', multiUso)
  res.redirect('/createUser4/' + req.params.user + '/' + req.params.token)
};

exports.signUpCandidateController4 = (req, res) => {
  //encriptar clave
  passHashed = crypto.createHash("sha256");
  passHashed.update(req.body.password);

  multiUso = []

  req.cookies.candidateData.forEach(data => {
    multiUso.push(data)
  });
  req.cookies.candidateData2.forEach(data => {
    multiUso.push(data)
  });
  req.cookies.candidateData3.forEach(data => {
    multiUso.push(data)
  });

  multiUso.push(passHashed.digest('hex'))

  for (var cookie in req.cookies) {
    res.clearCookie(cookie);
  };

  restler.post(host + '/CreateCandidate', {
    data: {
      CandidateData: multiUso,
    },
  }).on('complete', function (data, response) {
    if (data.successCode != undefined || data.successCode != null) {
      signIn(req, res);
    } else{
      throw data;
    }
  });
};

exports.signUpCompanyController = (req, res) => {
  multiUso = ["C-" +
    req.body.enterpriseName.trim().substr(0, 3).toUpperCase() +
    (Math.floor(Math.random() * (999 - 100)) + 100),
    req.body.enterpriseName, req.body.creationYear, req.body.Area, req.body.logo, req.body.url
  ];

  if (req.cookies.companyData) {
    res.clearCookie('companyData');
  }

  res.cookie('companyData', multiUso);
  res.redirect('/createUser2/' + req.params.user + '/' + req.params.token)
};

exports.signUpCompany2Controller = (req, res) => {
  let telRes = "+1" + req.body.telbegin + "-" + req.body.telmid + "-" + req.body.telend;

  res.cookie('companyData2', telRes);
  res.redirect('/createUser3/' + req.params.user + '/' + req.params.token);
};

exports.signUpCompany3Controller = (req, res) => {
  multiUso = [];
  multiUso.push(req.body.street, ("#" + req.body.homeNumber), ("#" + req.body.postcode), req.body.dm,
    req.body.city, req.body.province);

  if (req.cookies.companyData) {
    res.clearCookie('companyData3')
  }
  res.cookie('companyData3', multiUso)
  res.redirect('/createUser4/' + req.params.user + '/' + req.params.token);
};

exports.signUpCompany4Controller = (req, res) => {
  //encriptar clave
  passHashed = crypto.createHash("sha256");
  passHashed.update(req.body.password);

  multiUso = [];

  req.cookies.companyData.forEach(data => {
    multiUso.push(data);
  });
  multiUso.push(req.cookies.email);
  multiUso.push(req.cookies.companyData2);
  req.cookies.companyData3.forEach(data => {
    multiUso.push(data);
  });

  multiUso.push(passHashed.digest('hex'));

  for (var cookie in req.cookies) {
    res.clearCookie(cookie);
  };

  restler.post(host + '/CreateCompany', {
    data: {
      CompanyData: multiUso,
    },
  }).on('complete', function (data, response) {
    if (data.successCode != undefined || data.successCode != null) {
      signIn(req, res);
    } else{
      throw data;
    }
  });
};

exports.postEmployController = (req, res) => {
  date = new Date();
  date =
    date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2) +
    " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
  restler.post(host + '/PostEmploy',
  {
    data: {
      idUser: req.user.IDUsuario,
      employName: req.body.employName,
      tipoTrabajo: req.body.tipoTrabajo,
      tanda: req.body.tanda,
      Modalidad: req.body.Modalidad,
      Categoria: req.body.Categoria,
      Descripcion: req.body.Descripcion,
      Requisitos: req.body.requisitos,
      Beneficios: req.body.benefit,
      fecha: date,
    }
  }).on('complete', (data, response) => {
    if(data.successCode != undefined){
      res.redirect('/myPostedEmploys/1')
    } else{
      throw data;
    }
  });
};

exports.forgottenPassword2 = (req, res) => {
  restler.post(host + '/forgottenPassword', {
    data: {
      email: req.body.email
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.render("fp", {
        status: "",
        error: "",
        formStatus: "d-none",
        msgFormStatus: "d-inline-block",
      });
    } else if(data.errCode != undefined || data.errCode != null){
      return res.render("fp", {
        status: " alert-danger d-block",
        error: "Usuario no encontrado. Ingrese un correo de un usuario registrado.",
        formStatus: "d-block",
        msgFormStatus: "d-none",
      });
    } else{
      throw data;
    }
  });
};

exports.resetPassword2 = (req, res) => {
  restler.post(host + '/ResetPassword', {
    data: {
      email: req.body.email,
      password: req.body.password
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      res.redirect('/signIn');
    } else {
      throw data;
    }
  });

  res.clearCookie("email");
};

exports.preSignUp = (req, res) => {
  restler.post(host + '/preSignUp', {
    data: {
      email: req.body.email,
      user: req.params.user
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.render("preSignUp", {
        status: "",
        error: "",
        formStatus: "d-none",
        msgFormStatus: "d-inline-block",
        user: "",
      });
    } else if(data.errCode != undefined || data.errCode != null){
      return res.render("preSignUp", {
        status: "alert-danger",
        error: "Este correo ya existe. Intente con otro.",
        formStatus: "d-inline-block",
        formStatus2: "d-block",
        msgFormStatus: "d-none",
        user: req.params.user,
      });
    } else{
      throw data;      
    }
  });
};

exports.editJobController = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      multiUso2 =
        "UPDATE Trabajos SET Nombre= '" +
        req.body.employName +
        "', TipoTrabajo = '" +
        req.body.tipoTrabajo +
        "', Tanda = '" +
        req.body.tanda +
        "', Modalidad = '" +
        req.body.Modalidad +
        "', Categoria = '" +
        req.body.Categoria +
        "', Descripcion = '" +
        req.body.Descripcion +
        "', Requisitos = '" +
        req.body.requisitos +
        "' WHERE IDTrabajo = " +
        req.params.id +
        "";

      dbConnection.getConnection((err, connection) => {
        if (err) {
          throw err;
        } else {
          connection.query(multiUso2, (err, result) => {
            if (err) {
              throw err;
            } else {
              res.redirect("/myPostedEmploys/" + req.params.pageNum);
            }
          });
          connection.release();
        }
      });
    } else {
      res.send("<h1>No tienes los permisos necesarios</h1>");
    }
  } else {
    return res.redirect("/home");
  }
};

exports.searchEmploy = (req, res) => {
  res.redirect(
    "/searchEmploy/searchFor=" + req.body.jobOrComp + "-Province=" + req.body.city + "/1"
  );
};

exports.defineCandidateProfilePhoto = async (req, res) => {
  if(!req.files){
    return res.send('no files to upload')
  }
  const profilePhoto = req.files.profilePhoto;
  var fileName = req.user.IDUsuario + '.' + profilePhoto.name.split('.')[1];
  const data = restler.data(fileName, profilePhoto.mimetype, profilePhoto.data);
  restler.post(host + '/DefineCandidateProfilePhoto', {
    multipart: true,
    data: {
      profilePhoto: data
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

exports.definePresentation = (req, res) => {
  restler.post(host + '/DefinePresentation', {
    data: {
      idUser: req.user.IDUsuario,
      presentation: req.body.presentation,
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

exports.defineSkills = (req, res) => {
  restler.post(host + '/DefineSkills', {
    data: {
      idUser: req.user.IDUsuario,
      skills: req.body.skills,
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;
    }
  });
};

exports.defineLanguages = (req, res) => {
  restler.post(host + '/DefineLanguages', {
    data: {
      idUser: req.user.IDUsuario,
      languages: req.body.languages,
      langLevel: req.body.langLevel
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

exports.defineAcademicalForm = (req, res) => {
  restler.post(host + '/DefineAcademicalForm', {
    data: {
      idUser: req.user.IDUsuario,
      titles2: req.body.titles2,
      place2: req.body.place2,
      beginMonth2: req.body.beginMonth2,
      beginYear2: req.body.beginYear2,
      endMonth2: req.body.endMonth2,
      endYear2: req.body.endYear2
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;
    }
  });
};

exports.defineProfessionalForm = (req, res) => {
  restler.post(host + '/DefineProfessionalForm', {
    data: {
      idUser: req.user.IDUsuario,
      titles: req.body.titles,
      titledIn: req.body.titledIn,
      place: req.body.place,
      beginMonth: req.body.beginMonth,
      beginYear: req.body.beginYear,
      endMonth: req.body.endMonth,
      endYear: req.body.endYear
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

exports.defineComplementaryForm = (req, res) => {
  restler.post(host + '/DefineComplementaryForm', {
    data: {
      idUser: req.user.IDUsuario,
      formedIn: req.body.formedIn,
      formType: req.body.formType,
      place3: req.body.place3,
      beginMonth3: req.body.beginMonth3,
      beginYear3: req.body.beginYear3,
      endMonth3: req.body.endMonth3,
      endYear3: req.body.endYear3
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

exports.defineLaboralExperience =  (req, res) => {
  restler.post(host + '/DefineLaboralExperience', {
    data: {
      idUser: req.user.IDUsuario,
      employName: req.body.employName,
      enterpriseName: req.body.enterpriseName,
      beginMonth4: req.body.beginMonth4,
      beginYear4: req.body.beginYear4,
      endMonth4: req.body.endMonth4,
      endYear4: req.body.endYear4,
      desc: req.body.desc
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

exports.defineSummary =  (req, res) => {
  restler.post(host + '/DefineSummary', {
    data: {
      idUser: req.user.IDUsuario,
      summary: req.body.summary
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

exports.defineMission =  (req, res) => {
  restler.post(host + '/DefineMission', {
    data: {
      idUser: req.user.IDUsuario,
      mission: req.body.mission
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

exports.defineVision =  (req, res) => {
  restler.post(host + '/DefineVision', {
    data: {
      idUser: req.user.IDUsuario,
      vision: req.body.vision
    }
  }).on('complete', (data, response) => {
    if (data.successCode != undefined || data.successCode != null) {
      return res.redirect(req.params.url.replaceAll('*', '/'));
    } else{
      throw data;      
    }
  });
};

//controller's functions
function signIn(req, res) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return;
    } else if (!user) {
      res.render("signIn", {
        error: "Correo electronico o contraseña son incorrectas",
        status: " alert-danger d-block",
        action: '/signIn'
      });
    } else {
      if (user.userType === "Company") {
        req.login(user, (err) => {
          req.session.passport.user = user.IDUsuario;
          req.session.save(function (err) {
            // session saved
            res.redirect("/myProfile-CompanyID=" + user.IDUsuario + '/');
          });
        });
      } else {
        req.login(user, (err) => {
          req.session.passport.user = user.IDUsuario;
          req.session.save(function (err) {
            // session saved
            res.redirect("/employes");
          });
        });
      }
    }
  })(req, res);
}
