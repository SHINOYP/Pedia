const express = require("express");
const { requireAuth, adminAuth } = require("../middleware/requireAuth");
const {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//create
router.post(
  "/create-category",
  requireAuth,
  adminAuth,
  createCategoryController
);

//update
router.put(
  "/update-catergory/:id",
  requireAuth,
  adminAuth,
  updateCategoryController
);

//get all
router.get("/get-category", categoryController);

//get single category
router.get("/single-category/:slug", singleCategoryController);

//delete category

router.delete(
  "/delete-category/:id",
  requireAuth,
  adminAuth,
  deleteCategoryController
);

module.exports = router;
