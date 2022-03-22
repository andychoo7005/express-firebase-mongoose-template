const express = require('express');

const authController = require('#controllers/auth');
const profileController = require('#controllers/profile');

const router = express.Router();

// auth controller
router.post('/auth/register', authController.register);
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/reset-password', authController.resetPassword);
router.post('/auth/register-profile', authController.registerProfile);

// profile controller
router.get('/profile', profileController.getProfile);
router.put('/profile', profileController.updateProfile);

// TO DO LIST
// 1. forget password.
// 2. update profile.

module.exports = router;
