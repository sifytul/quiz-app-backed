import { Router } from "express";
import quizRoute from "./quizRoute";
import userRoute from "./userRoute";


const router = Router();

router.use("/user", userRoute)
router.use("/quiz", quizRoute)

export default router;
