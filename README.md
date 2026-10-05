# 🔐 NestLocker — Smart Locker Reservation Platform

NestLocker is a full-stack web application for finding, reserving, and managing secure lockers online.

The project provides user authentication, locker availability, time-based booking, Razorpay payments, ID document upload, booking cancellation, and automatic booking completion.

## 🌐 Live Demo

**Frontend:** https://nestlocker-1.onrender.com  
**Backend API:** https://nestlocker.onrender.com

> The live deployment uses MongoDB Atlas for database storage and Render for hosting.

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected routes
- View available lockers
- Time-based locker booking
- Booking conflict/overlap prevention
- View personal bookings
- Cancel bookings
- Razorpay test payment integration
- Payment signature verification
- Paid/Pending payment status
- ID document upload
- File type and size validation using Multer
- Automatic booking completion using Cron jobs
- Responsive React UI
- Loading and empty states
- Mobile-friendly responsive navigation
- CORS-enabled backend API

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Razorpay
- node-cron
- CORS
- dotenv

### Deployment
- Frontend: Render Static Site
- Backend: Render Web Service
- Database: MongoDB Atlas

---

## 📁 Project Structure

```text
NestLocker/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── multer.js
│   │   └── razorpay.js
│   │
│   ├── cron/
│   │   └── bookingCron.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Locker.js
│   │   └── Booking.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── lockerRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── uploadRoutes.js
│   │
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Lockers.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   └── IDUpload.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

---

## 🔄 Application Flow

```text
User
  ↓
React Frontend
  ↓
Axios API Request
  ↓
Express Route
  ↓
Authentication Middleware
  ↓
Business Logic
  ↓
Mongoose
  ↓
MongoDB Atlas
  ↓
API Response
  ↓
React UI
```

### Authentication Flow

```text
Register
   ↓
Password hashed with bcrypt
   ↓
User stored in MongoDB
   ↓
Login
   ↓
JWT token generated
   ↓
Token stored on frontend
   ↓
Protected requests use Bearer token
```

### Booking Flow

```text
Select Locker
   ↓
Choose Start & End Time
   ↓
POST Booking Request
   ↓
Check for overlapping booking
   ↓
Create Booking
   ↓
My Bookings
   ↓
Pay using Razorpay
   ↓
Verify Payment Signature
   ↓
Payment marked as Paid
```

---

## 🔗 Main API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get logged-in user profile |

### Lockers

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/lockers` | Get lockers |
| GET | `/api/lockers/available` | Get available lockers |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings/my` | Get user's bookings |
| PUT | `/api/bookings/cancel/:bookingId` | Cancel a booking |

### Payments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/payments/create-order` | Create Razorpay order |
| POST | `/api/payments/verify-payment` | Verify Razorpay payment |

### Uploads

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/uploads/id` | Upload ID document |

---

## ⚙️ Environment Variables

### Backend

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend

Create `frontend/.env`:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_public_key
```

> Never commit `.env` files, database passwords, JWT secrets, or Razorpay secret keys to GitHub.

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/ashishKr77/NestLocker.git
cd NestLocker
```

### 2. Start Backend

```bash
cd backend
npm install
npm start
```

Backend runs locally on:

```text
http://localhost:5000
```

### 3. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs locally on the Vite development server.

---

## 🧪 Testing

The application was tested for:

- Registration
- Duplicate registration handling
- Login
- JWT authentication
- Protected routes
- Locker listing
- Booking creation
- Booking overlap/conflict handling
- Booking cancellation
- Razorpay order creation
- Payment verification
- Paid/Pending UI
- ID upload
- File validation
- Cron-based booking completion
- Responsive mobile navigation
- Loading states
- Empty states
- End-to-end user flow

---

## 🔒 Security Notes

- Passwords are hashed before storage.
- Protected APIs use JWT authentication.
- Razorpay payment signatures are verified on the backend.
- File uploads are validated by type and size.
- Sensitive environment variables are kept outside the source code.
- CORS is configured for frontend-backend communication.

---

## 🎯 Project Objective

NestLocker was built to demonstrate a complete full-stack workflow:

**React → REST API → Authentication → MongoDB → Booking System → Payment Gateway → File Upload → Automation → Deployment**

The project is designed as a practical full-stack application and portfolio project.

---

## 🚧 Future Improvements

- Admin dashboard for locker management
- Real-time locker availability
- Email/SMS booking notifications
- Booking history filters
- Better payment failure/retry handling
- Cloud file storage instead of local uploads
- Production payment integration
- Role-based access control
- Automated CI/CD pipeline

---

## 👨‍💻 Author

**Ashish Kumar**  
B.Tech CSE

GitHub: https://github.com/ashishKr77

---

## 📄 License

This project is licensed under the MIT License.
