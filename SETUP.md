# Quick Setup Guide for DinaMart

## Step-by-Step Installation

### 1. Install Dependencies

From the root directory, run:
```bash
npm run install-all
```

This will install dependencies for:
- Root package (concurrently for running both servers)
- Server (Node.js backend)
- Client (React frontend)

### 2. Configure Environment

Create a `.env` file in the `server` directory:

**Windows (PowerShell):**
```powershell
cd server
New-Item -Path .env -ItemType File
```

**Linux/Mac:**
```bash
cd server
touch .env
```

Then add the following content to `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dinamart
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
Replace `MONGODB_URI` with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dinamart?retryWrites=true&w=majority
```

### 3. Start MongoDB

**Option A: Local MongoDB**
- Ensure MongoDB is installed and running
- On Windows: MongoDB should start automatically as a service
- On Linux: `sudo systemctl start mongod`
- On Mac: `brew services start mongodb-community`

**Option B: MongoDB Atlas**
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update the `MONGODB_URI` in `.env`

### 4. Seed the Database (Optional but Recommended)

This will create sample products, admin user, and bank accounts:

```bash
cd server
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@dinamart.com`
- Password: `admin123`

**Test Customer:**
- Email: `customer@dinamart.com`
- Password: `customer123`

### 5. Start the Application

From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

Open your browser and navigate to http://localhost:3000

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- For Atlas: Ensure your IP is whitelisted

### Port Already in Use
- Change `PORT` in `server/.env` to a different port (e.g., 5001)
- Update `proxy` in `client/package.json` if needed

### Module Not Found Errors
- Delete `node_modules` folders in root, server, and client
- Run `npm run install-all` again

### CORS Errors
- Ensure backend is running on port 5000
- Check that `client/package.json` has `"proxy": "http://localhost:5000"`

## Project Structure

```
dinamart/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts (Auth, Cart)
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/        # Auth middleware
│   ├── scripts/           # Seed script
│   └── server.js          # Entry point
├── package.json            # Root package.json
└── README.md
```

## Next Steps

1. **Customize Products**: Add your own products via admin dashboard
2. **Update Bank Accounts**: Add real bank account details in admin panel
3. **Configure Settings**: Update site name, contact info, etc.
4. **Deploy**: When ready, deploy to production (Heroku, Vercel, etc.)

## Support

For issues or questions, check the main README.md file.


