import { BookOpen, FileText, LogOut, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";

export const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome, {user?.firstName} {user?.lastName}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut size={20} />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={24} className="text-green-600" />
                My Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
              <p className="text-gray-600 text-sm mt-1">Active courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={24} className="text-blue-600" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">142</p>
              <p className="text-gray-600 text-sm mt-1">Total enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={24} className="text-purple-600" />
                Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">23</p>
              <p className="text-gray-600 text-sm mt-1">Pending grading</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Manage your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Create New Course
              </Button>
              <Button className="w-full" variant="outline">
                View My Courses
              </Button>
              <Button className="w-full" variant="outline">
                Course Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment Management</CardTitle>
              <CardDescription>Create and grade assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Create Assignment
              </Button>
              <Button className="w-full" variant="outline">
                View Submissions
              </Button>
              <Button className="w-full" variant="outline">
                Grade Assignments
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Manage enrolled students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                View Students
              </Button>
              <Button className="w-full" variant="outline">
                Send Messages
              </Button>
              <Button className="w-full" variant="outline">
                View Grades
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View course reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Class Performance
              </Button>
              <Button className="w-full" variant="outline">
                Attendance Report
              </Button>
              <Button className="w-full" variant="outline">
                Grade Distribution
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
