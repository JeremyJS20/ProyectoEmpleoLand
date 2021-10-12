//Para metodos GET (obtener)

const express = require('express');
const routerGC = require('../Controller/routerGetterController');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', routerGC.welcomePage);

router.get('/postEmploy', routerGC.postEmploy);

router.get('/employes', routerGC.employsAuthController);

router.get('/employes/:categorie', routerGC.employs2AuthController);

router.get('/employes/:categorie/:city/:pageNum', routerGC.employs3AuthController);

router.get('/employes/:categorie/:city/:pageNum/:id/applyToEmploy', routerGC.applyToEmploy);

router.get('/employes/:categorie/:city/:pageNum/:id', routerGC.showEmployDetails);

router.get('/myPostedEmploys/:pageNum/:id', routerGC.showEmployDetails);

router.get('/recentsPost/:id', routerGC.showEmployDetails);

router.get('/searchEmploy/searchFor=:jobOrComp-Province=:city/:pageNum/:id', routerGC.showEmployDetails);

router.get('/recentsPost/:id/applyToEmploy', routerGC.applyToEmploy);

router.get('/myProfile-CandidateID=:IDUser', routerGC.showMyCandidateProfile);

router.get('/myProfile-CandidateID=:IDUser/:tab', routerGC.showMyCandidateProfile);

router.get('/candidateProfile-CandidateID=:IDUser', routerGC.showMyCandidateProfile);

router.get('/candidateProfile-CandidateID=:IDUser/:tab', routerGC.showMyCandidateProfile);

router.get('/myProfile-CompanyID=:IDUser', routerGC.showMyCompanyProfile);

router.get('/myProfile-CompanyID=:IDUser/:tab', routerGC.showMyCompanyProfile);

router.get('/myProfile-CompanyID=:IDUser/:tab/:id', routerGC.showEmployDetails);

router.get('/companyProfile-CompanyID=:IDUser', routerGC.showMyCompanyProfile);

router.get('/companyProfile-CompanyID=:IDUser/:tab', routerGC.showMyCompanyProfile);

router.get('/companyProfile-CompanyID=:IDUser/:tab/:id', routerGC.showEmployDetails);

router.get('/myPostedEmploys/:pageNum/:id/showCandidateProfile/CandidateID=:IDUser', routerGC.showMyCandidateProfile);

router.get('/searchEmploy/searchFor=:jobOrComp-Province=:city/:pageNum/:id/applyToEmploy', routerGC.applyToEmploy);

router.get('/signIn', routerGC.signInAuthController);

router.get('/signIn/RedirectTo=:url', routerGC.signInRedirectToAuthController);

router.get('/chooseAccountType', routerGC.CATAuthController);

router.get('/createUser/:user/verifyEmail', routerGC.preSignUp);

router.get('/createUser/:user/:token', routerGC.signUpAuthController);

router.get('/createUser2/:user/:token', routerGC.signUpAuthController2);

router.get('/createUser3/:user/:token', routerGC.signUpAuthController3);

router.get('/createUser4/:user/:token', routerGC.signUpAuthController4);

router.get('/myPostedEmploys/:pageNum', routerGC.showMyPostedJobs)

router.get('/signOut', routerGC.signOutAuthController);

router.get('/employes/:Categoria', routerGC.showJobs);

router.get('/employes/:Categoria/:pageNum', routerGC.showJobs);

router.get('/forgottenPassword', routerGC.forgottenPassword);

router.get('/resetPassword/:token', routerGC.resetPassword);

router.get('/searchEmploy/searchFor=:jobOrComp-Province=:city/:pageNum', routerGC.searchEmploy);

router.get('/myPostedEmploys/:pageNum/:id/deleteEmploy', routerGC.deleteEmploy);

router.get('/myPostedEmploys/:pageNum/:id/editEmploy', routerGC.editEmploy);

module.exports = router;