<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma"/>
  
  <h1>🏨 Hostel & PG Management System</h1>
  <p>A comprehensive, full-stack web application designed for seamlessly managing Hostels, Paying Guest (PG) accommodations, and Rentals.</p>
</div>

<br />

## ✨ Features

- 🔐 **Role-Based Access Control**: Secure, personalized dashboards tailored for `Admin`, `Owner`, and `Tenant` roles.
- 🏠 **Advanced Property Management**: Owners can easily list properties, manage individual rooms, define house rules, and specify amenities.
- 🍽️ **Integrated Mess Menu**: Native support for Mess facilities. Tenants can view weekly rotating menus directly on the property page.
- 📅 **Smart Booking System**: Tenants can request check-in and check-out dates; Owners can seamlessly approve, reject, or manage these bookings.
- 🛡️ **Enterprise-Grade Security**: Built with JSON Web Tokens (JWT) for authentication, robust password hashing (`bcrypt`), and rigorous API input validation.
- 🎨 **Premium UI/UX**: Crafted with TailwindCSS, featuring glassmorphism elements, dynamic micro-animations, and a fully responsive layout.

---

## 🛠️ Tech Stack & Architecture

This platform leverages a modern, decoupled architecture ensuring high performance and scalability.

### **Frontend Client** (`/client`)
- **Core**: React 18, Vite
- **Styling**: TailwindCSS, PostCSS
- **Routing & Networking**: React Router DOM, Axios
- **Icons**: Lucide React

### **Backend API** (`/server`)
- **Core**: Node.js, Express.js
- **Database ORM**: Prisma ORM (v5)
- **Database Engine**: SQLite (Designed for easy migration to PostgreSQL)
- **Security**: jsonwebtoken, bcryptjs, express-validator

---

## 🚀 Getting Started

Follow these steps to run the complete stack locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Database & Backend Setup
Navigate into the server directory and install dependencies:
```bash
cd server
npm install
```

Initialize the database schema and generate the Prisma client:
*(Note: Ensure you are using Prisma v5 as specified in the dependencies)*
```bash
npx prisma@5 generate
npx prisma@5 db push
```

Seed the initial users and mock properties (This creates default Admin, Owner, and Tenant roles):
```bash
node prisma/seed.js
```

Start the backend server:
```bash
npm start
```
*The API will be available at `http://localhost:5000`*

### 2. Frontend Setup
Open a new terminal window, navigate into the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The Web App will be accessible at `http://localhost:5173`*

---

## 🔑 Default Credentials
If you seeded the database using the provided script, you can log in using the following test accounts:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@example.com` | `password123` |
| **Owner** | `owner@example.com` | `password123` |
| **Tenant** | `tenant@example.com` | `password123` |

---

## 📁 Project Structure

```text
Hostel_Management_System/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (e.g., MessMenuDisplay, Layout)
│   │   ├── pages/          # Full page views (e.g., AddProperty, PropertyDetails)
│   │   ├── context/        # React Context for Auth state
│   │   ├── data/           # Mock data and search logic
│   │   └── index.css       # Global Tailwind directives
│   └── package.json
└── server/                 # Backend Node/Express API
    ├── src/
    │   ├── controllers/    # Request handlers (e.g., propertyController)
    │   ├── routes/         # Express API routes
    │   └── index.js        # Server entry point
    ├── prisma/             # Database architecture
    │   ├── schema.prisma   # Data models (User, Property, Booking, etc.)
    │   └── seed.js         # Initial database seeder
    └── package.json
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

## 📬 Contact
Developed by [Snigdha](https://github.com/Snigdha-0210) - Contributions, issues, and feature requests are always welcome!
