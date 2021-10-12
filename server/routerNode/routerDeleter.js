//Para metodos PUT (borrar)

const express = require('express');
const routerDC = require('../Controller/routerDeleterController');
const router = express.Router();

router.delete('/deleteJob', routerDC.deleteJobController);

module.exports = router;