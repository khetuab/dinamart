# DinaMart - Professional E-commerce Website

A fully responsive, modern e-commerce platform built with React, Node.js, Express, and MongoDB.

## Features

- 🛍️ Complete e-commerce functionality (products, cart, checkout)
- 👤 User authentication (register, login, logout)
- 🔐 JWT-based secure authentication
- 🏦 Bank transfer payment system with copy/share functionality
- 👨‍💼 Admin dashboard for product and order management
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern UI/UX with Tailwind CSS
- 🔍 Product search, filtering, and pagination
- 📦 Order management with payment verification

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer

## Project Structure

```
dinamart/
├── client/          # React frontend application
├── server/          # Node.js backend API
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**

   Create a `.env` file in the `server` directory (copy from `.env.example` if available):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dinamart
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```
   
   **Important**: Change the `JWT_SECRET` to a strong random string in production!

3. **Start MongoDB:**
   - If using local MongoDB, ensure the service is running
   - Or use MongoDB Atlas connection string in `.env`

4. **Seed the database (optional):**
   ```bash
   cd server
   npm run seed
   ```

5. **Start the application:**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend (port 3000).

### Default Admin Account

After seeding:
- **Email**: admin@dinamart.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with pagination, search, filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `GET /api/orders` - Get user orders (or all orders for admin)
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin only)

### Banks
- `GET /api/banks` - Get all bank accounts
- `POST /api/banks` - Add bank account (admin only)
- `PUT /api/banks/:id` - Update bank account (admin only)
- `DELETE /api/banks/:id` - Delete bank account (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)

## Development

- Frontend runs on: http://localhost:3000
- Backend API runs on: http://localhost:5000

## Production

Build the frontend for production:
```bash
cd client
npm run build
```

The built files will be in `client/build` directory.

## License

ISC

