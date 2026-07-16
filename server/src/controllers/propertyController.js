const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all properties (with optional filters)
const getProperties = async (req, res) => {
    try {
        const properties = await prisma.property.findMany({
            include: { rooms: true, owner: { select: { name: true, email: true } } }
        });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
};

// Create a new property (Hostel/PG)
const createProperty = async (req, res) => {
    try {
        const { name, address, city, type, rules, hasMess } = req.body;
        const ownerId = req.user.userId; // From authMiddleware

        if (req.user.role !== 'OWNER' && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Only Owners/Admins can list properties' });
        }

        const property = await prisma.property.create({
            data: {
                name, address, city, type, rules, hasMess, ownerId
            }
        });
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create property' });
    }
};

// Add a room to a property
const addRoom = async (req, res) => {
    try {
        const { propertyId, roomNumber, capacity, price, type } = req.body;

        // standard check: ensure property belongs to user
        const property = await prisma.property.findUnique({ where: { id: parseInt(propertyId) } });
        if (!property) return res.status(404).json({ error: 'Property not found' });

        if (property.ownerId !== req.user.userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Not authorized to add rooms to this property' });
        }

        const room = await prisma.room.create({
            data: {
                propertyId: parseInt(propertyId),
                roomNumber,
                capacity,
                price,
                type,
                isAvailable: true // Default to available
            }
        });
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add room' });
    }
};

// specific endpoints for students to find rooms
const getAvailableRooms = async (req, res) => {
    try {
        const rooms = await prisma.room.findMany({
            where: { isAvailable: true },
            include: { property: true }
        });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

module.exports = { getProperties, createProperty, addRoom, getAvailableRooms };
