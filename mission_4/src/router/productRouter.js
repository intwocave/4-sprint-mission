import express from "express";
import { validateProduct } from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import * as productController from "../controller/productController.js";

const router = express.Router();

router
  .route("/")

  // Upload a new product
  .post(
    auth.verifyAccessToken,
    validateProduct,
    productController.createProduct
  )

  // Inquiry all products
  .get(productController.getProducts);

router
  .route("/:id")

  // Get informations of a certain product
  .get(productController.getProduct)

  // Modify a product property
  .patch(productController.patchProduct)

  // Delete a particular product
  .delete(productController.deleteProduct);

router
  .route("/:id/comments")

  // Add a comment
  .post(productController.postComment)

  // Inquery all comments
  .get(productController.getComments);

router
  .route("/:id/comments/:cid")

  .patch(productController.patchComment)

  .delete(productController.deleteComment);

export default router;
