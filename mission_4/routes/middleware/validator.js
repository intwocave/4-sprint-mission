export async function validateProduct (req, res, next) {
  const {
    name,
    description,
    price,
    tags
  } = req.body;

  // validation logic (possible improvements with Zod library in the future)
  if ( !name || !description || !price || !tags )
    return res.status(400).json({ message: "Missing required fields" });

  if (isNaN(price))
    return res.status(400).json({ message: "Price must be a number" });

  if (!Array.isArray(tags) || !tags.every(tag => typeof tag !== 'string'))
    return res.status(400).json({ message: "Tags must be an array of string" });

  next();
};