import { expressjwt } from "express-jwt";
import * as articleRepository from "../repository/articleRepository.js";

// 토큰 검증
const verifyAccessToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

// 게시글 유저 검증
const verifyArticleAuth = async (req, res, next) => {
  // Get article id
  const { id } = req.params;

  // Get article author's id
  try {
    const article = await articleRepository.getPost(id);
    if (!article) {
      const err = new Error(`Article ${id} not found`);
      err.statusCode = 404;
      next(err);
    }

    // Call next if valid user
    if (req.user.userId === article.userId) next();
    else {
      const err = new Error("Unauthorized");
      err.statusCode = 403;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// 게시글 댓글 유저 검증
const verifyArticleCommentAuth = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const comment = await articleRepository.getComment(parseInt(cid));

    if (!comment) {
      const err = new Error(`Comment ${cid} not found`);
      err.statusCode = 404;
      next(err);
    }

    if (req.user.userId === comment.userId) next();
    else {
      const err = new Error("Unauthorized");
      err.statusCode = 403;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// 상품 유저 검증
const verifyProductAuth = (req, res, next) => {
  const { id } = req.params;
};

export default {
  verifyAccessToken,
  verifyArticleAuth,
  verifyArticleCommentAuth,
  verifyProductAuth,
};
