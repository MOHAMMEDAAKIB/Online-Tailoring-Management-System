# Setup Guide for Online Tailoring Management System

This guide will walk you through setting up the complete system from scratch.

## Prerequisites Installation

### 1. Install Node.js
Download and install Node.js (v14 or higher) from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version
npm --version
```

### 2. Install MySQL
Download and install MySQL (v5.7 or higher) from [mysql.com](https://dev.mysql.com/downloads/)

Start MySQL service:
```bash
# On macOS
brew services start mysql

# On Linux
sudo systemctl start mysql

# On Windows
net start MySQL
```

## Database Setup

### 1. Create Database
Login to MySQL:
```bash
mysql -u root -p
```

Create database:
```sql
CREATE DATABASE tailoring_system;
EXIT;
```

### 2. Run Schema
```bash
cd backend
mysql -u root -p tailoring_system < config/schema.sql
```

This will create all necessary tables and insert a default admin user.

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=tailoring_system
JWT_SECRET=generate_a_random_secret_key_here
JWT_EXPIRES_IN=24h
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

### 3. Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Setup Stripe (Optional for Development)
1. Sign up at [stripe.com](https://stripe.com)
2. Get your test API keys from the Stripe Dashboard
3. Add them to your `.env` file

### 5. Setup Email (Optional for Development)
For Gmail:
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use that password in your `.env` file

### 6. Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will start at `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

### 3. Start Frontend Server
```bash
npm start
```

Application will open at `http://localhost:3000`

## Testing the Setup

### 1. Test Backend API
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"OK","message":"Tailoring Management System API is running"}
```

### 2. Test Database Connection
Check backend console for:
```
Database connected successfully
Server is running on port 5000
```

### 3. Login as Admin
1. Open `http://localhost:3000`
2. Click "Login"
3. Use credentials:
   - Email: `admin@tailoring.com`
   - Password: `admin123`

### 4. Create a Customer Account
1. Click "Register"
2. Fill in the form
3. Login with new credentials

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Common Issues

### Issue: Database connection failed
**Solution:** 
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists

### Issue: Port already in use
**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in backend/.env
```

### Issue: CORS errors
**Solution:**
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env

### Issue: Stripe errors in development
**Solution:**
- Use Stripe test keys (start with `sk_test_` and `pk_test_`)
- Or skip payment testing for now

### Issue: Email sending fails
**Solution:**
- Email is optional for development
- Check spam folder
- Verify email credentials

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong JWT_SECRET
3. Use production Stripe keys
4. Setup proper database with backups
5. Use process manager (PM2):
```bash
npm install -g pm2
pm2 start server.js --name tailoring-api
```

### Frontend
1. Build production version:
```bash
npm run build
```
2. Serve with nginx or deploy to:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront

### Database
1. Use cloud database (AWS RDS, Google Cloud SQL)
2. Enable SSL connections
3. Regular backups
4. Monitor performance

## Next Steps

1. Customize the design and branding
2. Add more measurement types
3. Implement the AI measurement estimation feature
4. Add more payment gateways
5. Create mobile app
6. Add analytics and reporting

## Support

For issues or questions:
- Check the README.md
- Review error logs in console
- Open an issue on GitHub
