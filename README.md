# MERN Education Platform

A full-stack education management system built with MongoDB, Express, React (Vite), and Node.js.

## Features

- **Role-Based Access Control**: Admin, Teacher, and Student roles
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **User Dashboards**: Customized dashboards for each role
- **Modern UI**: Built with React, Vite, Tailwind CSS, and Shadcn/ui components
- **RESTful API**: Express backend with MongoDB database
- **Responsive Design**: Mobile-friendly interface

## Project Structure

```
projet-mern/
├── client/                 # React Vite frontend
│   ├── src/
│   │   ├── components/    # UI components and PrivateRoute
│   │   ├── pages/         # Login and Register pages
│   │   ├── dashboards/    # Role-based dashboards
│   │   ├── contexts/      # Auth context and state management
│   │   ├── lib/           # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/                # Express Node.js backend
│   ├── models/           # MongoDB schemas (User)
│   ├── controllers/      # Route controllers (auth)
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication and authorization
│   ├── server.js         # Main server file
│   ├── .env.example      # Environment variables example
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your configuration:

```
MONGODB_URI=mongodb://localhost:27017/mern-education
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

5. Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`

#### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The client will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `GET /api/health` - Health check

## Default Test Accounts

After running the servers, you can register new accounts or use these credentials to test different roles:

### Registration

Go to `http://localhost:5173/register` and create accounts with different roles:

**Admin Account:**

- First Name: Admin
- Last Name: User
- Email: admin@example.com
- Role: Admin

**Teacher Account:**

- First Name: John
- Last Name: Teacher
- Email: teacher@example.com
- Role: Teacher

**Student Account:**

- First Name: Jane
- Last Name: Student
- Email: student@example.com
- Role: Student

## Features Implementation

### Admin Dashboard

- User management
- Course management
- System settings
- Analytics and reports

### Teacher Dashboard

- Course management
- Assignment management
- Student management
- Performance reports

### Student Dashboard

- View enrolled courses
- Submit assignments
- View grades
- Communicate with teachers

## Technologies Used

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library
- **Lucide React** - Icon library

### Backend

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- Passwords excluded from API responses
- Role-based access control
- Protected routes with authentication middleware

## Future Enhancements

- Email verification
- Password reset functionality
- Course creation and management
- Assignment submission system
- Grading system
- Real-time notifications
- Video streaming support
- Mobile app
- Advanced analytics

## Development Tips

### Running Both Servers Simultaneously

For development, open two terminal windows:

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

### Testing the API

Use tools like Postman or Thunder Client to test the API:

1. **Register:**
   - URL: `POST http://localhost:5000/api/auth/register`
   - Body:

   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com",
     "password": "password123",
     "role": "student"
   }
   ```

2. **Login:**
   - URL: `POST http://localhost:5000/api/auth/login`
   - Body:

   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Get User Info (Authenticated):**
   - URL: `GET http://localhost:5000/api/auth/me`
   - Headers: `Authorization: Bearer <your_jwt_token>`

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally or check your Atlas connection string
- Verify the `MONGODB_URI` in `.env`

### CORS Errors

- Check that the backend CORS configuration matches your frontend URL
- Ensure both servers are running

### Token Issues

- Verify the `JWT_SECRET` is the same in `.env`
- Check that the token is being sent correctly in the Authorization header

## License

ISC

## Author

Created as an educational MERN stack project.
