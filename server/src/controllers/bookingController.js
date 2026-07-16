const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Tenant views available rooms (Implemented in propertyController)

// 2. Tenant submits booking request
const createBooking = async (req, res) => {
    try {
        const { roomId, startDate, endDate } = req.body;
        const userId = req.user.userId;

        if (req.user.role !== 'TENANT') {
            return res.status(403).json({ error: 'Only tenants can book rooms' });
        }

        const room = await prisma.room.findUnique({ where: { id: parseInt(roomId) } });
        if (!room || !room.isAvailable) {
            return res.status(400).json({ error: 'Room not available' });
        }

        // Calculate total amount (rough estimate based on price * days, mostly for MVP)
        // Assuming price is per month for simplicity, or just stored as is.
        const totalAmount = room.price;

        const booking = await prisma.booking.create({
            data: {
                userId,
                roomId: parseInt(roomId),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status: 'PENDING',
                totalAmount
            }
        });

        res.status(201).json({ message: 'Booking request sent', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

// 3. Owner reviews request (Get bookings for owner's properties)
const getOwnerBookings = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const bookings = await prisma.booking.findMany({
            where: {
                room: {
                    property: {
                        ownerId: ownerId
                    }
                }
            },
            include: {
                user: { select: { name: true, email: true } },
                room: true
            }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

// 4. Owner approves or rejects booking
// 5. Room status updates accordingly
const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body; // CONFIRMED, REJECTED
        const ownerId = req.user.userId;

        const booking = await prisma.booking.findUnique({
            where: { id: parseInt(bookingId) },
            include: { room: { include: { property: true } } }
        });

        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        if (booking.room.property.ownerId !== ownerId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        // Transaction to update booking and room status atomically
        const result = await prisma.$transaction(async (prisma) => {
            const updatedBooking = await prisma.booking.update({
                where: { id: parseInt(bookingId) },
                data: { status }
            });

            if (status === 'CONFIRMED') {
                await prisma.room.update({
                    where: { id: booking.roomId },
                    data: { isAvailable: false }
                });
            } else if (status === 'CANCELLED' || status === 'REJECTED') {
                // If it was previously confirmed, make it available again
                if (booking.status === 'CONFIRMED') {
                    await prisma.room.update({
                        where: { id: booking.roomId },
                        data: { isAvailable: true }
                    });
                }
            }

            return updatedBooking;
        });

        res.json({ message: `Booking ${status}`, booking: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update booking' });
    }
};

// 6. Tenant receives booking status notification (Get my bookings)
const getMyBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId: req.user.userId },
            include: { room: { include: { property: true } } }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

module.exports = { createBooking, getOwnerBookings, updateBookingStatus, getMyBookings };
