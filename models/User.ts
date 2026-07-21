import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
