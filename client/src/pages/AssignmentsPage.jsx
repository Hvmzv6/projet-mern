import { Plus, Search, Trash2, Edit2, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuth } from "../contexts/AuthContext";
import { DashboardLayout } from "../components/DashboardLayout";
import axios from "axios";

export const AssignmentsPage = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    dueDate: "",
    maxPoints: 100,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assignmentsRes, coursesRes] = await Promise.all([
        axios.get("/api/assignments"),
        axios.get("/api/courses"),
      ]);
      setAssignments(assignmentsRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/assignments", formData);
      setShowCreateModal(false);
      setFormData({
        title: "",
        description: "",
        course: "",
        dueDate: "",
        maxPoints: 100,
      });
      fetchData();
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await axios.delete(`/api/assignments/${assignmentId}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  const getStatusIcon = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    } else if (daysLeft <= 3) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    } else {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    return course?.title || "Unknown Course";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Assignments
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredAssignments.length} assignment{filteredAssignments.length !== 1 ? "s" : ""} available
            </p>
          </div>
          {(user?.role === "teacher" || user?.role === "admin") && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white flex items-center gap-2"
            >
              <Plus size={18} />
              Create Assignment
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Assignments List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading assignments...</p>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No assignments found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAssignments.map((assignment) => (
              <Card
                key={assignment._id}
                className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg dark:text-white">
                        {assignment.title}
                      </CardTitle>
                      <CardDescription className="dark:text-gray-400 mt-1">
                        {getCourseName(assignment.course)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(assignment.dueDate)}
                      {(user?.role === "teacher" || user?.role === "admin") && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="dark:hover:bg-gray-700"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAssignment(assignment._id)}
                            className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {assignment.description}
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock size={16} />
                      <span>Due: {formatDate(assignment.dueDate)}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Max Points: {assignment.maxPoints}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Submissions: {assignment.submissions.length}
                    </div>
                  </div>
                  {user?.role === "student" && (
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white"
                      onClick={() => window.location.href = `/assignment/${assignment._id}/submit`}
                    >
                      Submit Work
                    </Button>
                  )}
                  {(user?.role === "teacher" || user?.role === "admin") && (
                    <Button
                      variant="outline"
                      className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                      onClick={() => window.location.href = `/assignment/${assignment._id}/submissions`}
                    >
                      View Submissions ({assignment.submissions.length})
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Assignment Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Create Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateAssignment} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Assignment title"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Assignment description"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Course
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) =>
                        setFormData({ ...formData, course: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Due Date
                    </label>
                    <Input
                      type="datetime-local"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Max Points
                    </label>
                    <Input
                      type="number"
                      value={formData.maxPoints}
                      onChange={(e) =>
                        setFormData({ ...formData, maxPoints: parseInt(e.target.value) })
                      }
                      placeholder="100"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                    >
                      Create
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
