//Para metodos POST (crear)
const express = require('express');
const routerPoC = require('../Controllers/routerPosterController');
const router = express.Router();

router.post('/forgottenPassword', routerPoC.SendEmailToResetPassword);

router.post('/ResetPassword', routerPoC.ResetPassword);

router.post('/preSignUp', routerPoC.SendEmailToSignUp);

router.post('/CreateCandidate', routerPoC.SignUpCandidate);

router.post('/CreateCompany', routerPoC.SignUpCompany);

router.post('/DefineCandidateProfilePhoto', routerPoC.defineCandidateProfilePhoto);

router.post('/DefinePresentation', routerPoC.definePresentation);

router.post('/DefineSkills', routerPoC.defineSkills);

router.post('/DefineLanguages', routerPoC.defineLanguages);

router.post('/DefineAcademicalForm', routerPoC.defineAcademicalForm);

router.post('/DefineProfessionalForm', routerPoC.defineProfessionalForm);

router.post('/DefineComplementaryForm', routerPoC.defineComplementaryForm);

router.post('/DefineLaboralExperience', routerPoC.defineLaboralExperience);

router.post('/DefineSummary', routerPoC.defineSummary);

router.post('/DefineMission', routerPoC.defineMission);

router.post('/DefineVision', routerPoC.defineVision);

router.post('/PostEmploy', routerPoC.postEmploy);

module.exports = router;