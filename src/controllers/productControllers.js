const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
} = require("../services/products.services");

const allProducts = async (req, res) => {
  return res.send(await getAllProducts());
};

const productById = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  return res.send(product);
};

const newProductEntry = async (req, res) => {
  try {
    const product = req.body;
    const result = await createProduct(product);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const product = req.body;
    const result = await updateProduct(id, userId, product);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  allProducts,
  productById,
  newProductEntry,
  productUpdate,
};
