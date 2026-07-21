import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  userId: string;
  fileName: string;
  atsScore: number;
  feedback: string;
  createdAt: Date;
}

const ResumeSchema = new Schema<IResume>({
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  atsScore: { type: Number, required: true, default: 0 },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
