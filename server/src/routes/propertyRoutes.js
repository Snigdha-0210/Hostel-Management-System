const express = require('express');
const { getProperties, createProperty, addRoom, getAvailableRooms } = require('../controllers/propertyController');
const authenticateToken = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};

router.get('/', getProperties); // Public or filtered
router.get('/available-rooms', getAvailableRooms); // Public for tenants

router.post('/', authenticateToken, [
    check('name', 'Property name is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('type', 'Invalid property type').isIn(['HOSTEL', 'PG', 'FLAT'])
], validate, createProperty);

router.post('/rooms', authenticateToken, [
    check('propertyId', 'Property ID is required').not().isEmpty(),
    check('roomNumber', 'Room Number is required').not().isEmpty(),
    check('capacity', 'Capacity must be a number').isInt({ min: 1 }),
    check('price', 'Price must be a number').isNumeric(),
    check('type', 'Invalid room type').isIn(['AC', 'NON-AC'])
], validate, addRoom);

module.exports = router;
