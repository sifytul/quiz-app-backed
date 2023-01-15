import { model, Schema } from "mongoose";

const chapterSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    subject_image: {
      type: String,
      required: true,
      default:
        "https://img.ecmweb.com/files/base/ebm/ecmweb/image/2022/08/Photo_223092987____Ahmet_Yamak_Dreamstime.62fd124190d20.png?auto=format,compress&fit=crop&h=278&w=500&q=45",
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
