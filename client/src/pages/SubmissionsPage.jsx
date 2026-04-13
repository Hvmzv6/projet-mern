import { ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuth } from "../contexts/AuthContext";
import { DashboardLayout } from "../components/DashboardLayout";
import axios from "axios";

export const SubmissionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grading, setGrading] = useState(false);
  const [gradingData, setGradingData] = useState({
    grade: "",
    feedback: "",
  });

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/assignments/${id}`);
      setAssignment(response.data);
      if (response.data.submissions.length > 0) {
        setSelectedSubmission(response.data.submissions[0]);
      }
    } catch (error) {
      console.error("Error fetching assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    if (!gradingData.grade) {
      alert("Please enter a grade");
      return;
    }

    try {
      setGrading(true);
      await axios.post(`/api/assignments/${id}/grade`, {
        studentId: selectedSubmission.student._id || selectedSubmission.student,
        grade: parseInt(gradingData.grade),
        feedback: gradingData.feedback,
      });
      alert("Grade submitted successfully!");
      fetchAssignment();
      setGradingData({ grade: "", feedback: "" });
    } catch (error) {
      console.error("Error grading submission:", error);
      alert("Error grading submission");
    } finally {
      setGrading(false);
    }
  };

  const getStudentName = (student) => {
    if (typeof student === "object") {
      return `${student.firstName} ${student.lastName}`;
    }
    return "Unknown Student";
  };

  const getStudentEmail = (student) => {
    if (typeof student === "object") {
      return student.email;
    }
    return "N/A";
  };

  const formatSubmissionDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isLate = (submittedAt) => {
    return new Date(submittedAt) > new Date(assignment.dueDate);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading submissions...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!assignment) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Assignment not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/assignments")}
          className="dark:text-blue-400 dark:hover:bg-gray-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Assignments
        </Button>

        {/* Assignment Info */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">{assignment.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {assignment.submissions.length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Graded</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {assignment.submissions.filter((s) => s.grade !== undefined).length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {assignment.submissions.filter((s) => s.grade === undefined).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">
                  Submissions ({assignment.submissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {assignment.submissions.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No submissions yet
                    </p>
                  ) : (
                    assignment.submissions.map((submission, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setGradingData({
                            grade: submission.grade || "",
                            feedback: submission.feedback || "",
                          });
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedSubmission === submission
                            ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700"
                            : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-medium text-sm text-gray-900 dark:text-white">
                              {getStudentName(submission.student)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {getStudentEmail(submission.student)}
                            </p>
                          </div>
                          {submission.grade !== undefined ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submission Details and Grading */}
          <div className="lg:col-span-2 space-y-6">
            {selectedSubmission ? (
              <>
                {/* Student Info */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {getStudentName(selectedSubmission.student)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-900 dark:text-white">
                        {getStudentEmail(selectedSubmission.student)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Submitted
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {formatSubmissionDate(selectedSubmission.submittedAt)}
                      </p>
                      {isLate(selectedSubmission.submittedAt) && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                          ⚠️ Late submission
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Submission Content */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">
                      Submission Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {selectedSubmission.content}
                      </p>
                    </div>

                    {selectedSubmission.attachments &&
                      selectedSubmission.attachments.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Attachments:
                          </p>
                          <div className="space-y-2">
                            {selectedSubmission.attachments.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
                              >
                                <span className="text-sm">{file}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>

                {/* Grading Form */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">
                      {selectedSubmission.grade !== undefined
                        ? "Update Grade"
                        : "Grade Submission"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleGradeSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Grade (out of {assignment.maxPoints})
                          </label>
                          <Input
                            type="number"
                            min="0"
                            max={assignment.maxPoints}
                            value={gradingData.grade}
                            onChange={(e) =>
                              setGradingData({
                                ...gradingData,
                                grade: e.target.value,
                              })
                            }
                            placeholder="0"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                          />
                        </div>
                        {gradingData.grade && (
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Percentage
                            </label>
                            <Input
                              type="text"
                              value={`${Math.round(
                                (parseInt(gradingData.grade) /
                                  assignment.maxPoints) *
                                  100
                              )}%`}
                              disabled
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Feedback
                        </label>
                        <textarea
                          value={gradingData.feedback}
                          onChange={(e) =>
                            setGradingData({
                              ...gradingData,
                              feedback: e.target.value,
                            })
                          }
                          placeholder="Provide feedback to the student..."
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                          rows="4"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={grading}
                        className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white flex items-center justify-center gap-2"
                      >
                        <Send size={16} />
                        {grading ? "Submitting..." : "Submit Grade"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a submission to view and grade
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
