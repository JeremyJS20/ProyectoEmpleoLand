//Controladores routerGetter
const db = require("../../Utilities/BD"); //base de datos
const dbConnection = new db().dbCreateCon(); //conexion a base de datos
const util = require('util');
const query = util.promisify(dbConnection.query).bind(dbConnection); //para las peticiones a la base de datos
let multiUso = "";
let offset = 0;
var limit = "";
let temp = [];
let date = "";

exports.getEmploysData = async (req, res) => {
  try {
    const EmploysData = await query("SELECT t1.*, DATE_FORMAT(t1.FechaDePub, '%W %d-%m-%Y') AS PostDate, t2.Nombre AS CompanyName" +
      ", Calle, Num, Dm, Municipio, Provincia FROM Trabajos t1 INNER JOIN Compañia t2 ON t1.IDCompañia = t2.IDCompañia ORDER BY t1.FechaDePub DESC LIMIT 10");

    res.json({
      EmploysData: EmploysData,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getEmployCategories = async (req, res) => {
  try {
    const categories = await query("SELECT Categoria, COUNT(*) AS employsAmount FROM Trabajos GROUP BY Categoria ORDER BY Categoria ASC");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
};

exports.getEmployProvinces = async (req, res) => {
  try {
    const provinces = await query("SELECT t1.Provincia, COUNT(*) AS amountEmploysByProvince FROM Compañia t1 INNER JOIN Trabajos t2 " +
      "ON t1.IDCompañia = t2.IDCompañia WHERE t2.Categoria = '" + req.params.categorie + "' GROUP BY Provincia ORDER BY Categoria ASC");
    res.json(provinces);
  } catch (error) {
    res.json(error);
  }
};

exports.getEmploysDataByCategoryAndProvince = async (req, res) => {
  limit = 10;
  if (req.params.pageNum) {
    if (req.params.pageNum == "1") {
      offset = 0;
    } else {
      offset = (Number(req.params.pageNum) - 1) * limit;
    }
  } else {
    offset = 0;
  }
  try {
    const EmploysData = await query("SELECT IDTrabajo, t1.IDCompañia, Tanda, Modalidad, t1.Nombre, DATE_FORMAT(FechaDePub, '%W %d-%m-%Y')" +
      " AS FechaDePub, TipoTrabajo, Categoria, t2.Nombre AS companyName, Calle, Num, Dm, Municipio, Provincia " +
      "FROM Trabajos t1" + " INNER JOIN Compañia t2 ON t1.IDCompañia = t2.IDCompañia " +
      " WHERE t1.Categoria = '" + req.params.categorie + "' " + "AND t2.Provincia = '" + req.params.city +
      "' ORDER BY t1.FechaDePub DESC LIMIT " + offset + ", " + limit);

    const numRows = await query("SELECT COUNT(*) AS numRows FROM Trabajos t1" + " INNER JOIN Compañia t2 ON t1.IDCompañia = t2.IDCompañia " +
      " WHERE t1.Categoria = '" + req.params.categorie + "' " + "AND t2.Provincia = '" + req.params.city + "'");

    res.json({
      EmploysData: EmploysData,
      numPages: numRows[0],
      limit: limit
    });

  } catch (error) {
    res.json(error);
  }
};

exports.getSearchEmployResults = async (req, res) => {
  limit = 10;
  if (req.params.pageNum) {
    if (req.params.pageNum == "1") {
      offset = 0;
    } else {
      offset = (Number(req.params.pageNum) - 1) * limit;
    }
  } else {
    offset = 0;
  }
  try {
    const Employs = await query("SELECT IDTrabajo, Tanda, Modalidad, t1.Nombre, DATE_FORMAT(FechaDePub, '%W %d-%m-%Y')" +
      " AS FechaDePub, TipoTrabajo, Categoria, t2.Nombre AS companyName, Calle, Num, Dm, Municipio, Provincia FROM Trabajos t1" +
      " INNER JOIN Compañia t2 ON t1.IDCompañia = t2.IDCompañia " + " WHERE t2.Provincia = '" + req.params.city +
      "' ORDER BY t1.FechaDePub DESC LIMIT " + offset + ", " + limit);

    if (Employs.length != 0) {
      if (temp.length > 0) {
        temp = []
      }
      multiuso2 = req.params.jobOrComp.trim().toUpperCase().split(" ")

      Employs.forEach(employ => {
        employ.Nombre.trim().toUpperCase().split(" ").forEach(employ2 => {
          multiuso2.forEach(input => {
            if (input.length > 2 || employ2.length > 2) {
              if (employ2 === input) {
                if (!temp.includes(employ)) {
                  temp.push(employ)
                }
              } else {
                multiuso = employ.companyName.trim().toUpperCase().replace(" ", "")
                if (req.params.jobOrComp.trim().toUpperCase().replace(" ", "") === multiuso) {
                  if (!temp.includes(employ)) {
                    temp.push(employ)
                  }
                }
              }
            }
          });
        });
      });
    }

    res.json({
      EmploysData: temp,
      numPages: temp.length,
      limit: limit
    });

  } catch (error) {
    res.json(error);
  }
};

exports.getEmployDetails = async (req, res) => {
  try {
    const EmployDetails = await query("SELECT t1.*, DATE_FORMAT(FechaDePub, '%W %d-%m-%Y') AS formatted_date, t2.Nombre as companyName, t2.Email, t2.Logo, t2.Telefono, " +
      "t2.Calle, t2.Num, t2.Dm, t2.Municipio, t2.Provincia, t2.URL " + " FROM Trabajos t1 INNER JOIN Compañia t2 ON t1.IDCompañia = t2.IDCompañia " +
      "WHERE t1.IDTrabajo = " + req.params.id);
    const EmploySolAmount = await query("SELECT t3.*, t2.Estado FROM Trabajos t1 INNER JOIN SolDeEmpleo t2 ON t1.IDTrabajo = t2.IDTrabajo" +
      " INNER JOIN Candidatos t3 ON t3.IDCandidato = t2.IDCandidato WHERE t2.IDTrabajo = " + req.params.id + " ");

    res.json({
      EmployDetails: EmployDetails,
      EmploySolAmount: EmploySolAmount
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getMyCompanyEmploys = async (req, res) => {
  limit = 10;
  if (req.params.pageNum) {
    if (req.params.pageNum == "1") {
      offset = 0;
    } else {
      offset = (Number(req.params.pageNum) - 1) * limit;
    }
  } else {
    offset = 0;
  }

  try {
    const myCompanyEmploys = await query("SELECT IDTrabajo, Tanda, Modalidad, t1.Nombre, DATE_FORMAT(FechaDePub, '%W %d-%m-%Y') AS FechaDePub, " +
      "TipoTrabajo, Categoria, Calle, Num, Dm, Municipio, Provincia FROM Trabajos t1 INNER JOIN Compañia t2 ON t1.IDCompañia = " +
      "t2.IDCompañia WHERE t2.IDCompañia = '" + req.params.id + "' ORDER BY t1.FechaDePub DESC LIMIT " +
      offset + ", " + limit);
    const numRows = await query("SELECT Count(*) AS numRows FROM Trabajos WHERE IDCompañia = " + "'" + req.params.id + "'");

    res.json({
      myCompanyEmploys: myCompanyEmploys,
      numPages: numRows[0],
      limit: limit
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getCandidateData = async (req, res) => {
  try {
    const CandidateInfo = await query("SELECT t1.Nombre, t1.Apellido, DATE_FORMAT(t1.Birthdate,  '%M %D %Y') AS Birth, t1.Birthdate, "+
    "t1.Cedula, t1.Sexo, t1.TelRes, t1.TelPer, t1.Calle, t1.NumCasa, t1.Dm, t1.Municipio, t1.Provincia, t1.Correo, "+
    " t2.* FROM Candidatos t1 INNER JOIN CandidatosCVs t2 ON t1.IDCandidato = t2.IDCandidato " +
    "WHERE t2.IDCandidato = '" + req.params.id + "'");
    const CandidateCV2 = await query("SELECT t2.* FROM CandidatosCVs t1 INNER JOIN Formacion t2 " +
    "ON t2.IDCv = t1.IDCv WHERE t1.IDCandidato = '" + CandidateInfo[0].IDCandidato + "'");
    const CandidateCV3 = await query("SELECT t2.* FROM CandidatosCVs t1 INNER JOIN LabExp t2 " +
      "ON t2.IDCv = t1.IDCv WHERE t1.IDCandidato = '" + CandidateInfo[0].IDCandidato + "'");
    
    res.json({
      CandidateInfo: CandidateInfo,
      CandidateCV2: CandidateCV2,
      CandidateCV3: CandidateCV3,
      Images: {
        ProfilePhoto: "http://" + req.get('host') + "/IMG/CandidateProfileIMG/" + req.params.id + "+Profile.jpg", 
        ProfileBackground: "http://" + req.get('host') + "/IMG/CandidateProfileIMG/defaultCandidateBackground.jpg"
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getCandidateSignInData = async (req, res) => {
  try {
    const CandidateSignInData = await query("SELECT IDCandidato, Nombre, Apellido, Correo, Contraseña, Sexo FROM Candidatos WHERE " + 
    "Correo = '" + req.params.email + "'");
    res.json({
      CandidateSignInData: CandidateSignInData,
      Images: {
        ProfilePhoto: "http://" + req.get('host') + "/IMG/CandidateProfileIMG/" + CandidateSignInData[0].IDCandidato + "+Profile.jpg", 
        ProfileBackground: "http://" + req.get('host') + "/IMG/CandidateProfileIMG/defaultCandidateBackground.jpg"
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getCompanyData = async (req, res) => {
  try {
    const CompanyInfo = await query("SELECT IDCompañia, Nombre, AñoDeFun, Area, URL, Email, Telefono, Calle, Num, PostCode, Dm, Municipio, Provincia" +
    " FROM Compañia WHERE IDCompañia = '" + req.params.id + "'");
    const CompanyInfo2 = await query("SELECT Slogan, Resumen, Mision, Vision" +
    " FROM InfoCompañia WHERE IDCompañia = '" + req.params.id + "'");
    res.json({
      CompanyInfo: CompanyInfo,
      CompanyInfo2: CompanyInfo2,
      Images: {
        ProfileLogo: "http://" + req.get('host') + "/IMG/CompanyProfileIMG/" + req.params.id + "+Logo.jpg", 
        ProfileBackground: "http://" + req.get('host') + "/IMG/CompanyProfileIMG/defaultCompanyBackground.jpg"
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getCompanySignInData = async (req, res) => {
  try {
    const CompanySignInData = await query("SELECT IDCompañia, Nombre, Email, Contraseña FROM Compañia WHERE Email = '" 
    + req.params.email + "'");
    //getCompanyImages(CompanySignInData[0].IDCompañia);
    res.json({
      CompanySignInData: CompanySignInData,
      Images: {
        ProfileLogo: "http://" + req.get('host') + "/IMG/CompanyProfileIMG/" + CompanySignInData[0].IDCompañia + "+Logo.jpg", 
        ProfileBackground: "http://" + req.get('host') + "/IMG/CompanyProfileIMG/defaultCompanyBackground.jpg"
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.applyToEmploy = async (req, res) => {
  date = new Date();
  date = date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2) +
          " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
  
  multiUso = [req.params.id, req.params.idUser, date, "P"]
  try {
    await query("INSERT INTO SolDeEmpleo (IDTrabajo, IDCandidato, FechaDeSol, Estado) VALUE (?)", [multiUso]);
    res.json({
      successCode: 4,
      successMsg: 'Employ applied successfully'
    });
  } catch (error) {
    res.json(error);
  }
};