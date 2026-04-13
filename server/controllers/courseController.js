import { Course } from "../models/Course.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, level, credits, schedule, capacity, syllabus } = req.body;
    const instructorId = req.user.id;

    // Only teachers and admins can create courses
    if (req.user.role !== "teacher" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only teachers and admins can create courses" });
    }

    const course = new Course({
      title,
      description,
      instructor: instructorId,
      category,
      level,
      credits,
      schedule,
      capacity,
      syllabus,
    });

    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

// Get all courses with filters
export const getCourses = async (req, res) => {
  try {
    const { category, level, status, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await Course.find(filter)
      .populate("instructor", "firstName lastName email")
      .populate("students", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "firstName lastName email")
      .populate("students", "firstName lastName email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Only instructor and admin can update
    if (course.instructor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only update your own courses" });
    }

    const { title, description, category, level, credits, schedule, capacity, status, syllabus } = req.body;

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.level = level || course.level;
    course.credits = credits || course.credits;
    course.schedule = schedule || course.schedule;
    course.capacity = capacity || course.capacity;
    course.status = status || course.status;
    course.syllabus = syllabus || course.syllabus;

    await course.save();
    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Only instructor and admin can delete
    if (course.instructor.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only delete your own courses" });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};

// Enroll student in course
export const enrollStudent = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can enroll in courses" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    if (course.students.length >= course.capacity) {
      return res.status(400).json({ message: "Course is full" });
    }

    course.students.push(studentId);
    await course.save();

    res.json({ message: "Successfully enrolled in course", course });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling in course", error: error.message });
  }
};

// Get user's courses
export const getUserCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let courses;
    if (userRole === "teacher" || userRole === "admin") {
      courses = await Course.find({ instructor: userId }).populate("students", "firstName lastName email");
    } else {
      courses = await Course.find({ students: userId }).populate("instructor", "firstName lastName email");
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user courses", error: error.message });
  }
};
