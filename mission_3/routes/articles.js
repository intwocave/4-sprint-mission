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


router.route('/:id')

  // Get informations of a certain article
  .get(async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Invalid parameter 'id'" });

    try {
      const article = await prisma.article.findUnique({
        where: {
          id: parseInt(id)
        }
      });

      if (article)
        res.status(200).json(article);
      else 
        res.status(404).json({ message: `Cannot find product with ID ${id}` })
    } catch (err) {
      console.error('An error has occurred: ', err.message);

      res.status(500).json({ message: "An error has occurred during processing sql" });
    }
  })

export default router;