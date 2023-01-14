import "dotenv/config";
import express, { Router } from "express";
import User from "../dbModels/userModel";
import verifyJWT from "../middlewares/verifyJWT";

const userRouter = Router();

userRouter.use(verifyJWT);

// @desc get all user from db
// @route GET /api/v1/user/alluser
// @access - Private
userRouter.get("/alluser", async (req, res) => {
  const users = await User.find().select("-password -_id -__v").exec();
  res.status(200).json({ message: "successful", users });
});

// @desc- get individual user with name
// @route - GET /api/v1/user/:name
// @access - Private
userRouter.get(
  "/:name",
  async (req: express.Request, res: express.Response) => {
    try {
      const name = req.params.name;
      let user = await User.findOne({ name });
      if (!user) {
        return res.status(400).json({ message: "Wrong credentials" });
      }
      let userDetails = {
        userId: user.userId,
        name: user.name,
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

// @desc - update user with userId
// @route - PATCH /api/v1/user/:id
// @access - Private
userRouter.patch(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    const { name, school } = req.body;
    if (!name || !school) {
      return res
        .status(400)
        .json({ message: "Required can't be remained empty!" });
    }
    const id = req.params.id;

    const foundUser = await User.findById({ _id: id });
    if (!foundUser) {
      return res.status(400).json({ message: "User not available" });
    }
    foundUser.name = name;
    foundUser.school = school;

    let updatedUser = await foundUser.save();
    res
      .status(200)
      .json({ message: "User info updated Successfully!", updatedUser });
  }
);

// @desc - delete a single user with id
// @route - DELETE /api/v1/user/:id
// @access - Private
userRouter.delete(
  "/:id",
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

export default userRouter;
