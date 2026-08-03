const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const productCollection = client.db("snapdeal").collection("products");
const userCollection = client.db("snapdeal").collection("users");

const getAllProducts = async () => {
  const result = await productCollection.find().toArray();
  return result;
};

const getProductById = async (id) => {
  const query = { _id: new ObjectId(id) };
  const product = await productCollection.findOne(query);
  if (!product) {
    throw new Error("Product not found");
  }
  const result = await productCollection.findOne(query);
  return result;
};

const createProduct = async (product) => {
  const userId = product.userId;

  const result = await productCollection.insertOne(product);
  return result;
};

const updateProduct = async (id, userId, updatedProduct) => {
  const productId = new ObjectId(id);
  const product = await productCollection.findOne({ _id: productId });

  const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (!user) {
    throw new Error("User not found");
  }
  if (!product) {
    throw new Error("Product not found");
  }

  const result = await productCollection.updateOne(productId, {
    $set: updatedProduct,
  });
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
