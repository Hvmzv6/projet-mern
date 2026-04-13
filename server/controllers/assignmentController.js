import { Assignment } from "../models/Assignment.js";

// Create assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, courseId, dueDate, maxPoints } = req.body;
    const instructorId = req.user.id;

    if (req.user.role !== "teacher" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only teachers can create assignments" });
    }

    const assignment = new Assignment({
      title,
      description,
      course: courseId,
      instructor: instructorId,
      dueDate,
      maxPoints,
    });

    await assignment.save();
    await assignment.populate("course instructor");
    
    res.status(201).json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error: error.message });
  }
};

// Get assignments for a course
export const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;

    const assignments = await Assignment.find({ course: courseId })
      .populate("instructor", "firstName lastName")
      .populate("submissions.student", "firstName lastName");

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error: error.message });
  }
};

// Get assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("instructor", "firstName lastName email")
      .populate("course", "title")
      .populate("submissions.student", "firstName lastName email");

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignment", error: error.message });
  }
};

// Update assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.instructor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only update your own assignments" });
    }

    const { title, description, dueDate, maxPoints, status } = req.body;

    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.dueDate = dueDate || assignment.dueDate;
    assignment.maxPoints = maxPoints || assignment.maxPoints;
    assignment.status = status || assignment.status;

    await assignment.save();
    res.json({ message: "Assignment updated successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error updating assignment", error: error.message });
  }
};

// Delete assignment
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.instructor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only delete your own assignments" });
    }

    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting assignment", error: error.message });
  }
};

// Submit assignment
export const submitAssignment = async (req, res) => {
  try {
    const { content, attachments } = req.body;
    const studentId = req.user.id;
    const assignmentId = req.params.id;

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can submit assignments" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const existingSubmission = assignment.submissions.find(
      (sub) => sub.student.toString() === studentId,
    );

    const submission = {
      student: studentId,
      submittedAt: new Date(),
      content,
      attachments: attachments || [],
      status: new Date() > assignment.dueDate ? "late" : "submitted",
    };

    if (existingSubmission) {
      const index = assignment.submissions.indexOf(existingSubmission);
      assignment.submissions[index] = { ...existingSubmission, ...submission };
    } else {
      assignment.submissions.push(submission);
    }

    await assignment.save();
    res.json({ message: "Assignment submitted successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error submitting assignment", error: error.message });
  }
};

// Grade assignment submission
export const gradeSubmission = async (req, res) => {
  try {
    const { studentId, grade, feedback } = req.body;
    const assignmentId = req.params.id;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.instructor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only grade your own assignments" });
    }

    const submission = assignment.submissions.find(
      (sub) => sub.student.toString() === studentId,
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    submission.status = "graded";

    await assignment.save();
    res.json({ message: "Submission graded successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: "Error grading submission", error: error.message });
  }
};

// Get student submissions
export const getStudentSubmissions = async (req, res) => {
  try {
    const studentId = req.user.id;

    const assignments = await Assignment.find({ status: "published" })
      .populate("course", "title")
      .populate("instructor", "firstName lastName")
      .populate("submissions.student", "firstName lastName");

    const studentAssignments = assignments.map((assignment) => ({
      ...assignment.toObject(),
      submissions: assignment.submissions.filter((sub) => sub.student._id.toString() === studentId),
    }));

    res.json(studentAssignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions", error: error.message });
  }
};
