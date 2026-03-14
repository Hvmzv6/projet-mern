import { BarChart3, BookOpen, LogOut, Users } from "lucide-react";
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

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Admin Dashboard
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
                <Users size={24} className="text-blue-600" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">145</p>
              <p className="text-gray-600 text-sm mt-1">Active users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={24} className="text-green-600" />
                Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">28</p>
              <p className="text-gray-600 text-sm mt-1">Active courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={24} className="text-purple-600" />
                Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">87%</p>
              <p className="text-gray-600 text-sm mt-1">Average engagement</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage all users and their roles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                View All Users
              </Button>
              <Button className="w-full" variant="outline">
                Add New User
              </Button>
              <Button className="w-full" variant="outline">
                Manage Roles
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Create and manage courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Create Course
              </Button>
              <Button className="w-full" variant="outline">
                View All Courses
              </Button>
              <Button className="w-full" variant="outline">
                Course Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Platform Settings
              </Button>
              <Button className="w-full" variant="outline">
                Email Config
              </Button>
              <Button className="w-full" variant="outline">
                Backup & Restore
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                View Reports
              </Button>
              <Button className="w-full" variant="outline">
                User Statistics
              </Button>
              <Button className="w-full" variant="outline">
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
