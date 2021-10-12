//Para metodos POST (crear)
const express = require('express');
const routerPoC = require('../Controller/routerPosterController');
const router = express.Router();

router.post('/signIn', routerPoC.signInController);

router.post('/signIn-RedirectTo=:url', routerPoC.signInRedirectToController);

router.post('/signUpCandidate/:user/:token', routerPoC.signUpCandidateController);

router.post('/signUpCandidate2/:user/:token', routerPoC.signUpCandidateController2);

router.post('/signUpCandidate3/:user/:token', routerPoC.signUpCandidateController3);

router.post('/signUpCandidate4/:user/:token', routerPoC.signUpCandidateController4);

router.post('/signUpCompany/:user/:token', routerPoC.signUpCompanyController);

router.post('/signUpCompany2/:user/:token', routerPoC.signUpCompany2Controller);

router.post('/signUpCompany3/:user/:token', routerPoC.signUpCompany3Controller);

router.post('/signUpCompany4/:user/:token', routerPoC.signUpCompany4Controller);

router.post('/postEmploy', routerPoC.postEmployController);

router.post('/forgottenPassword', routerPoC.forgottenPassword2);

router.post('/resetPassword2', routerPoC.resetPassword2);

router.post('/createUser/:user/verifyEmail', routerPoC.preSignUp);

router.post('/myPostedEmploys/:pageNum/:id/employEdited', routerPoC.editJobController);

router.post('/searchEmploy', routerPoC.searchEmploy);

router.post('/defineCandidateProfilePhoto/redirectTo=:url', routerPoC.defineCandidateProfilePhoto);

router.post('/definePresentation/redirectTo=:url', routerPoC.definePresentation);

router.post('/defineLanguages/redirectTo=:url', routerPoC.defineLanguages);

router.post('/defineSkills/redirectTo=:url', routerPoC.defineSkills);

router.post('/defineProfessionalForm/redirectTo=:url', routerPoC.defineProfessionalForm);

router.post('/defineAcademicalForm/redirectTo=:url', routerPoC.defineAcademicalForm);

router.post('/defineComplementaryForm/redirectTo=:url', routerPoC.defineComplementaryForm);

router.post('/defineLaboralExperience/redirectTo=:url', routerPoC.defineLaboralExperience);

router.post('/defineSummary/redirectTo=:url', routerPoC.defineSummary);

router.post('/defineMission/redirectTo=:url', routerPoC.defineMission);

router.post('/defineVision/redirectTo=:url', routerPoC.defineVision);

module.exports = router;