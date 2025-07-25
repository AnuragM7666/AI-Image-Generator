import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();

const app = express();

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL || 'https://your-netlify-app.netlify.app'] 
        : ['http://localhost:3000'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

// default get
app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello user!",
    });
});

// function to connect to MongoDB
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('MongoDB connected!'))
        .catch(err => console.error(err));
};

// function to start the server
const startServer = async () => {
    try {
        connectDB();
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

startServer();
