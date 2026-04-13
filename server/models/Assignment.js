import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
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
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    maxPoints: {
      type: Number,
      default: 100,
    },
    submissions: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        submittedAt: Date,
        content: String,
        attachments: [String],
        grade: Number,
        feedback: String,
        status: {
          type: String,
          enum: ["submitted", "graded", "late"],
          default: "submitted",
        },
      },
    ],
    status: {
      type: String,
      enum: ["published", "draft", "closed"],
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);
