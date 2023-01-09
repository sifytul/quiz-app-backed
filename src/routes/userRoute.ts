import "dotenv/config";
import express, { Router } from "express";
import User from "../dbModels/userModel";
import verifyJWT from "../middlewares/verifyJWT";

const userRoute = Router();

userRoute.get("/alluser", async (req, res) => {
  const users = await User.find().select("-password -_id -__v").exec();
  res.status(200).json({ message: "successful", users });
});

userRoute.get(
  "/1/:username",
  verifyJWT,
  async (req: express.Request, res: express.Response) => {
    try {
      const username = req.params.username;
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Wrong credentials" });
      }
      let userDetails = {
        userId: user.userId,
        username: user.username,
        email: user.email,
      };

      res.status(200).json({
        message: "success",
        userDetails,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

userRoute.delete(
  "/delete/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;
      const user = await User.deleteOne({ id });
      return res
        .status(200)
        .json({ message: "User deleted successfully", user });
    } catch (err) {
      return res.status(500).json({ message: "something went wrong" });
    }
  }
);

export default userRoute;
