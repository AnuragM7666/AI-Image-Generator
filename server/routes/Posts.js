import express from "express";
import { createPost, getAllPosts, deletePost } from "../controllers/Posts.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
