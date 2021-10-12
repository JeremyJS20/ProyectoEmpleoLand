const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const restler = require('restler');
const host = 'http://localhost:3000'
let multiUso = '';

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, async (req, email, password, done) => {
            multiUso = crypto.createHash('sha256');
            multiUso.update(password);

            restler.get(host + '/CandidateSignInData/' + email).on('complete', (candidate) => {
                if (candidate.CandidateSignInData != undefined && candidate.CandidateSignInData.length != 0) {
                    if (multiUso.digest('hex') === candidate.CandidateSignInData[0].Contraseña) {
                        multiUso = {
                            IDUsuario: candidate.CandidateSignInData[0].IDCandidato,
                            Nombre: candidate.CandidateSignInData[0].Nombre,
                            Apellido: candidate.CandidateSignInData[0].Apellido,
                            Correo: candidate.CandidateSignInData[0].Correo,
                            Genero: candidate.CandidateSignInData[0].Sexo,
                            ProfilePhoto: candidate.Images.ProfilePhoto,
                            isAdmin: false,
                            userType: "Candidate"
                        }
                        return done(null, multiUso);
                    } else {
                        return done(null, false);
                    }
                } else {
                    restler.get(host + '/CompanySignInData/' + email).on('complete', (company) => {
                        if (company.CompanySignInData != undefined && company.CompanySignInData.length != 0) {
                            if (multiUso.digest('hex') === company.CompanySignInData[0].Contraseña) {
                                multiUso = {
                                    IDUsuario: company.CompanySignInData[0].IDCompañia,
                                    Nombre: company.CompanySignInData[0].Nombre,
                                    Correo: company.CompanySignInData[0].Correo,
                                    ProfilePhoto: company.Images.ProfileLogo,
                                    isAdmin: false,
                                    userType: "Company"
                                }
                                return done(null, multiUso);
                            } else {
                                return done(null, false);
                            }
                        } else {
                            return done(null, false);
                        }
                    });
                }
            });
        })
    );

    passport.serializeUser((user, done) => {
        return done(null, user.IDUsuario);
    });

    passport.deserializeUser( (id, done) => {
        restler.get(host + '/CandidateData/' + id).on('complete', (candidate) => {
            if (candidate.CandidateInfo != undefined) {
                multiUso = {
                    IDUsuario: candidate.CandidateInfo[0].IDCandidato,
                    Nombre: candidate.CandidateInfo[0].Nombre,
                    Apellido: candidate.CandidateInfo[0].Apellido,
                    Correo: candidate.CandidateInfo[0].Correo,
                    Genero: candidate.CandidateInfo[0].Sexo,
                    ProfilePhoto: candidate.Images.ProfilePhoto,
                    isAdmin: false,
                    userType: "Candidate"
                }
            } else {
                restler.get(host + '/CompanyData/' + id).on('complete', (company) => {
                    if (company.CompanyInfo != undefined) {
                        multiUso = {
                            IDUsuario: company.CompanyInfo[0].IDCompañia,
                            Nombre: company.CompanyInfo[0].Nombre,
                            Correo: company.CompanyInfo[0].Email,
                            ProfilePhoto: company.Images.ProfileLogo,
                            isAdmin: false,
                            userType: "Company"
                        }
                    }
                });
            }
            return done(null, multiUso);
        });
    });
}