import express from "express";
import Chapter from "../dbModels/chapterModel";
import Quiz from "../dbModels/quizModel";

async function getChaptersController(
  req: express.Request,
  res: express.Response
) {
  try {
    const allQuizzes = await Chapter.find();
    // .populate("quizzes");

    res.status(200).json({ message: "success", allQuizzes });
  } catch (err) {
    console.log(err);
  }
}

async function postChaptersController(
  req: express.Request,
  res: express.Response
) {
  try {
    const chapter = await Chapter.create({
      ...req.body,
    });
    res.status(201).json({ message: "success", chapter });
  } catch (err) {
    console.log(err);
  }
}

async function getQuizOfChapterByIdController(
  req: express.Request,
  res: express.Response
) {
  try {
    const quizzes = await Chapter.find({ _id: req.params.chapterId }).populate(
      "quizzes"
    );
    res.status(200).json({ message: "success", quizzes });
  } catch (err) {
    console.log(err);
  }
}

async function postQuizInChapterByIdController(
  req: express.Request,
  res: express.Response
) {
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
}

export {
  getChaptersController,
  postChaptersController,
  getQuizOfChapterByIdController,
  postQuizInChapterByIdController
}