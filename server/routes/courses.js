import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollStudent,
  getUserCourses,
} from "../controllers/courseController.js";

const router = express.Router();

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Protected routes
router.post("/", authenticate, createCourse);
router.put("/:id", authenticate, updateCourse);
router.delete("/:id", authenticate, deleteCourse);
router.post("/enroll", authenticate, enrollStudent);
router.get("/user/my-courses", authenticate, getUserCourses);

export default router;
