const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/users.js');

//signup route
router.route('/signup')
    .get(userController.renderSignUp)
    .post(wrapAsync(userController.signUp));

//login route
router.route('/login')
    .get(userController.renderLogin)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login);


//logout route
router.get('/logout', userController.logout);


module.exports = router;
