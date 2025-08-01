import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}..`));