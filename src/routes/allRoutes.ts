import { Router } from "express";
import authRouter from "./authRoute";
import quizRouter from "./quizRoute";
import userRouter from "./userRoute";

const router = Router();

router.use("/user", userRouter);
router.use("/quiz", quizRouter);
router.use("/auth", authRouter);

export default router;
