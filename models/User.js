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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Prevent rehashing on update

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email or password");
};

const User = mongoose.model("User", userSchema);

export default User;
