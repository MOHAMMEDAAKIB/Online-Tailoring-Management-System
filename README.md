# Online Tailoring Management System

A comprehensive full-stack web application for managing tailoring services, built with React, Node.js, Express, MySQL, and integrated with JWT authentication and Stripe payment processing.

## Features

### Customer Features
- **User Registration & Login**: Secure authentication with JWT tokens
- **Measurement Submission**: Submit and manage body measurements for different garment types
- **Order Placement**: Create custom orders with fabric, color, and design preferences
- **Bill Viewing**: View all bills associated with orders
- **Online Payment**: Secure payment processing using Stripe
- **Notifications**: Receive real-time notifications about order status, bills, and payments

### Admin Features
- **Order Management**: View all orders and update order status
- **Measurement Management**: Access all customer measurements
- **Bill Creation**: Generate bills for completed orders
- **Payment Tracking**: Monitor payment status and transaction history
- **Alert System**: Send notifications and alerts to all customers or specific users

### Future Enhancement
- **AI Measurement Estimation**: Upcoming feature to estimate body measurements from photos using AI/ML for improved accuracy and convenience

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Stripe** for payment processing
- **Nodemailer** for email notifications

### Frontend
- **React 18** with React Router
- **Axios** for API calls
- **Stripe React** components for payment UI
- **React Toastify** for notifications

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your database credentials, JWT secret, Stripe keys, and email settings:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tailoring_system
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

5. Create the database and run the schema:
```bash
mysql -u root -p < config/schema.sql
```

6. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend API will be available at `http://localhost:5000/api`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

5. Start the frontend development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Measurements
- `POST /api/measurements` - Create measurement
- `GET /api/measurements` - Get all measurements
- `GET /api/measurements/:id` - Get measurement by ID
- `PUT /api/measurements/:id` - Update measurement
- `DELETE /api/measurements/:id` - Delete measurement
- `POST /api/measurements/estimate` - AI measurement estimation (coming soon)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order
- `PATCH /api/orders/:id/status` - Update order status (admin only)
- `DELETE /api/orders/:id` - Delete order

### Bills
- `POST /api/bills` - Create bill (admin only)
- `GET /api/bills` - Get all bills
- `GET /api/bills/:id` - Get bill by ID
- `PUT /api/bills/:id` - Update bill (admin only)
- `DELETE /api/bills/:id` - Delete bill (admin only)

### Payments
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/process` - Process payment
- `GET /api/payments/history` - Get payment history

### Notifications
- `GET /api/notifications` - Get all notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification
- `POST /api/notifications/alert` - Send alert to all (admin only)
- `POST /api/notifications/send` - Send to specific user (admin only)

## Database Schema

The system uses the following main tables:
- **users** - User accounts (customers and admins)
- **measurements** - Customer body measurements
- **orders** - Tailoring orders
- **bills** - Order bills and invoicing
- **payment_transactions** - Payment records
- **notifications** - User notifications

## Default Credentials

**Admin Account:**
- Email: `admin@tailoring.com`
- Password: `admin123`

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
```

## Project Structure

```
Online-Tailoring-Management-System/
├── backend/
│   ├── config/          # Database and configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── context/     # React context
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
└── README.md
```

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Role-based access control (customer/admin)
- Secure payment processing with Stripe
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Future Roadmap

- [ ] AI-powered measurement estimation from photos
- [ ] Real-time order tracking
- [ ] SMS notifications
- [ ] Multiple payment gateway support
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Multi-language support

## Support

For issues and questions, please open an issue on the GitHub repository.
