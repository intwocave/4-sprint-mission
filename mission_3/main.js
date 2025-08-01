import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.use(express.json());

function logRequest(req, res, next) {
  console.log(`[${req.method}] ${req.path}`)
  next();
}

app.post('/product', logRequest, async (req, res) => {

  // destructuring field data from request body
  const {
    name,
    description,
    price,
    tags
  } = req.body;

  // validation logic (possible improvements with Zod library in the future)
  if ( !name || !description || !price || !tags )
    return res.status(400).json({ message: "Invalid SQL Parameters" });

  try {
    // insert into Product table
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        tags
      }
    });

    // send 201 response status code indicating the query was processed successfully
    // with the Product record
    res.status(201).json(product);
  } catch (err) {
    console.error('An error has occurred: ', err);

    res.status(500).json({ "message": "an error has occurred during processing sql" });
  }

});

app.get('/product/:id', logRequest, async (req, res) => {

});

app.listen(PORT, () => console.log(`Server started on port ${PORT}..`));