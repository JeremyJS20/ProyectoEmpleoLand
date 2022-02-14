//Para metodos GET (obtener)

const express = require('express');
const routerGC = require('../Controllers/routerGetterController');
const router = express.Router();

router.get('/api', (req, res) => {
  res.send('Working')
});

router.get('/Employs', routerGC.getEmploysData);

router.get('/EmployCategories', routerGC.getEmployCategories);

router.get('/EmployCategories/:categorie', routerGC.getEmployProvinces);

router.get('/EmployCategories/:categorie/:city/:pageNum', routerGC.getEmploysDataByCategoryAndProvince);

router.get('/SearchEmploy/:jobOrComp/:city/:pageNum', routerGC.getSearchEmployResults);

router.get('/SearchEmploy/:city/:jobOrComp', routerGC.getSearchEmployResults);

router.get('/EmployDetails/:id', routerGC.getEmployDetails);

router.get('/ApplyToEmploy/:id/:idUser', routerGC.applyToEmploy);

router.get('/MyCompanyEmploys/:pageNum/:id', routerGC.getMyCompanyEmploys);

router.get('/CandidateData/:id', routerGC.getCandidateData);

router.get('/CandidateSignInData/:email', routerGC.getCandidateSignInData);

router.get('/CompanyData/:id', routerGC.getCompanyData);

router.get('/CompanySignInData/:email', routerGC.getCompanySignInData);

module.exports = router;
