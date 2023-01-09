import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: [3, "username can't be less than 3 Characters"],
  },
  email: {
    type: String,
    required: true,
  },
  school: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
