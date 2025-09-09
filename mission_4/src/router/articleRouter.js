import express from "express";
import { validateArticle } from "../middleware/index.js";
import auth from "../middleware/auth.js";
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
  .post(auth.verifyAccessToken, validateArticle, createPost)

  // Inquiry all articles
  .get(getPosts);

router
  .route("/:id")

  // Get informations of a certain article
  .get(getPost)

  // Modify a article property
  .patch(auth.verifyAccessToken, auth.verifyArticleAuth, patchPost)

  // Delete a particular article
  .delete(auth.verifyAccessToken, auth.verifyArticleAuth, deletePost);

router
  .route("/:id/comments")

  // Add a comment
  .post(auth.verifyAccessToken, postComment)

  // Inquery all comments
  .get(getComments);

router
  .route("/:id/comments/:cid")

  // Modify comment
  .patch(auth.verifyAccessToken, auth.verifyArticleCommentAuth, patchComment)

  // Delete comment
  .delete(auth.verifyAccessToken, auth.verifyArticleCommentAuth, deleteComment);

export default router;
