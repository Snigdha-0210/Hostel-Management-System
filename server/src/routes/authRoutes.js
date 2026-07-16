const express = require('express');
const { register, login } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};

router.post('/register', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('name', 'Name is required').not().isEmpty(),
    check('role', 'Invalid role').isIn(['ADMIN', 'OWNER', 'TENANT'])
], validate, register);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], validate, login);

module.exports = router;
