let express = require("express");
let ProductRouter = express.Router();
let mongoose = require("mongoose");
let productController = require("../controllers/productController");
const authController = require("../controllers/authController.js");
require("../models/Product");
let productSchema = mongoose.model("Product");

ProductRouter.route("/")
    .get(productController.getProducts)
    .post(
        authController.protect,
        authController.restrictTo(true),
        productController.uploadProductImages,
        productController.addProduct
    );

ProductRouter.route("/search").get(productController.searchProduct);

ProductRouter.route("/:id")
    .get(productController.getOneProduct)
    .put(authController.protect, authController.restrictTo(true),productController.uploadProductImages, productController.updateProduct);

ProductRouter.route("/category/:id").get(productController.getProductsByCategory);

ProductRouter.route("/:id").delete(
    authController.protect,
    authController.restrictTo(true),
    productController.deleteProduct
);

ProductRouter.get(
    `/get/count`,
    authController.protect,
    authController.restrictTo(true),
    productController.getNumberOfProducts
);

ProductRouter.get(
    `/get/featured/:count?`,
    authController.protect,
    authController.restrictTo(true),
    productController.getFeaturedProducts
);

module.exports = ProductRouter;
