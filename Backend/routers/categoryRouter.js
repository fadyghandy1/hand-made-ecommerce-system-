let express = require("express");
let CategoryRouter = express.Router();
const authController = require("../controllers/authController.js");

let categoryController = require("../controllers/categoryController");
require("../models/Product");

CategoryRouter.route("/").get(categoryController.getCategories).post(authController.protect, authController.restrictTo(true),categoryController.addCategory);

CategoryRouter.route("/:id").get(categoryController.getOneCategory).put(authController.protect, authController.restrictTo(true),categoryController.updateCategory);

CategoryRouter.route("/:id").delete(authController.protect, authController.restrictTo(true),categoryController.deleteCategory);

module.exports = CategoryRouter;
