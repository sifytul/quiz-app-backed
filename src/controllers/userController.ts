import express from "express";
import User from "../dbModels/userModel";

// @desc get all user from db
async function getAllUsersController(req: express.Request, res: express.Response) {
  const users = await User.find().select("-password -_id -__v").exec();
  res.status(200).json({ message: "successful", users });
}

// @desc- get individual user by name
async function getIndividualUserByNameController(
  req: express.Request,
  res: express.Response
) {
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

// @desc - update user by userId
async function updateUserByIdController(
  req: express.Request,
  res: express.Response
) {
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

// @desc - delete a single user by id
async function deleteUserByIdController(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.params.id;
    const user = await User.deleteOne({ id });
    return res.status(200).json({ message: "User deleted successfully", user });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
}

export {
  getAllUsersController,
  getIndividualUserByNameController,
  deleteUserByIdController,
  updateUserByIdController
}