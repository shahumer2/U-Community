import express from "express"
import { uploadImage, getImage } from "../database/controller/image-controller.js";
import { signupUser, loginUser } from "../database/controller/user-controller.js";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../database/controller/post-controller.js";
const router = express.Router();

import upload from "../utils/upload.js"
import { authenticateToken } from "../database/controller/jwt-controller.js";
import { newComment, getAllComments, deleteComment } from "../database/controller/comment-controller.js";

router.post("/signup", signupUser)
router.post("/login", loginUser)
// the 2nd argumen tis the middle ware
router.post("/file/upload", upload.single("file"), uploadImage)
router.get("/file/:filename", getImage)

router.post("/create", authenticateToken, createPost)
router.get("/posts", authenticateToken, getAllPosts)
router.get("/post/:id", authenticateToken, getPostById)
router.put("/update/:id", authenticateToken, updatePost)
// router.put("/rating/:id", authenticateToken, rating)
router.delete("/delete/:id", authenticateToken, deletePost)
router.post("/comment/new", authenticateToken, newComment)
router.get("/comments/:id", authenticateToken, getAllComments)
router.delete("/comment/delete/:id", authenticateToken, deleteComment)

export default router


// i multer-grid-fs-storage