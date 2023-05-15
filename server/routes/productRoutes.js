const express = require("express");
const { requireAuth, adminAuth } = require("../middleware/requireAuth");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
} = require("../controllers/productControllers");
const formidable = require("express-formidable");

const router = express.Router();

//create product
router.post(
  "/create-product",
  requireAuth,
  adminAuth,
  formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireAuth,
  adminAuth,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single products
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:id", deleteProductController);

//filter product
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

module.exports = router;
