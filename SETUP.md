# MERN Education Platform - Setup Guide

## Quick Start

This is a complete MERN (MongoDB, Express, React, Node.js) education platform with:

- ✅ Role-based dashboards (Admin, Teacher, Student)
- ✅ JWT authentication with password hashing
- ✅ Modern UI with Shadcn/ui and Tailwind CSS
- ✅ Protected routes
- ✅ Responsive design

## Installation & Setup

### Step 1: Clone or Extract the Project

```bash
cd c:\Users\safsa\Desktop\projet-mern
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

## Running the Application

### Option 1: Run Backend and Frontend Separately (Recommended for Development)

**Terminal 1 - Start Backend Server:**

```bash
cd server
npm run dev
```

You should see: `Server running on port 5000`

**Terminal 2 - Start Frontend Dev Server:**

```bash
cd client
npm run dev
```

You should see: `Local: http://localhost:5173/`

### Option 2: Run Both Simultaneously (If concurrently is installed)

From the root directory:

```bash
npm run dev
```

## Accessing the Application

1. Open your browser and go to: **http://localhost:5173**
2. You'll be redirected to the login page

## Testing the Application

### Create New Accounts

1. Click on "Register here" link from login page
2. Fill in the details and select a role:
   - **Student** - Access student dashboard with course enrollment features
   - **Teacher** - Access teacher dashboard with course and assignment management
   - **Admin** - Access admin dashboard with system management

### Example Test Credentials

Register these accounts to test different roles:

**Student Account:**

```
First Name: Jane
Last Name: Smith
Email: jane@example.com
Password: password123
Role: Student
```

**Teacher Account:**

```
First Name: John
Last Name: Doe
Email: john@example.com
Password: password123
Role: Teacher
```

**Admin Account:**

```
First Name: Admin
Last Name: User
Email: admin@example.com
Password: password123
Role: Admin
```

## Project Structure

```
projet-mern/
│
├── server/                      # Express.js Backend
│   ├── models/
│   │   └── User.js             # MongoDB User schema with bcrypt
│   ├── controllers/
│   │   └── authController.js   # Register, login, me endpoints
│   ├── routes/
│   │   └── auth.js             # Auth routes
│   ├── middleware/
│   │   └── auth.js             # JWT verification & role authorization
│   ├── server.js               # Express app setup
│   ├── package.json
│   ├── .env                    # Environment variables
│   └── .env.example
│
├── client/                      # React Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/            # Shadcn/ui components (Button, Input, Card)
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── dashboards/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── TeacherDashboard.jsx
│   │   │   └── StudentDashboard.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx  # Auth state management with axios
│   │   ├── lib/
│   │   │   └── utils.js        # tailwind merge utilities
│   │   ├── App.jsx             # Main app with routing
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Tailwind CSS
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env
│   └── .env.example
│
├── package.json               # Root package.json
└── README.md                  # Full documentation

```

## API Endpoints

### Authentication Routes

All requests should include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

#### POST /api/auth/register

Register a new user

**Request:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2024-03-14T00:00:00.000Z",
    "updatedAt": "2024-03-14T00:00:00.000Z"
  }
}
```

#### POST /api/auth/login

Login with email and password

**Request:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2024-03-14T00:00:00.000Z",
    "updatedAt": "2024-03-14T00:00:00.000Z"
  }
}
```

#### GET /api/auth/me

Get current authenticated user

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "_id": "...",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "role": "student",
  "createdAt": "2024-03-14T00:00:00.000Z",
  "updatedAt": "2024-03-14T00:00:00.000Z"
}
```

#### GET /api/health

Health check

**Response:**

```json
{
  "message": "Server is running"
}
```

## Key Features

### 1. Authentication

- Bcryptjs password hashing (10 salt rounds)
- JWT token-based authentication
- Automatic token refresh in context
- Secure password storage

### 2. Role-Based Access Control

- Admin role: System-wide management
- Teacher role: Course and assignment management
- Student role: Course enrollment and assignment submission

### 3. Protected Routes

- Only authenticated users can access dashboards
- Role-based route protection
- Automatic redirect to login for unauthorized access

### 4. Frontend Features

- React Context API for state management
- Axios for HTTP requests
- React Router for navigation
- Responsive design with Tailwind CSS
- Modern UI components with Shadcn/ui

### 5. Backend Features

- Express.js REST API
- MongoDB with Mongoose ODM
- CORS enabled for cross-origin requests
- Error handling middleware
- Request validation

## Configuration

### Environment Variables

**Server (.env):**

```
MONGODB_URI=mongodb://localhost:27017/mern-education
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Client (.env):**

```
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Issue: "MongoDB connection error"

**Solution:**

- Ensure MongoDB is running locally
- Or update MONGODB_URI to use MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/mern-education`

### Issue: "CORS error" or "Cannot POST /api/auth/login"

**Solution:**

- Verify backend is running on port 5000
- Check VITE_API_URL in client .env matches backend URL
- Restart both servers

### Issue: Login fails with "Invalid credentials"

**Solution:**

- Ensure correct email and password are used
- Create a new account if testing with forgotten credentials
- Check MongoDB is storing user data correctly

### Issue: "Token expired" or "Invalid token"

**Solution:**

- Log out and log in again to get a fresh token
- Check JWT_SECRET is the same on server and that it hasn't expired (7 days default)

## Packages Used

### Backend

- **express** - Web framework
- **mongoose** - Database ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** - Development auto-reload

### Frontend

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **tailwindcss** - CSS utility framework
- **vite** - Build tool and dev server
- **class-variance-authority** - Component variants
- **clsx** - Conditional classes
- **lucide-react** - Icon library
- **tailwind-merge** - Tailwind conflict resolution

## Next Steps / Future Features

1. Add course management system
2. Implement assignment submission
3. Add real-time notifications
4. Create email verification
5. Add password reset functionality
6. Implement advanced grading system
7. Add video streaming support
8. Create mobile app
9. Add user profile management
10. Implement discussion forums

## Support

For issues or questions, review the troubleshooting section or check the console logs in:

- Browser DevTools (Frontend) - F12
- Terminal output (Backend)

## License

ISC

---

**Happy Learning! 🎓**
