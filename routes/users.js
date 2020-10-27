const express = require ('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users'); 
const User = require('../models/user');
const passport = require('passport');

router.route('/register')
.get(users.renderRegister)
.post(catchAsync (users.Register))

router.route('/login')
.get(users.renderLogin)
.post(passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}), users.Login)

router.get('/logout', users.Logout);

module.exports = router;