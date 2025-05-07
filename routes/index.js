var express = require('express');
var router = express.Router();
const path = require('path');
const cors = require('../Middlewares/cors');
// GET users listing. 
const { corsWithOptions,customCorsMiddleware } = require('../Middlewares/cors');

router.use(corsWithOptions);
router.use(customCorsMiddleware);

router.all('/')
  .options('/', cors.corsWithOptions, function (req, res, next) {
    next();
  })
  .get('/', cors.corsWithOptions, async function (req, response, next) {
    response.sendFile('/views/index.html',{ root: '.' });
  })
  .get('*', cors.corsWithOptions, async function (req, response, next) {
    response.sendFile('/views/index.html',{ root: '.' });
});





module.exports = router;
