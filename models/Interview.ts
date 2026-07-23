import mongoose, { Schema, models } from "mongoose";

const InterviewSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["behavioral", "technical", "mixed"],
      required: true,
    },
    targetRole: {
      type: String,
      default: "",
    },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant", "system"], required: true },
        content: { type: String, required: true },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Interview = models.Interview || mongoose.model("Interview", InterviewSchema);
export default Interview;
