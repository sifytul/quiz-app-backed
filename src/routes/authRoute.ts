import { Router } from "express";
import {
  createUserController,
  logoutController,
  refreshController,
  signInController,
} from "../controllers/authController";

const authRouter = Router();

const genUUID = idGenerator();

// @desc Sign up
// @route POST /api/v1/auth/signup
// @access Public - to create account
authRouter.post("/signup", createUserController);

// @desc Sign in
// @route POST /api/v1/auth/signin
// @access Public- to sign in with credentials
authRouter.post("/signin", signInController);

// @route GET /auth/refresh
// @Public - because access token has expired
authRouter.get("/refresh", refreshController);

// @route POST /api/v1/auth/logout
// @access - Private - user with refreshtoken can logout
authRouter.post("/logout", logoutController);

export default authRouter;

// helper function
function* idGenerator() {
  for (let i = 1; i < 10; i++) {
    yield i;
  }
}
