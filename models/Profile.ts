import mongoose, { Schema, models } from "mongoose";

const ProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    targetRole: {
      type: String,
    },
    skills: {
      type: [String],
    },
    education: {
      type: [String],
    },
    experience: {
      type: [String],
    },
    overallScore: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Profile = models.Profile || mongoose.model("Profile", ProfileSchema);
export default Profile;
