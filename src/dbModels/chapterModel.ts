import { model, Schema } from "mongoose";

const chapterSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
  },
  { timestamps: true }
);

const Chapter = model("Chapter", chapterSchema);

export default Chapter;
