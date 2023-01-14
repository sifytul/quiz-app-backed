import { model, Schema } from "mongoose";

const quizSchema = new Schema(
  {
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "Chapter"
    },
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        optionTitle: {
          type: String,
          required: true,
        },
        isCorrect: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Quiz = model("Quiz", quizSchema);

export default Quiz;
