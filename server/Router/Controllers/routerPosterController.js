const db = require("../../Utilities/BD");
const crypto = require("crypto");
const nodemailer = require("../../Utilities/nodemailer");
const transporter = new nodemailer();
const jwt = require("jsonwebtoken");
const dbConnection = new db().dbCreateCon(); //conexion a base de datos
const util = require('util');
const query = util.promisify(dbConnection.query).bind(dbConnection); //para las peticiones a la base de datos
let multiUso = "";
let multiUso2 = "";
let passHashed = "";
let idUser = "";
const multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = '';
    if(file.originalname.split('.')[0].split('-')[0].charAt(0) === "U"){
      path = './public/IMG/CandidateProfileIMG'
    } else{
      path = './public/IMG/CompanyProfileIMG'
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let filename = '';
    if(file.originalname.split('.')[0].split('-')[0].charAt(0) === "U"){
      filename = file.originalname.split('.')[0] + '+Profile.' + file.originalname.split('.')[1]
    } else{
      filename = file.originalname.split('.')[0] + '+Logo.' + file.originalname.split('.')[1]
    }
    cb(null, filename);
  },
});
var uploadFile = multer({
  storage: storage, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  }, 
  limits:{fileSize: 3 * 1024 * 1024}
}).single('profilePhoto');

const uploadPhoto = util.promisify(uploadFile);

exports.SendEmailToResetPassword = async (req, res) => {
  try {
    const Candidate = await query("SELECT Nombre, Correo FROM Candidatos WHERE Correo = '" + req.body.email + "'");

    if (Candidate[0] === undefined || Candidate.length === 0) {
      const Company = await query("SELECT Nombre, Email FROM Compañia WHERE Email = '" + req.body.email + "'");
      if (Company[0] === undefined || Company.length === 0) {
        res.json({
          errCode: -1,
          errMsg: "User don't exists"
        });
      } else {
        sendEmailValidationToResetPassword(req, res, Company);
        res.json({
          successCode: 1,
          successMsg: 'Email to reset password sended successfully'
        });
      }
    } else {
      sendEmailValidationToResetPassword(req, res, Candidate);
      res.json({
        successCode: 1,
        successMsg: 'Email to reset password sended successfully'
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.ResetPassword = async (req, res) => {
  passHashed = crypto.createHash("sha256");
  passHashed.update(req.body.password);

  try {
    const cadidateID = await query("SELECT IDCandidato FROM Candidatos WHERE Correo = '" + req.body.email + "'");

    if (cadidateID.length === 0) {
      await query('UPDATE Compañia SET Contraseña = "' + passHashed.digest("hex") + '" WHERE Email = "' + req.body.email + '"');
    } else {
      await query('UPDATE Candidatos SET Contraseña = "' + passHashed.digest("hex") + '" WHERE Correo = "' + req.body.email + '"');
    }
    res.json({
      successCode: 3,
      errMsg: "Password updated"
    });
  } catch (error) {
    res.json(error);
  }
};

exports.SendEmailToSignUp = async (req, res) => {
  try {
    const Candidate = await query("SELECT Correo FROM Candidatos WHERE Correo = '" + req.body.email + "'");

    if (Candidate[0] === undefined || Candidate.length === 0) {
      const Company = await query("SELECT Email FROM Compañia WHERE Email = '" + req.body.email + "'");
      if (Company[0] === undefined) {
        if (req.body.user === "Candidate") {
          sendVerificationEmailToSignUp(req, res, "Candidate");
        } else {
          sendVerificationEmailToSignUp(req, res, "Company");
        }
        res.json({
          successCode: 2,
          successMsg: 'Email to sign up sended successfully'
        });
      } else {
        res.json({
          errCode: -2,
          errMsg: "User already exists"
        });
      }
    } else {
      res.json({
        errCode: -2,
        errMsg: "User already exists"
      });
    }
  } catch (error) {
    res.json(error);
  }
}; 

exports.SignUpCandidate = async (req, res) => {
  try {
    await query("INSERT INTO Candidatos VALUES (?)", [req.body.CandidateData]);
    await query("INSERT INTO CandidatosCVs (IDCandidato) VALUES ('" + req.body.CandidateData[0] + "')");
    res.json({
      successCode: 4,
      successMsg: 'Candidate signed up'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.SignUpCompany = async (req, res) => {
  try {
    await query("INSERT INTO Compañia VALUES (?)", [req.body.CompanyData]);
    res.json({
      successCode: 4,
      successMsg: 'Company signed up'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineCandidateProfilePhoto = async (req, res) => {
  try {
    await uploadPhoto(req, res);
    if(!req.file){
      return res.json({
        errCode: 5,
        errMsg: "Candidate profile photo wasn't uploaded"
      });
    }
    res.json({
      successCode: 11,
      successMsg: 'Profile photo uploaded'
    })
  } catch (error) {
    res.json(error)
  }
};

exports.definePresentation = async (req, res) => {
  try {
    if (req.body.presentation === undefined) {
      await query("UPDATE CandidatosCVs SET Presentacion = '' WHERE IDCandidato = '" + req.body.idUser + "'");
    } else {
      const presentation = await query("SELECT Presentacion FROM CandidatosCVs WHERE IDCandidato = '" + req.body.idUser + "'");
      if (presentation.length === 0) {
        multiUso = [req.body.idUser, req.body.presentation, '', ''];
        await query("INSERT INTO CandidatosCVs (IDCanditado, Presentacion, Habilidades, Idiomas) VALUES (?)", [multiUso]);
      } else {
        await query("UPDATE CandidatosCVs SET Presentacion = '" + req.body.presentation + "' " +
          "WHERE IDCandidato = '" + req.body.idUser + "'");
      }
    }
    res.json({
      successCode: 5,
      successMsg: 'Presentation added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineSkills = async (req, res) => {
  try {
    if (req.body.skills === undefined) {
      await query("UPDATE CandidatosCVs SET Habilidades = '' WHERE IDCandidato = '" +  req.body.idUser + "'");
    } else {
      const skills = await query("SELECT Habilidades FROM CandidatosCVs WHERE IDCandidato = '" +  req.body.idUser + "'");
      if (typeof (req.body.skills) === "string") {
        multiUso2 = req.body.skills + ". "
      } else {
        multiUso2 = ""
        req.body.skills.forEach(skill => {
          multiUso2 = multiUso2 + skill + ". "
        })
      }
      if (skills.length === 0) {
        multiUso = [req.body.idUser, '', multiUso2, '']
        await query("INSERT INTO CandidatosCVs (IDCandidato, Presentacion, Habilidades, Idiomas) VALUES (?)", [multiUso]);
      } else {
        await query("UPDATE CandidatosCVs SET Habilidades = '" + skills[0].Habilidades + multiUso2 + "' " +
          "WHERE IDCandidato = '" + req.body.idUser + "'")
      }
    }
    res.json({
      successCode: 6,
      successMsg: 'Skills added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineLanguages = async (req, res) => {
  try {
    if (req.body.languages === undefined) {
      await query("UPDATE CandidatosCVs SET Idiomas= '' WHERE IDCandidato = '" + req.body.idUser + "'");
    } else {
      const languages = await query("SELECT Idiomas FROM CandidatosCVs WHERE IDCandidato = '" + req.body.idUser + "'");
      if (languages.length === 0) {
        multiUso = [req.body.idUser, '', '', req.body.languages + ' ' + req.body.langLevel + '. ']
        await query("INSERT INTO CandidatosCVs (IDCandidato, Presentacion, Habilidades, Idiomas) VALUES (?)", [multiUso]);
      } else {
        if (languages[0].Idioma === null || languages[0].Idioma === "") {
          await query("UPDATE CandidatosCVs SET Idiomas = '" + req.body.languages + " " + req.body.langLevel + ". '" +
            "WHERE IDCandidato = '" + req.body.idUser + "'");
        } else {
          await query("UPDATE CandidatosCVs SET Idiomas = '" + languages[0].Idiomas + req.body.languages + " " + req.body.langLevel + ". '" +
            "WHERE IDCandidato = '" + req.body.idUser + "'");
        }
      }
    }
    res.json({
      successCode: 7,
      successMsg: 'Languages added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineAcademicalForm = async (req, res) => {
  try {
    const form = await query("SELECT t2.IDCv FROM Candidatos t1 INNER JOIN CandidatosCVs t2 ON t1.IDCandidato = t2.IDCandidato " +
      "WHERE t2.IDCandidato = '" + req.body.idUser + "'");
    if (req.body.titles2 === undefined) {
      await query("DELETE FROM Formacion WHERE Titulo = 'Bachiller' AND IDCv = " + form[0].IDCv);
    } else {
      multiUso = [form[0].IDCv, , '', req.body.titles2, req.body.place2, req.body.beginMonth2 + " " + req.body.beginYear2,
        req.body.endMonth2 + " " + req.body.endYear2
      ]
      await query("INSERT INTO Formacion VALUES (?)", [multiUso]);
    }
    res.json({
      successCode: 9,
      successMsg: 'Academical Form added successfully'
    });
  } catch (error) {
    res.json(error);
  }
}

exports.defineProfessionalForm = async (req, res) => {
  try {
    const form = await query("SELECT t2.IDCv FROM Candidatos t1 INNER JOIN CandidatosCVs t2 ON t1.IDCandidato = t2.IDCandidato " +
      "WHERE t2.IDCandidato = '" + req.body.idUser + "'");
    if (req.body.titles === undefined) {
      await query("DELETE FROM Formacion WHERE Titulo = 'Tecnico' OR Titulo = 'Grado' OR Titulo = 'Maestria' OR Titulo = 'Doctorado' OR Titulo = 'Bachiller'" +
      " AND IDCv = " + form[0].IDCv);
    } else {
      if (req.body.endMonth == 0 || req.body.endYear == 0 || req.body.endYear === undefined || req.body.endMonth === undefined) {
        multiUso = [form[0].IDCv, , req.body.titledIn, req.body.titles, req.body.place, req.body.beginMonth + " " + req.body.beginYear, "Actualidad", ];
      } else {
        multiUso = [form[0].IDCv, , req.body.titledIn, req.body.titles, req.body.place, req.body.beginMonth + " " + req.body.beginYear,
          req.body.endMonth + " " + req.body.endYear, ];
      }
      await query("INSERT INTO Formacion VALUES (?)", [multiUso]);
    }
    res.json({
      successCode: 9,
      successMsg: 'Professional Form added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineComplementaryForm = async (req, res) => {
  try {
    const form = await query("SELECT t2.IDCv FROM Candidatos t1 INNER JOIN CandidatosCVs t2 ON t1.IDCandidato = t2.IDCandidato " +
      "WHERE t2.IDCandidato = '" + req.body.idUser + "'");
    if (req.body.formType === undefined) {
      await query("DELETE FROM Formacion WHERE Titulo = 'Curso' OR Titulo = 'Diplomado' AND IDCv = " + form[0].IDCv);
    } else {
      if (req.body.endMonth3 == 0 || req.body.endYear3 == 0 || req.body.endYear3 === undefined || req.body.endMonth3 === undefined) {
        multiUso = [form[0].IDCv, , req.body.formedIn, req.body.formType, req.body.place3, req.body.beginMonth3 + " " + req.body.beginYear3, "Actualidad", ];
      } else {
        multiUso = [form[0].IDCv, , req.body.formedIn, req.body.formType, req.body.place3, req.body.beginMonth3 + " " + req.body.beginYear3,
          req.body.endMonth3 + " " + req.body.endYear3, ];
      }
      await query("INSERT INTO Formacion VALUES (?)", [multiUso]);
    }
    res.json({
      successCode: 10,
      successMsg: 'Complementary Form added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineLaboralExperience = async (req, res) => {
  try {
    const labExp = await query("SELECT t2.IDCv FROM Candidatos t1 INNER JOIN CandidatosCVs t2 ON t1.IDCandidato = t2.IDCandidato " +
      "WHERE t2.IDCandidato = '" + req.body.idUser + "'");
    if (req.body.employName === undefined) {
      await query("DELETE FROM LabExp WHERE IDCv = " + labExp[0].IDCv);
    } else {
      if (req.body.endMonth4 == 0 || req.body.endYear4 == 0 || req.body.endYear4 === undefined || req.body.endMonth4 === undefined) {
        multiUso = [labExp[0].IDCv, , req.body.employName, req.body.enterpriseName, req.body.beginMonth4 + " " + req.body.beginYear4, "Actualidad", req.body.desc]
      } else {
        multiUso = [labExp[0].IDCv, , req.body.employName, req.body.enterpriseName, req.body.beginMonth4 + " " + req.body.beginYear4, req.body.endMonth4 + " " + req.body.endYear4,
          req.body.desc]
      }
      await query("INSERT INTO LabExp VALUES (?)", [multiUso]);
    }
    res.json({
      successCode: 10,
      successMsg: 'Laboral experience added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineSummary = async (req, res) => {
  try {
    if (req.body.summary === undefined) {
      await query("UPDATE InfoCompañia SET Resumen = '' WHERE IDCompañia = '" + req.body.idUser + "'");
    } else {
      const summary = await query("SELECT Resumen FROM InfoCompañia WHERE IDCompañia = '" + req.body.idUser + "'");
      if (summary.length === 0) {
        multiUso = [req.body.idUser, req.body.summary];
        await query("INSERT INTO InfoCompañia (IDCompañia, Resumen) VALUES (?)", [multiUso]);
      } else {
        await query("UPDATE InfoCompañia SET Resumen = '" + req.body.summary + "' " +
          "WHERE IDCompañia = '" + req.body.idUser + "'");
      }
    }
    res.json({
      successCode: 11,
      successMsg: 'Summary added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineMission = async (req, res) => {
  try {
    if (req.body.mission === undefined) {
      await query("UPDATE InfoCompañia SET Mision = '' WHERE IDCompañia = '" + req.body.idUser + "'");
    } else {
      const mission = await query("SELECT Mision FROM InfoCompañia WHERE IDCompañia = '" + req.body.idUser + "'");
      if (mission.length === 0) {
        multiUso = [req.body.idUser, req.body.mission];
        await query("INSERT INTO InfoCompañia (IDCompañia, Mision) VALUES (?)", [multiUso]);
      } else {
        await query("UPDATE InfoCompañia SET Mision = '" + req.body.mission + "' " +
          "WHERE IDCompañia = '" + req.body.idUser + "'");
      }
    }
    res.json({
      successCode: 12,
      successMsg: 'Mission added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.defineVision = async (req, res) => {
  try {
    if (req.body.vision === undefined) {
      await query("UPDATE InfoCompañia SET Vision = '' WHERE IDCompañia = '" + req.body.idUser + "'");
    } else {
      const vision = await query("SELECT Vision FROM InfoCompañia WHERE IDCompañia = '" + req.body.idUser + "'");
      if (vision.length === 0) {
        multiUso = [req.body.idUser, req.body.vision];
        await query("INSERT INTO InfoCompañia (IDCompañia, Vision) VALUES (?)", [multiUso]);
      } else {
        await query("UPDATE InfoCompañia SET Vision = '" + req.body.vision + "' " +
          "WHERE IDCompañia = '" + req.body.idUser + "'");
      }
    }
    res.json({
      successCode: 12,
      successMsg: 'Mission added successfully'
    });
  } catch (error) {
    res.json(error);
  }
};

exports.postEmploy = async (req, res) => {
try {
  multiUso = [req.body.idUser, req.body.employName, req.body.tipoTrabajo, req.body.tanda, req.body.Modalidad,
    req.body.Categoria, req.body.Descripcion, req.body.Requisitos, req.body.Beneficios, req.body.fecha];
  await query("INSERT INTO Trabajos(IDCompañia, Nombre, TipoTrabajo, Tanda, Modalidad, Categoria, Descripcion, Requisitos, " +
  "Beneficios, FechaDePub) VALUES(?)", [multiUso]);
  res.json({
    successCode: 13,
    successMsg: 'Employ posted successfully'
  });
} catch (error) {
  res.json(error)
}
};

function sendVerificationEmailToSignUp(req, res, atc) {
  idUser = req.body.email;
  multiUso2 = jwt.sign({
      idUser,
    },
    "myToken", {
      expiresIn: 1800,
    }
  );
  multiUso = {
    from: '"Email Validation - EmpleoLand "  <jsjeremy4@gmail.com>', // sender address
    to: idUser, // list of receivers
    subject: "Email Validation", // Subject line
    html: "<h3>Hola nuevo usuario!!!</h3><hr>" +
      '<p>Para continar con el proceso, </p> <a href="http://localhost:4000' + "/createUser/" + atc + "/" + multiUso2 +
      '">haga click aqui</a> <p>El enlace expira en 30 minutos, asi que acceda lo mas pronto posible.</p>', // html body
  };

  transporter.sendEmail(multiUso, res);
}

function sendEmailValidationToResetPassword(req, res, row) {
  idUser = req.body.email;
  multiUso2 = jwt.sign({
      idUser,
    },
    "myToken", {
      expiresIn: 3600,
    }
  );
  multiUso = {
    from: '"Forgotten password - EmpleoLand "  <jsjeremy4@gmail.com>', // sender address
    to: idUser, // list of receivers
    subject: "Forgotten Password", // Subject line
    html: "<h3>Hola " +
      row[0].Nombre +
      "</h3><hr>" +
      '<p>Para continar con el proceso, </p> <a href="http://localhost:4000' +
      "/resetPassword/" + multiUso2 +
      '">haga click aqui</a> <p>El enlace expira en 10 minutos, asi que acceda lo mas pronto posible.</p>', // html body
  };

  transporter.sendEmail(multiUso);
}