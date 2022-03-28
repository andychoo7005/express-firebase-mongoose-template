const express = require('express');

const authController = require('#controllers/auth');
const profileController = require('#controllers/profile');
const isLoggedIn = require('#middlewares/isLoggedIn');

const router = express.Router();

// auth controller
router.post('/auth/register', authController.register);
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/reset-password', authController.resetPassword);
router.post('/auth/register-profile', authController.registerProfile);

// profile controller
router.get('/profile', isLoggedIn, profileController.getProfile);
router.put('/profile', isLoggedIn, profileController.updateProfile);

// TO DO LIST
// check whether user does exist in both firebase and mongodb. if no, throw error and redirect them to register profile.

module.exports = router;
