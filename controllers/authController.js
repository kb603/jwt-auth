import User from "../models/User.js";

const handleErrors = (error) => {
  console.log(error.message, error.code);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (error.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export function getSignupRoute(req, res) {
  res.render("signup");
}

export async function postSignupRoute(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    handleErrors(error);
    res.status(400).send("User not created");
  }
}

export function getLoginRoute(req, res) {
  res.render("login");
}

export function postLoginRoute(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  res.send("user login");
}
