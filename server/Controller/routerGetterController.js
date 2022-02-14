//Controladores routerGetter
const jwt = require("jsonwebtoken"); //token para los correos
const restler = require('restler');
const host = 'https://empleoland-restapi.herokuapp.com/';
let multiUso = "";

exports.welcomePage = async (req, res) => {
  if (req.isAuthenticated() === true && req.user.userType === 'Candidate' || !req.isAuthenticated()) {
    restler.get(host + '/Employs').on('complete', (data, response) => {
      if (data.EmploysData != undefined) {
        res.render("home", {
          data: data.EmploysData,
          action: "/searchEmploy",
          req: req
        });
      } else {
        throw data;
      }
    });
  } else {
    res.redirect('myPostedEmploys/1');
  }
};

exports.signInAuthController = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      return res.redirect("/myPostedEmploys");
    } else {
      return res.redirect("/employes");
    }
  } else {
    return res.render("signIn", {
      error: "",
      status: "",
      action: "/signIn"
    });
  }
};

exports.signInRedirectToAuthController = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      return res.redirect("/myPostedEmploys");
    } else {
      return res.redirect("/employes");
    }
  } else {
    return res.render("signIn", {
      error: "",
      status: "",
      action: "/signIn-RedirectTo=" + req.params.url
    });
  }
};

exports.CATAuthController = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/employes");
  } else {
    res.render("chooseAccountType", {
      status: "",
      error: "",
      formStatus: "",
      formStatus2: "d-block",
      msgFormStatus: "d-none",
    });
  }
};

//primer form de registro de candidato
exports.signUpAuthController = (req, res) => { 
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      return res.redirect("/myPostedEmploys/1");
    } else {
      return res.redirect("/employes");
    }
  } else {
    jwt.verify(req.params.token, "myToken", (err, data) => {
      if (err) {
        for(var cookie in req.cookies){
          res.clearCookie(cookie);
        };
        return res.send("<h1>Su token ha expirado. Vuelva a intentarlo.</h1>");
      } else {
        if (req.cookies.email !== undefined) {
          res.clearCookie("email");
        }
        res.cookie("email", data.idUser);
        if (req.params.user === "Candidate") {
          return res.render("signUp", {
            emailValue: data.idUser,
            formStatus: "",
            form2Status: "d-none",
            form3Status: "d-none",
            form4Status: "d-none",
            form5Status: "d-none",
            token: req.params.token,
            userType: req.params.user,
            info: " - Informaciones basicas",
            req: req,
            actionForm2: "/signUpCandidate2/" + req.params.user + "/" + req.params.token,
            actionForm3: "/signUpCandidate3/" + req.params.user + "/" + req.params.token,
            actionForm4: "/signUpCandidate4/" + req.params.user + "/"+ req.params.token,
            userCookieData: req.cookies.candidateData,
            userCookieData2: req.cookies.candidateData2,
            userCookieData3: req.cookies.candidateData3
          });
        } else if(req.params.user === "Company"){
          return res.render("signUp", {
            emailValue: data.idUser,
            formStatus: "d-none",
            form2Status: "d-none",
            form3Status: "d-none",
            form4Status: "d-none",
            form5Status: "",
            token: req.params.token,
            userType: req.params.user,
            info: " - Informaciones basicas",
            req: req,
            actionForm2: "/signUpCompany2/" + req.params.user + "/" + req.params.token,
            actionForm3: "/signUpCompany3/" + req.params.user + "/" + req.params.token,
            actionForm4: "/signUpCompany4/" + req.params.user + "/" + req.params.token,
            userCookieData: req.cookies.companyData,
            userCookieData2: req.cookies.companyData2,
            userCookieData3: req.cookies.companyData3,
            
          });
        }else {
          return res.send('<h1>No tiene los permisos</h1>')
        }
      }
    });
  }
};

//segundo form de registro de candidato
exports.signUpAuthController2 = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      return res.redirect("/myPostedEmploys");
    } else {
      return res.redirect("/employes");
    }
  } else {
    jwt.verify(req.params.token, "myToken", (err, data) => {
      if (err) {
        for(var cookie in req.cookies){
          res.clearCookie(cookie);
        };
        return res.send("<h1>Su token ha expirado. Vuelva a intentarlo.</h1>");
      } else {
        if (req.params.user === "Candidate") {
          return res.render("signUp", {
            emailValue: data.idUser,
            formStatus: "d-none",
            form2Status: "",
            form3Status: "d-none",
            form4Status: "d-none",
            form5Status: "d-none",
            token: req.params.token,
            userType: req.params.user,
            info: " - Informaciones de contacto",
            req: req,
            actionForm2: "/signUpCandidate2/" + req.params.user + "/" + req.params.token,
            actionForm3: "/signUpCandidate3/" + req.params.user + "/" + req.params.token,
            actionForm4: "/signUpCandidate4/" + req.params.user + "/" + req.params.token,
            userCookieData: req.cookies.candidateData,
            userCookieData2: req.cookies.candidateData2,
            userCookieData3: req.cookies.candidateData3
          });
        } else if(req.params.user === "Company"){
          return res.render("signUp", {
            emailValue: data.idUser,
            formStatus: "d-none",
            form2Status: "",
            form3Status: "d-none",
            form4Status: "d-none",
            form5Status: "d-none",
            token: req.params.token,
            userType: req.params.user,
            info: " - Informaciones de contacto",
            req: req,
            actionForm2: "/signUpCompany2/" + req.params.user + "/" + req.params.token,
            actionForm3: "/signUpCompany3/" + req.params.user + "/" + req.params.token,
            actionForm4: "/signUpCompany4/" + req.params.user + "/" + req.params.token,
            userCookieData: req.cookies.companyData,
            userCookieData2: req.cookies.companyData2,
            userCookieData3: req.cookies.companyData3
          });
        }else {
          return res.send('<h1>No tiene los permisos</h1>')
        }
      }
    });
  }
};

//tercer form de registro de candidato
exports.signUpAuthController3 = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      return res.redirect("/myPostedEmploys");
    } else {
      return res.redirect("/employes");
    }
  } else {
    jwt.verify(req.params.token, "myToken", (err, data) => {
      if (err) {
        for(var cookie in req.cookies){
          res.clearCookie(cookie);
        };
        return res.send("<h1>Su token ha expirado. Vuelva a intentarlo.</h1>");
      } else {
        if (req.params.user === "Candidate") {
          return res.render("signUp", {
            emailValue: data.idUser,
            formStatus: "d-none",
            form2Status: "d-none",
            form3Status: "",
            form4Status: "d-none",
            form5Status: "d-none",
            token: req.params.token,
            userType: req.params.user,
            info: " - Informaciones de ubicacion",
            req: req,
            actionForm2: "/signUpCandidate2/" + req.params.user + "/" + req.params.token,
            actionForm3: "/signUpCandidate3/" + req.params.user + "/" + req.params.token,
            actionForm4: "/signUpCandidate4/" + req.params.user + "/" + req.params.token,
            userCookieData: req.cookies.candidateData,
            userCookieData2: req.cookies.candidateData2,
            userCookieData3: req.cookies.candidateData3
          });
        } else if(req.params.user === "Company"){
          return res.render("signUp", {
            emailValue: data.idUser,
            emailValue2: "",
            formStatus: "d-none",
            form2Status: "d-none",
            form3Status: "",
            form4Status: "d-none",
            form5Status: "d-none",
            token: req.params.token,
            userType: req.params.user,
            info: " - Informaciones de ubicacion",
            req: req,
            actionForm2: "/signUpCompany2/" + req.params.user + "/" + req.params.token,
            actionForm3: "/signUpCompany3/" + req.params.user + "/" + req.params.token,
            actionForm4: "/signUpCompany4/" + req.params.user + "/" + req.params.token,
            userCookieData: req.cookies.companyData,
            userCookieData2: req.cookies.companyData2,
            userCookieData3: req.cookies.companyData3
          });
        }else {
          return res.send('<h1>No tiene los permisos</h1>');
        }
      }
    });
  }
};

//cuarto form de registro de candidato
exports.signUpAuthController4 = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      return res.redirect("/myPostedEmploys");
    } else {
      return res.redirect("/employes");
    }
  } else {
    jwt.verify(req.params.token, "myToken", (err, data) => {
      if (err) {
        for(var cookie in req.cookies){
          res.clearCookie(cookie);
        };
        return res.send("<h1>Su token ha expirado. Vuelva a intentarlo.</h1>");
      } else {
        if (req.params.user === "Candidate") {
          return res.render("signUp", {
            emailValue: data.idUser,
            formStatus: "d-none",
            form2Status: "d-none",
            form3Status: "d-none",
            form4Status: "",
            form5Status: "d-none",
            token: req.params.token,
            userType: req.params.user,
            info: " - Informaciones de inicio de sesion",
            req: req,
            actionForm2: "/signUpCandidate2/" + req.params.user + "/" + req.params.token,
            actionForm3: "/signUpCandidate3/" + req.params.user + "/" + req.params.token,
            actionForm4: "/signUpCandidate4/" + req.params.user + "/"+ req.params.token,
            userCookieData: req.cookies.candidateData,
            userCookieData2: req.cookies.candidateData2,
            userCookieData3: req.cookies.candidateData3
          });
        } else if(req.params.user === "Company"){
          return res.render("signUp", {
            emailValue: data.idUser,
            formStatus: "d-none",
            form2Status: "d-none",
            form3Status: "d-none",
            form4Status: "",
            form5Status: "d-none",
            token: req.params.token,
            userType: req.params.user,
            info: " - Informaciones de inicio de sesion",
            req: req,
            actionForm2: "/signUpCompany2/" + req.params.user + "/" + req.params.token,
            actionForm3: "/signUpCompany3/" + req.params.user + "/" + req.params.token,
            actionForm4: "/signUpCompany4/" + req.params.user + "/" + req.params.token,
            userCookieData: req.cookies.companyData,
            userCookieData2: req.cookies.companyData2,
            userCookieData3: req.cookies.companyData3
          });
        }else {
          return res.send('<h1>No tiene los permisos</h1>');
        }
      }
    });
  }
};

exports.signOutAuthController = (req, res) => {
  req.logout();
  res.redirect("/signIn");
};

exports.postEmploy = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      return res.render("postEmploy", {
        Action: "/postEmploy",
        Method: "POST",
        Name: "Publicar Empleo",
        icon1: "",
        icon2: "d-none",
        req: req
      });
    } else {
      return res.send("No tienes los permisos necesarios.");
    }
  }
  return res.send("No tienes los permisos necesarios.");
};

exports.showJobs = (req, res) => {
  showJobs(req, res);
};

exports.preSignUp = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userTyper === "Company") {
      res.redirect("/myPostedEmploys/1")
    } else {
      res.redirect("/employes");
    }
  } else {
    res.render("preSignUp", {
      status: "",
      error: "",
      formStatus: "",
      formStatus2: "d-block",
      msgFormStatus: "d-none",
      user: req.params.user,
    });
  }
};

exports.forgottenPassword = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userTyper === "Company") {
      res.redirect("/myPostedEmploys/1")
    } else {
      res.redirect("/employes");
    }
  } else {
    res.render("fp", {
      status: "",
      error: "",
      formStatus: "",
      formStatus2: "d-block",
      msgFormStatus: "d-none",
    });
  }
};

exports.resetPassword = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userTyper === "Company") {
      res.redirect("/myPostedEmploys/1")
    } else {
      res.redirect("/employes");
    }
  } else {
    jwt.verify(req.params.token, "myToken", (err, data) => {
      if (err) {
        res.send("<h1>Su token ha expirado. Vuelva a intentarlo.</h1>");
      } else {
        res.render("resetPassword", {
          email: data.idUser
        });
      }
    });
  }
};

exports.deleteEmploy = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      multiUso = "DELETE FROM Trabajos WHERE IDTrabajo = " + req.params.id + "";
      dbConnection.getConnection((err, connection) => {
        if (err) {
          throw err;
        } else {
          connection.query(multiUso, (err, result) => {
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
      return res.send("<h1>No tienes los permisos necesarios</h1>");
    }
  } else {
    return res.send("<h1>No tienes los permisos necesarios</h1>");
  }
};

exports.editEmploy = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.userType === "Company") {
      res.render("postEmploy", {
        Action: "/myPostedEmploys" +
          "/" +
          req.params.pageNum +
          "/" +
          req.params.id +
          "/employEdited",
        Method: "POST",
        Name: "Editar Empleo",
        icon1: "d-none",
        icon2: "",
        req: req
      });
    } else {
      return res.send("<h1>No tienes los permisos necesarios</h1>");
    }
  } else {
    return res.send("<h1>No tienes los permisos necesarios</h1>");
  }
};

exports.employsAuthController = (req, res) => {
  if (req.isAuthenticated() && req.user.userType === "Candidate" || !req.isAuthenticated()) {
    restler.get(host + '/EmployCategories/').on('complete', (data, response) => {
      res.render("employes", {
        data: data,
        req: req,
        noJobs: "No hay trabajos publicados.",
      });
    });
  } else {
    res.redirect('/myPostedEmploys/1');
  }
};

exports.employs2AuthController = (req, res) => {
  if (req.isAuthenticated() && req.user.userType === "Candidate" || !req.isAuthenticated()) {
    restler.get(host + '/EmployCategories/' + req.params.categorie).on('complete', (data, response) => {
      res.render("employes2", {
        data: data,
        categorie: req.params.categorie,
        req: req
      });
    });
  } else {
    res.redirect('/myPostedEmploys/1');
  }
};

exports.employs3AuthController = (req, res) => {
  if (req.isAuthenticated() && req.user.userType === "Candidate" || !req.isAuthenticated()) {
    restler.get(host + '/EmployCategories/' + req.params.categorie + '/' + req.params.city + '/' + req.params.pageNum).on('complete', (data, response) => {
      if(data.EmploysData != undefined){
        res.render("showJobs", {
          data: data.EmploysData,
          categorie: req.params.categorie,
          province: req.params.city,
          numPages: data.numPages.numRows,
          value: req.params.pageNum,
          limit: data.limit,
          req: req
        });
      } else{
        throw data;
      }
    });
  } else {
    res.redirect('/myPostedEmploys/1');
  }
};

exports.showEmployDetails = (req, res) => {
  ShowEmpDetails(req, res);
};

exports.applyToEmploy = (req, res) => {
  if (req.isAuthenticated() === true && req.user.userType === "Candidate") {
    restler.get(host + '/ApplyToEmploy/ ' + req.params.id + '/' + req.user.IDUsuario).on('complete', (data, response) => {
      if(data.successCode != undefined){
        ShowEmpDetails(req, res);
      } else{
        throw data;
      }
    });
  } else {
    return res.send("<h1>No tienes los permisos necesarios</h1>")
  }
};

exports.searchEmploy = (req, res) => {
  if (req.isAuthenticated() && req.user.userType === "Candidate" || !req.isAuthenticated()) {
    restler.get(host + '/SearchEmploy/' + req.params.jobOrComp + '/' + req.params.city + '/' + req.params.pageNum).on('complete', (data, response) => {
      if(data.EmploysData != undefined){
        res.render("searchEmploy", {
          data: data.EmploysData,
          numPages: data.numPages,
          value: req.params.pageNum,
          limit: data.limit,
          province: req.params.city,
          employ: req.params.jobOrComp,
          req: req
        });
      } else{
        throw data;
      }
    });
  } else {
    res.redirect('/myPostedEmploys/1')
  }
};

exports.showMyCandidateProfile = (req, res) => {
  if (req.isAuthenticated() && req.user.userType === "Candidate" || req.isAuthenticated() && req.user.userType === "Company") {
    restler.get(host + '/CandidateData/' + req.params.IDUser).on('complete', (data, response) => {
      if(data.CandidateInfo != undefined){
        res.render("myProfile", {
          req: req,
          candidateData: data.CandidateInfo[0],
          candidateData2: data.CandidateCV2,
          candidateData3: data.CandidateCV3,
          Images: data.Images
        });
      } else{
        throw data;
      }
    });
  } else {
    res.redirect("/home");
  }
};

exports.showMyCompanyProfile = (req, res) => {
  restler.get(host + '/CompanyData/' + req.params.IDUser).on('complete', (data, response) => {
    if(data.CompanyInfo != undefined){
      restler.get(host + '/MyCompanyEmploys/1/' + req.params.IDUser).on('complete', (data2, response) => {
        if(data2.myCompanyEmploys != undefined){
          res.render("myCompanyProfile", {
            req: req,
            CompanyData: data.CompanyInfo[0],
            CompanyData2: data.CompanyInfo2[0],
            employs: data2.myCompanyEmploys,
            Images: data.Images
          });
        } else{
          throw data;
        }
      });
    } else{
      throw data;
    }
  });
};

exports.showMyPostedJobs = (req, res) => {
  if (req.isAuthenticated() && req.user.userType === "Company") {
    restler.get(host + '/MyCompanyEmploys/' + req.params.pageNum + '/' + req.user.IDUsuario).on('complete', (data, response) => {
      if(data.myCompanyEmploys != undefined){
        res.render("myPostedEmploys", {
          data: data.myCompanyEmploys,
          numPages: data.numPages.numRows,
          value: req.params.pageNum,
          limit: data.limit,
          req: req
        }); 
      } else{
        throw data;
      }
    });
  } else {
    res.redirect("/home");
  }  
};


function ShowEmpDetails(req, res){
  restler.get(host + '/EmployDetails/' + req.params.id).on('complete', (data, response) => {
    if(data.EmployDetails != undefined){
      res.render("showEmployDetails", {
        employData: data.EmployDetails,
        value: req.params.pageNum,
        solAmount: data.EmploySolAmount,
        req: req
      });
    } else{
      throw data;
    }
  });
}
