import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createAssignment,
  getCourseAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  gradeSubmission,
  getStudentSubmissions,
} from "../controllers/assignmentController.js";

const router = express.Router();

// Public routes
router.get("/course/:courseId", getCourseAssignments);
router.get("/:id", getAssignmentById);

// Protected routes
router.post("/", authenticate, createAssignment);
router.put("/:id", authenticate, updateAssignment);
router.delete("/:id", authenticate, deleteAssignment);

// Student routes
router.post("/:id/submit", authenticate, submitAssignment);
router.get("/student/submissions", authenticate, getStudentSubmissions);

// Teacher routes
router.post("/:id/grade", authenticate, gradeSubmission);

export default router;
