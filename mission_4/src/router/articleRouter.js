import express from "express";
import { validateArticle } from "../middleware/index.js";
import {
  createPost,
  getPosts,
  getPost,
  patchPost,
  deletePost,
  postComment,
  getComments,
  patchComment,
  deleteComment,
} from "../controller/index.js";

const router = express.Router();

router
  .route("/")

  // Create a post
  .post(validateArticle, createPost)

  // Inquiry all articles
  .get(getPosts);

router
  .route("/:id")

  // Get informations of a certain article
  .get(getPost)

  // Modify a article property
  .patch(patchPost)

  // Delete a particular article
  .delete(deletePost);

router
  .route("/:id/comments")

  // Add a comment
  .post(postComment)

  // Inquery all comments
  .get(getComments);

router
  .route("/:id/comments/:cid")

  .patch(patchComment)

  .delete(deleteComment);

export default router;
