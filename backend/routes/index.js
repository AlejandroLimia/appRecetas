const express = require('express');
const userController = require('../controllers/userController');
const validator = require('../config/validator');
const passport = require('../config/passport');

const router = express.Router();

router.route("/")
.get((req, res) => res.send('Hola'));


module.exports = router; 