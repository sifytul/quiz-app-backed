import { Schema, model} from "mongoose";

const quizSchema = new Schema({
    topic: {
    },
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      title: {
        type: String,
        required: true,
      },
    },
  ],
  answers: [
    {
      title: {
        type: String,
        required: true,
      },
    },
  ],
}, {timestamps:true});

const Quiz = model("Quiz", quizSchema)

export default Quiz;
