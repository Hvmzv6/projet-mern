import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    category: {
      type: String,
      enum: ["mern", "Math", "English", "python", "Data Science", "java"],
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    credits: {
      type: Number,
      default: 3,
    },
    schedule: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Draft"],
      default: "Active",
    },
    syllabus: {
      type: String,
    },
    materials: [
      {
        title: String,
        url: String,
        uploadedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Course = mongoose.model("Course", courseSchema);
