import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminDashboard } from "./dashboards/AdminDashboard";
import { StudentDashboard } from "./dashboards/StudentDashboard";
import { TeacherDashboard } from "./dashboards/TeacherDashboard";
import "./index.css";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CoursesPage } from "./pages/CoursesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AssignmentsPage } from "./pages/AssignmentsPage";
import { AssignmentSubmitPage } from "./pages/AssignmentSubmitPage";
import { SubmissionsPage } from "./pages/SubmissionsPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/teacher-dashboard"
            element={
              <PrivateRoute requiredRole="teacher">
                <TeacherDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute requiredRole="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <CoursesPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/assignments"
            element={
              <PrivateRoute>
                <AssignmentsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/assignment/:id/submit"
            element={
              <PrivateRoute requiredRole="student">
                <AssignmentSubmitPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/assignment/:id/submissions"
            element={
              <PrivateRoute>
                <SubmissionsPage />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
