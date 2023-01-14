import { Router } from "express";
import Chapter from "../dbModels/chapterSchema";
import Quiz from "../dbModels/quizModel";

const quizRouter = Router();

// @desc get all chapter and quizzes
// @route GET /api/v1/quiz/chapters
// @access - Private

quizRouter.get("/chapters", async (req, res) => {
  try {
    const allQuizzes = await Chapter.find().populate("quizzes");

    res.status(200).json({ message: "success", allQuizzes });
  } catch (err) {
    console.log(err);
  }
});

quizRouter.get("/chapters/:chapterId", async (req, res) => {
  try {
    const quizzes = await Chapter.find({ _id: req.params.chapterId }).populate(
      "quizzes"
    );
    res.status(200).json({ message: "success", quizzes });
  } catch (err) {
    console.log(err);
  }
});

// @desc post chapters name
// @route POST /api/v1/quiz/chapters
// @access - Private
quizRouter.post("/chapters", async (req, res) => {
  try {
    const chapter = await Chapter.create({
      ...req.body,
    });
    res.status(201).json({ message: "success", chapter });
  } catch (err) {
    console.log(err);
  }
});

// @desc post quiz and update quiz id to the specific chapter
// @route POST /api/v1/quiz/:chapterId/quizzes
// @access - Private
quizRouter.post("/:chapterId/quizzes", async (req, res) => {
  try {
    const chapterId = req.params.chapterId;
    const quiz = await Quiz.create({
      ...req.body,
      chapterId: chapterId,
    });

    await Chapter.updateOne(
      { _id: chapterId },
      {
        $push: { quizzes: quiz._id },
      }
    );
    res.status(201).json({ message: "success", quiz });
  } catch (err) {
    console.log(err);
  }
});

export default quizRouter;
