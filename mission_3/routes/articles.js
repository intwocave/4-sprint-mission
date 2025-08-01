import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();



router.route('/')

  // Create a post
  .post(async (req, res) => {
    const { 
      title, 
      content 
    } = req.body;

    // validation
    if ( !title || !content )
      return res.status(400).json({ message: "Invalid SQL Parameters" });

    try {
      const article = await prisma.article.create({
        data: {
          title,
          content
        }
      });

      res.status(201).json(article);
    } catch (err) {
      console.error('An error has occurred: ', err);

      res.status(500).json({ message: "An error has occurred during processing sql" });
    }
  });

export default router;