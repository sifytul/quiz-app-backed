import bcrypt from "bcrypt";
import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../dbModels/userModel";

// @desc create user - sign up
async function createUserController(
  req: express.Request,
  res: express.Response
) {
  try {
    const { name, email, username, password, school } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Required field must be filled" });
    }
    const isUser = await User.findOne({ email }).lean().exec();
    const username_existed = await User.findOne({ username });
    if (username_existed) {
      return res.status(400).json({ message: "Choose another username" });
    }
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName: name,
      username,
      email,
      password: hashedPass,
      school,
    });
    // delete user._doc.password
    const userDetails = {
      userId: newUser?._id,
      name: newUser?.fullName,
      email: newUser?.email,
      school: newUser?.school,
    };
    res.status(200).json({ message: "Signed up Successfully", userDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup failed" });
  }
}

// @desc Sign in
async function signInController(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Required field must be filled" });
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
      userId: isUser._id,
      name: isUser.fullName,
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

// @desc Refresh controller

async function refreshController(req: express.Request, res: express.Response) {
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
    userId: foundUser?._id,
    name: foundUser?.fullName,
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

// @desc logout from the website
function logoutController(req: express.Request, res: express.Response) {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.setHeader("Authorization", "");
  res.status(200).json({ message: "Logged out successfully" });
}

export {
  createUserController,
  signInController,
  refreshController,
  logoutController,
};
