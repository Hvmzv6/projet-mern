import { Upload, Send } from "lucide-react";
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

export const AssignmentSubmitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState({
    content: "",
    attachments: [],
  });
  const [existingSubmission, setExistingSubmission] = useState(null);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/assignments/${id}`);
      setAssignment(response.data);

      // Check if student already submitted
      const studentSubmission = response.data.submissions.find(
        (sub) => sub.student === user.id || sub.student._id === user.id
      );
      if (studentSubmission) {
        setExistingSubmission(studentSubmission);
        setSubmission({
          content: studentSubmission.content || "",
          attachments: studentSubmission.attachments || [],
        });
      }
    } catch (error) {
      console.error("Error fetching assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload these to cloud storage
    // For now, we'll just store file names
    setSubmission({
      ...submission,
      attachments: [...submission.attachments, ...files.map((f) => f.name)],
    });
  };

  const handleRemoveAttachment = (fileName) => {
    setSubmission({
      ...submission,
      attachments: submission.attachments.filter((f) => f !== fileName),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submission.content.trim()) {
      alert("Please enter your submission content");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(`/api/assignments/${id}/submit`, {
        content: submission.content,
        attachments: submission.attachments,
      });
      alert("Assignment submitted successfully!");
      fetchAssignment();
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("Error submitting assignment");
    } finally {
      setSubmitting(false);
    }
  };

  const isOverdue = new Date() > new Date(assignment?.dueDate);
  const formattedDueDate = assignment
    ? new Date(assignment.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading assignment...</p>
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
      <div className="space-y-6 max-w-3xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/assignments")}
          className="dark:text-blue-400 dark:hover:bg-gray-700"
        >
          ← Back to Assignments
        </Button>

        {/* Assignment Details */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">{assignment.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              {assignment.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formattedDueDate}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Max Points</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {assignment.maxPoints} pts
                </p>
              </div>
            </div>
            {isOverdue && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                <p className="text-red-700 dark:text-red-400 text-sm">
                  ⚠️ This assignment is overdue and will be marked as late
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submission Form */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">
              {existingSubmission ? "Update Submission" : "Submit Assignment"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Answer
                </label>
                <textarea
                  value={submission.content}
                  onChange={(e) =>
                    setSubmission({ ...submission, content: e.target.value })
                  }
                  placeholder="Write your submission here..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  rows="8"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                  <label className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      Click to upload files
                    </span>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    or drag and drop files here
                  </p>
                </div>

                {submission.attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Uploaded Files:
                    </p>
                    {submission.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {file}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAttachment(file)}
                          className="text-red-600 dark:text-red-400 dark:hover:bg-gray-600"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {existingSubmission && (
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    ℹ️ You already have a submission. Submitting again will update it.
                    {existingSubmission.grade !== undefined && (
                      <span className="block mt-1">
                        Current Grade: {existingSubmission.grade}/{assignment.maxPoints}
                      </span>
                    )}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {submitting ? "Submitting..." : "Submit Assignment"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/assignments")}
                  className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
