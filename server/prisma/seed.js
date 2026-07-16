const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Clean up existing data
    await prisma.payment.deleteMany();
    await prisma.complaint.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.room.deleteMany();
    await prisma.property.deleteMany();
    await prisma.user.deleteMany();

    // Create Users
    const password = await bcrypt.hash('password123', 10);

    const admin = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password,
            name: 'Admin User',
            role: 'ADMIN',
        },
    });

    const owner = await prisma.user.create({
        data: {
            email: 'owner@example.com',
            password,
            name: 'John Owner',
            role: 'OWNER',
            phone: '1234567890',
        },
    });

    const tenant = await prisma.user.create({
        data: {
            email: 'tenant@example.com',
            password,
            name: 'Alice Tenant',
            role: 'TENANT',
            phone: '0987654321',
        },
    });

    console.log({ admin, owner, tenant });

    // Create Property
    const property = await prisma.property.create({
        data: {
            name: 'Sunshine Hostel',
            address: '123 Main St',
            city: 'Techville',
            type: 'HOSTEL',
            ownerId: owner.id,
            rules: 'No smoking, No loud music after 10PM',
        },
    });

    // Create Rooms
    const room1 = await prisma.room.create({
        data: {
            propertyId: property.id,
            roomNumber: '101',
            capacity: 2,
            price: 5000,
            type: 'AC',
            isAvailable: true,
        },
    });

    const room2 = await prisma.room.create({
        data: {
            propertyId: property.id,
            roomNumber: '102',
            capacity: 1,
            price: 3000,
            type: 'NON-AC',
            isAvailable: true,
        },
    });

    console.log({ property, room1, room2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
