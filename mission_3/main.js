import express from 'express';
import productRouter from './routes/products.js';
import articleRouter from './routes/articles.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

function logRequest(req, _, next) {
  console.log(`[${req.method}] ${req.originalUrl}`)
  next();
}

// middleware for loggin all http request
app.use(logRequest);

app.use('/products', productRouter);
app.use('/articles', articleRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}..`));