import bcrypt from "bcrypt";
import express, { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../dbModels/userModel";

const authRouter = Router();

const genUUID = idGenerator();

// @desc Sign up
// @route POST /api/v1/auth/signup
// @access Public - to create account
authRouter.post(
  "/signup",
  async (req: express.Request, res: express.Response) => {
    try {
      const { name, email, password, school } = req.body;
      const isUser = await User.findOne({ email }).lean().exec();
      if (isUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        userId: genUUID.next().value,
        name,
        email,
        password: hashedPass,
      });

      // delete user._doc.password
      const userDetails = {
        userId: newUser?.userId,
        name: newUser?.name,
        email: newUser?.email,
        school: newUser?.school,
      };
      res.status(200).json({ message: "Signed up Successfully", userDetails });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Signup failed" });
    }
  }
);

// @desc Sign in
// @route POST /api/v1/auth/signin
// @access Public- to sign in with credentials
authRouter.post(
  "/signin",
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Empty fields are not acceptable" });
      }

      const isUser = await User.findOne({ email });
      if (!isUser) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      let isPassMatched = await bcrypt.compare(password, isUser.password);
      if (!isPassMatched) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      let userDetails = {
        userId: isUser.userId,
        name: isUser.name,
        email: isUser.email,
        school: isUser.school,
      };

      const accessToken = await jwt.sign(
        userDetails,
        `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
        {
          expiresIn: "10m",
        }
      );

      const refreshToken = await jwt.sign(
        { email: userDetails.email },
        `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Signed in successfully", accessToken });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// @desc Refresh
// @route GET /auth/refresh
// @Public - because access token has expired
authRouter.get(
  "/refresh",
  async (req: express.Request, res: express.Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    const decoded = (await jwt.verify(
      refreshToken,
      `${process.env.JWT_REFRESH_TOKEN_SECRET}`
    )) as JwtPayload;
    const foundUser = await User.findOne({ email: decoded.email });

    let userDetails = {
      userId: foundUser?.userId,
      name: foundUser?.name,
      email: foundUser?.email,
      school: foundUser?.school,
    };

    const accessToken = await jwt.sign(
      userDetails,
      `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
      {
        expiresIn: "1m",
      }
    );
    res.status(200).json({ accessToken });
  }
);

// @desc logout from the website
// @route POST /api/v1/auth/logout
// @access - Private - user with refreshtoken can logout
authRouter.post("/logout", (req: express.Request, res: express.Response) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.setHeader("Authorization", "");
  res.status(200).json({ message: "Logged out successfully" });
});

export default authRouter;

// helper function
function* idGenerator() {
  for (let i = 1; i < 10; i++) {
    yield i;
  }
}
