import express from "express";
import "dotenv/config";
import { connectMongoDB } from "./lib/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
connectMongoDB();

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
