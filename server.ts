import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./src/config/dbConnection";
import allRoutes from "./src/routes/allRoutes";

const app: express.Application = express();

// middleware in use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// dbConnection
connectDB();
// route is use
app.use("/api/v1", allRoutes);

app.get("/", (req, res) => {
  res.send("Hello from quiz-backed");
});

app.get("/download", (req, res) => {
  res.download("Express 5.x - API Reference.pdf");
})

app.get("/redirect", (req, res) => {
  res.redirect("http://facebook.com");
})

mongoose.connection.once("open", () => {
  console.log("DB connected");
  app.listen(process.env.PORT || 7000, () => {
    console.log(`Server is listening on PORT:${process.env.PORT || 7000}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
