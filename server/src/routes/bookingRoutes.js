const express = require('express');
const { createBooking, getOwnerBookings, updateBookingStatus, getMyBookings } = require('../controllers/bookingController');
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

router.post('/', authenticateToken, [
    check('roomId', 'Room ID is required').not().isEmpty(),
    check('startDate', 'Start date is required').isISO8601().toDate(),
    check('endDate', 'End date is required').isISO8601().toDate()
], validate, createBooking);

router.get('/owner', authenticateToken, getOwnerBookings); // Owner
router.put('/:bookingId/status', authenticateToken, updateBookingStatus); // Owner
router.get('/my-bookings', authenticateToken, getMyBookings); // Tenant

module.exports = router;
