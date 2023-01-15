import { Router } from "express";
import {
  getChaptersController,
  getQuizOfChapterByIdController,
  postChaptersController,
  postQuizInChapterByIdController,
} from "../controllers/quizController";

const quizRouter = Router();

// @desc get all chapter and quizzes
// @route GET /api/v1/quiz/chapters
// @access - Private
quizRouter.get("/chapters", getChaptersController);

// @desc get all quizes of chapter
// @route GET /api/v1/quiz/chapters/:chapterId
// @access - Private
quizRouter.get("/chapters/:chapterId", getQuizOfChapterByIdController);

// @desc post chapters name
// @route POST /api/v1/quiz/chapters
// @access - Private
quizRouter.post("/chapters", postChaptersController);

// @desc post quiz and update quiz id to the specific chapter
// @route POST /api/v1/quiz/:chapterId/quizzes
// @access - Private
quizRouter.post("/:chapterId/quizzes", postQuizInChapterByIdController);

export default quizRouter;
