const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 charaters long'),
    body('password').isLength({min: 6}).withMessage('Password at least 6 characters long')
], userController.registerUser)



module.exports = router;