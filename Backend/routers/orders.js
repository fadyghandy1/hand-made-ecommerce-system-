const express = require("express");
const mongoose = require("mongoose");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController.js");

require("../models/Order");
const OrderSchema = mongoose.model("Order");

orderRouter.route("/").get(orderController.getAllOrders).post(authController.protect, orderController.createOrder);

orderRouter
    .route("/:id")
    .get(orderController.getOneOrder)
    .put(authController.protect, authController.restrictTo(true), orderController.updateOrder)
    .delete(authController.protect, authController.restrictTo(true), orderController.deleteOrder);

orderRouter.route("/:id/pay").put(orderController.updateOrderToPaid);

orderRouter.get(
    "/get/totalsales",
    authController.protect,
    authController.restrictTo(true),
    orderController.getTotalSales
);
orderRouter.get(
    "/get/count",
    authController.protect,
    authController.restrictTo(true),
    orderController.getNumberOfOrders
);
orderRouter.get("/get/userorders/:id", authController.protect, orderController.getUserOrders);

module.exports = orderRouter;
