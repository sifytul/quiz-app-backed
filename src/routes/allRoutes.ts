import { Router } from "express";
import authRouter from "./authRoute";
import quizRoute from "./quizRoute";
import userRoute from "./userRoute";


const router = Router();

router.use("/user", userRoute)
router.use("/quiz", quizRoute)
router.use("/auth", authRouter)

export default router;
