import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import allRoutes from "./src/routes/allRoutes"

const app:express.Application = express()

// middleware in use
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// route is use
app.use("/api/v1", allRoutes)

app.get("/", (req, res) => {
    res.send("Hello from quiz-backed")
})

mongoose.set("strictQuery", true);
mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log("DB connected")
    app.listen(process.env.PORT || 7000, () => {
        console.log(`Server is listening on PORT:${process.env.PORT || 7000}`)
    })
})