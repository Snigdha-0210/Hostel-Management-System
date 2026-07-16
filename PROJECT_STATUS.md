# Hostel Management System - Project Status

## Overview
This is a full-stack web application designed for managing Hostels, Paying Guest (PG) accommodations, and Rentals.

## Technology Stack
- **Frontend (`client/`)**: React, Vite, TailwindCSS, React Router, Axios
- **Backend (`server/`)**: Node.js, Express, Prisma ORM, SQLite
- **Authentication**: JWT, bcryptjs

## Database Schema (Prisma)
- **User**: Represents users in the system. Roles include `ADMIN`, `OWNER`, and `TENANT`.
- **Property**: Represents the accommodations (Hostel, PG, Flat). Belongs to an `OWNER`.
- **Room**: Specific rooms within a Property (AC/Non-AC).
- **Booking**: Tenant's request to book a Room. Follows statuses: `PENDING`, `CONFIRMED`, `REJECTED`, `CANCELLED`.
- **Payment**: Records payments for Bookings.
- **Complaint**: Tenant issues reported for a specific Property.

## Setup Instructions (Local Development)
### Backend
1. `cd server`
2. `npm install`
3. `npx prisma@5 generate` (Explicitly using Prisma v5 to avoid v7 schema errors)
4. `npx prisma@5 db push` (Initializes the SQLite database)
5. `node prisma/seed.js` (Seeds default Admin, Owner, and Tenant users)
6. `npm start` (Runs on `http://localhost:5000`)

### Frontend
1. `cd client`
2. `npm install`
3. `npm run dev` (Runs on `http://localhost:5173`)

## Known Issues & Recent Fixes
- **Issue**: Running `npx prisma db push` was failing with a Prisma v7 schema validation error because `url` is no longer supported in the schema file in v7. This blocked the `seed.js` script from finding the Prisma Client.
- **Fix**: Force the usage of Prisma v5 using `npx prisma@5` commands to ensure compatibility with the current `schema.prisma` configuration.

## Default Credentials
| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@example.com` | `password123` |
| **Owner** | `owner@example.com` | `password123` |
| **Tenant** | `tenant@example.com` | `password123` |
