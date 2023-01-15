import "dotenv/config";
import { Router } from "express";
import { deleteUserByIdController, getAllUsersController, getIndividualUserByNameController, updateUserByIdController } from "../controllers/userController";
import verifyJWT from "../middlewares/verifyJWT";

const userRouter = Router();

userRouter.use(verifyJWT);

// @desc get all user from db
// @route GET /api/v1/user/alluser
// @access - Private
userRouter.get("/alluser", getAllUsersController);

// @desc- get individual user by name
// @route - GET /api/v1/user/:name
// @access - Private
userRouter.get("/:name", getIndividualUserByNameController);

// @route - PATCH /api/v1/user/:id
// @access - Private
userRouter.patch("/:id", updateUserByIdController);

// @route - DELETE /api/v1/user/:id
// @access - Private
userRouter.delete("/:id", deleteUserByIdController);

export default userRouter;
