import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { isEmail } = validator;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

// function after docc is saved to db
userSchema.post("save", async function (doc, next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("New user created and saved:", doc);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
