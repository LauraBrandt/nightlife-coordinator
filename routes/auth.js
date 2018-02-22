const express = require('express');
const validator = require('validator');
const router = express.Router();

function validateSignupForm(data) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!data || typeof data.email !== 'string' || !validator.isEmail(data.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!data || typeof data.password !== 'string' || data.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!data || typeof data.name !== 'string' || data.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateLoginForm(data) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!data || typeof data.email !== 'string' || data.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!data || typeof data.password !== 'string' || data.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return res.status(200).end();
});

router.post('/login', (req, res) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return res.status(200).end();
});


module.exports = router;