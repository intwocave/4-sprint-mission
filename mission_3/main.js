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

// middleware for loggin all http request
app.use(logRequest);

app.post('/product', async (req, res) => {

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

    res.status(500).json({ message: "An error has occurred during processing sql" });
  }

});

app.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "Invalid parameter 'id'" });

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (product)
      res.status(200).json(product);
    else 
      res.status(404).json({ message: `Cannot find product with ID ${id}` })
  } catch (err) {
    console.error('An error has occurred: ', err.message);

    res.status(500).json({ message: "An error has occurred during processing sql" });
  }
});

app.patch('/product/:id', async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: "Invalid parameter 'id'" });

  // Columns in model Product
  const productCols = [
    "name",
    "description",
    "price",
    "tags"
  ];

  const filteredBody = Object.entries(req.body)
    .filter(e => productCols.includes(e[0]))
    .reduce((obj, ele) => {
      obj[ele[0]] = ele[1]
      return obj;
    }, {});
  
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: {
        ...filteredBody
      }
    });

    if (product)
      res.status(200).json(product);
    else 
      res.status(404).json({ message: `Cannot find product with ID ${id}` });
  } catch (err) {
    console.error('An error has occurred: ', err.message);

    res.status(500).json({ message: "An error has occurred during processing sql" });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}..`));