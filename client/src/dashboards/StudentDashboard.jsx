import { Award, BookOpen, FileText, LogOut } from "lucide-react";
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

export const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Student Dashboard
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
                <BookOpen size={24} className="text-orange-600" />
                Enrolled Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
              <p className="text-gray-600 text-sm mt-1">Currently studying</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={24} className="text-yellow-600" />
                GPA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3.85</p>
              <p className="text-gray-600 text-sm mt-1">Current semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={24} className="text-blue-600" />
                Pending Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">4</p>
              <p className="text-gray-600 text-sm mt-1">Assignments due</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning</CardTitle>
              <CardDescription>Access your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Browse Courses
              </Button>
              <Button className="w-full" variant="outline">
                My Courses
              </Button>
              <Button className="w-full" variant="outline">
                Course Materials
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>Submit and view assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                View Assignments
              </Button>
              <Button className="w-full" variant="outline">
                Submit Work
              </Button>
              <Button className="w-full" variant="outline">
                Check Grades
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Records</CardTitle>
              <CardDescription>View your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                View Grades
              </Button>
              <Button className="w-full" variant="outline">
                Transcript
              </Button>
              <Button className="w-full" variant="outline">
                Grade History
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication</CardTitle>
              <CardDescription>Connect with teachers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Messages
              </Button>
              <Button className="w-full" variant="outline">
                Discussion Forums
              </Button>
              <Button className="w-full" variant="outline">
                Schedule Meetings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
