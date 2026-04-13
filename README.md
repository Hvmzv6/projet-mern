# MERN Education Platform - EduHub

A comprehensive full-stack education management system built with MongoDB, Express, React (Vite), and Node.js. Designed for managing courses, assignments, and student enrollments with role-based access control.

## ✨ Features

### Core Features
- **Role-Based Access Control**: Admin, Teacher, and Student roles with customized experiences
- **JWT Authentication**: Secure token-based authentication with bcrypt password hashing
- **Dark Mode Support**: Theme persistence with localStorage
- **Responsive Design**: Mobile-friendly interface with mobile menu support
- **Modern UI**: Built with React, Vite, Tailwind CSS, and Shadcn/ui components

### Student Features
- 🎓 **Level and Branch Enrollment**: Register with year level (1st, 2nd, 3rd Year) and branch (Computer Science, Embedded Systems, Economics)
- 📚 **Course Enrollment**: Browse and enroll in available courses
- 📝 **Assignment Submission**: Submit assignments with file attachments
- 👤 **User Profile**: View and edit profile information with avatar upload
- 📊 **Dashboard**: Quick overview of courses, assignments, and grades

### Teacher Features
- 📚 **Course Management**: Create, edit, and manage multiple courses
- 📋 **Assignment Management**: Create assignments with due dates and point values
- 🔍 **Assignment Grading**: Grade student submissions with feedback
- 👥 **Student Management**: View enrolled students and track submissions
- 📈 **Submission Tracking**: Monitor submission status and deadlines

### Admin Features
- 👥 **User Management**: Manage all system users
- 📚 **Course Management**: Oversee all courses across the platform
- 📊 **Analytics**: View system-wide reports and statistics
- ⚙️ **Settings**: System configuration and controls

## 🏗️ Project Structure

```
projet-mern/
├── client/                          # React Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx         # Navigation with dark mode toggle
│   │   │   ├── DashboardLayout.jsx # Layout wrapper for authenticated pages
│   │   │   ├── PrivateRoute.jsx    # Protected route component
│   │   │   └── ui/                 # Shadcn UI components
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx       # User authentication
│   │   │   ├── RegisterPage.jsx    # User registration with level/branch selection
│   │   │   ├── CoursesPage.jsx     # Course browsing, creation, filtering
│   │   │   ├── ProfilePage.jsx     # User profile view and edit
│   │   │   ├── AssignmentsPage.jsx # Assignment list and management
│   │   │   ├── AssignmentSubmitPage.jsx  # Student submission interface
│   │   │   └── SubmissionsPage.jsx       # Teacher grading interface
│   │   ├── dashboards/
│   │   │   ├── AdminDashboard.jsx    # Admin overview
│   │   │   ├── TeacherDashboard.jsx  # Teacher overview
│   │   │   └── StudentDashboard.jsx  # Student overview
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx      # Authentication state management
│   │   ├── lib/
│   │   │   └── utils.js            # Utility functions
│   │   ├── widgets/                # Reusable dashboard components
│   │   │   ├── StatsCard.jsx
│   │   │   ├── ActivityCard.jsx
│   │   │   ├── ListItem.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── assets/
│   │       └── itbs-logo.png       # Application logo
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
├── server/                          # Express Node.js backend
│   ├── models/
│   │   ├── User.js                 # User schema with level/branch fields
│   │   ├── Course.js               # Course schema
│   │   └── Assignment.js           # Assignment schema with submissions
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── courseController.js     # Course CRUD operations
│   │   └── assignmentController.js # Assignment and submission handling
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── assignments.js
│   ├── middleware/
│   │   └── auth.js                 # JWT verification and role checking
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── SETUP.md                         # Detailed setup instructions
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Installation

#### Backend Setup

1. Clone and navigate to the server directory:
```bash
cd server
npm install
```

2. Create a `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/mern-education
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

3. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

#### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
npm install
```

2. Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📚 Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "teacher" | "student",
  phone: String,
  avatar: String,
  level: "1st Year" | "2nd Year" | "3rd Year" (students only),
  branch: "Computer Science" | "Embedded Systems" | "Economics" (students only),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  instructor: ObjectId (ref: User),
  students: [ObjectId],
  category: String,
  level: String,
  credits: Number,
  capacity: Number,
  schedule: String,
  syllabus: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Assignment Model
```javascript
{
  title: String,
  description: String,
  course: ObjectId,
  instructor: ObjectId,
  dueDate: Date,
  maxPoints: Number,
  submissions: [{
    student: ObjectId,
    content: String,
    submittedAt: Date,
    attachments: [String],
    grade: Number,
    feedback: String,
    status: "submitted" | "graded" | "late"
  }],
  status: "published" | "draft" | "closed",
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (includes level/branch for students)
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create course (teacher/admin)
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/enroll` - Enroll in course

### Assignments
- `GET /api/assignments` - List all assignments
- `POST /api/assignments` - Create assignment
- `GET /api/assignments/:id` - Get assignment details
- `PUT /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment
- `POST /api/assignments/:id/submit` - Submit assignment (student)
- `POST /api/assignments/:id/grade` - Grade submission (teacher)
- `GET /api/assignments/:id/submissions` - View all submissions

## 👥 Demo Credentials

### Registration
For testing different roles, register with:

**Student:** (Select "1st Year" and "Computer Science" during registration)
```
Email: student@example.com
Password: password
Level: 1st Year, 2nd Year, or 3rd Year
Branch: Computer Science, Embedded Systems, or Economics
```

**Teacher:**
```
Email: teacher@example.com
Password: password
```

**Admin:**
```
Email: admin@example.com
Password: password
```

## 🎯 Features Breakdown

### Level and Branch System
Students register with:
- **Year Level**: 1st Year, 2nd Year, 3rd Year
- **Branch**: Computer Science, Embedded Systems, Economics
- Used for course recommendations and enrollment tracking

### Course Management
- Create courses with title, description, category, and capacity
- Filter courses by category
- Search courses by title or description
- Track student enrollment
- Teachers can edit/delete their courses
- Admins can edit/delete any course

### Assignment System
- Create assignments linked to courses
- Set due dates and maximum points
- Students submit work with file attachments
- Track submission status (submitted, late, graded)
- Teachers grade submissions with feedback
- Automatic late detection based on due date
- View submission history and updates

### User Profile
- View personal information
- Edit profile details
- Upload and update avatar
- View account type and membership date
- Change password (if implemented)

### Dark Mode
- Toggle dark/light theme
- Preference persists across sessions
- All components support dark styling
- Tailwind dark: class implementation

## 🔒 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- Protected routes with role verification
- CORS enabled for frontend communication
- Passwords excluded from API responses
- Environment variables for sensitive data
- Error handling with appropriate HTTP status codes

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Headless UI components
- **Lucide React** - Icon library
- **Context API** - State management

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM with schema validation
- **JWT** - JSON Web Tokens
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📋 Development Tips

### Running Full Stack
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

### API Testing with Postman

**Register:**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "level": "1st Year",
  "branch": "Computer Science"
}
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Course:**
```
POST http://localhost:5000/api/courses
Headers: Authorization: Bearer {token}
Body (JSON):
{
  "title": "Introduction to React",
  "description": "Learn React fundamentals",
  "category": "Technology",
  "level": "Beginner",
  "credits": 3,
  "capacity": 30
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check connection string in `.env`
- For Atlas: Verify IP whitelist and connection string

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill process
kill -9 PID
```

### CORS Errors
- Verify `CLIENT_URL` in server `.env`
- Check both servers are running
- Ensure frontend URL matches CORS origin

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Token Issues
- Verify `JWT_SECRET` is set in `.env`
- Check token format in Authorization header: `Bearer {token}`
- Ensure token hasn't expired

## 📦 Future Enhancements

- [ ] Email verification and password reset
- [ ] Real-time notifications (Socket.io)
- [ ] Discussion forums and chat
- [ ] File upload to cloud storage
- [ ] Advanced grade analytics
- [ ] Attendance tracking
- [ ] Video lectures and streaming
- [ ] Mobile application
- [ ] Two-factor authentication
- [ ] Course prerequisites and dependencies
- [ ] Quiz and exam system
- [ ] Certificate generation

## 📝 License

ISC

## 👨‍💻 Author

Created as a comprehensive MERN stack educational project.
