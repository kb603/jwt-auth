import express from "express";
import "dotenv/config";
import { connectMongoDB } from "./lib/mongodb.js";

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// database connection
connectMongoDB();

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
