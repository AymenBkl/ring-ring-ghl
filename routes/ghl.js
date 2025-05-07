var express = require('express');
var router = express.Router();
const cors = require('../Middlewares/cors');
const privateAccess = require("../Middlewares/privateAccess");
// GET users listing. 

const ghlController = require("../Controller/GHL/ghl.controller");

router.use(cors.corsWithOptions);
router.use(cors.customCorsMiddleware);

router.all('/')
  .options('/', cors.corsWithOptions, function (req, res, next) {
    next();
  })
  .post('/ringring-sms', cors.corsWithOptions, privateAccess.apiKeyAuth, ghlController.ringRingGhlSMS);

module.exports = router;
