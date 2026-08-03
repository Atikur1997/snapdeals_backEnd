const express = require("express");
const router = express.Router();

const {
  allProducts,
  productById,
  newProductEntry,
} = require("../controllers/productControllers");

router.get("/", allProducts);
router.get("/:id", productById);
router.post("/", newProductEntry);
router.put("/:id", newProductEntry);


module.exports = router;
