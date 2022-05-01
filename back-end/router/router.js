//Packets & Others
const express = require('express');
const router = express.Router();
const cors = require('cors');
const login = require('../mvc/login');
const register = require('../mvc/register');
const setting = require('../mvc/setting');

//Packets Code
router.use(cors());

//Code
router.post('/login',login.loginGet);
router.post('/register',register.registerPost);
router.put('/setting/:id',setting.settingPut);
router.delete('/setting/:id',setting.settingDelet);

module.exports = router;