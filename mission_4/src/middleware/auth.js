import { expressjwt } from "express-jwt";
import * as articleRepository from "../repository/articleRepository.js";

const verifyAccessToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

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
    if (req.user.id === article.userId) next();
    else {
      const err = new Error("Unauthorized");
      err.statusCode = 403;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const verifyProductAuth = (req, res, next) => {
  const { id } = req.params;
};

export default {
  verifyAccessToken,
  verifyArticleAuth,
  verifyProductAuth,
};
