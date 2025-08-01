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
  })

  // Inquiry all products
  .get(async (req, res) => {
    const { 
      offset = 0, 
      limit = 10, 
      sort = 'recent',
      search = ''
    } = req.query;

    let articlesSort = '';

    switch (sort) {
      case 'old':
        articlesSort = 'asc';
        break;

      case 'recent':
      default:
        articlesSort = 'desc';
    }

    try {
      const articles = await prisma.article.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true
        },
        orderBy: {
          createdAt: articlesSort
        },
        where: {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive',
             }
            },
            {
              content: {
                contains: search,
                mode: 'insensitive',
              }
            }
          ],
        },
        skip: offset * limit,
        take: limit
      });

      if (articles)
        res.status(200).json(articles);
      else 
        res.status(404).json({ message: `Cannot find product with ID ${id}` });
    } catch (err) {
      console.error('An error has occurred: ', err.message);

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

  // Modify a article property
  .patch(async (req, res) => {
    const { id } = req.params;
    if (!id) 
      return res.status(400).json({ message: "Invalid parameter 'id'" });

    // Columns in model Product
    const articleCols = [
      "title",
      "content"
    ];

    const filteredBody = Object.entries(req.body)
      .filter(e => articleCols.includes(e[0]))
      .reduce((obj, ele) => {
        obj[ele[0]] = ele[1];
        return obj;
      }, {});

    try {
      const article = await prisma.article.update({
        where: {
          id: Number(id)
        },
        data: {
          ...filteredBody
        }
      });

      if (article)
        res.status(200).json(article);
      else
        res.status(404).json({ message: `Cannot find product with ID ${id}` });
    } catch (err) {
      console.error('An error has occurred: ', err.message);

      res.status(500).json({ message: "An error has occurred during processing sql" });
    }
  })

  // Delete a particular article
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Invalid parameter 'id'" });

    try {
      const deleted = await prisma.article.delete({
        where: {
          id: Number(id)
        }
      });

      if (deleted)
        res.status(200).json(deleted);
      else 
        res.status(404).json({ message: `Cannot find product with ID ${id}` });
    } catch (err) {
      console.error('An error has occurred: ', err.message);

      res.status(500).json({ message: "An error has occurred during processing sql" });
    }
  });

export default router;