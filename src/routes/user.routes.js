const { Router } = require('express');
const {
  handleLoginUser,
  handleSignupUser,
} = require('../controllers/user.controller.js');

const router = Router();

/** Declaring user routes */
router.route('/signup').post(handleSignupUser);
router.route('/login').post(handleLoginUser);

module.exports = router;
