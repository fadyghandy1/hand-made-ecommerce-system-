const Order = require("../models/Order");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory.js");
const AppError = require("../utils/appError");
const Orderitem = require("../models/Orderitem");

exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.UpdateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.getOneOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
        .populate("user", ["name", "email"])
        .populate({ path: "orderItems", populate: { path: "product", populate: "category" } });

    if (!order) {
        return next(new AppError("The no order with this ID", 500));
    }

    res.status(200).send(order);
});
exports.createOrder = catchAsync(async (req, res, next) => {
    const {
        user,
        orderItems,
        shippingAddressOne,
        shippingAddressTwo,
        city,
        zipCode,
        country,
        phone,
        status,
        totalPrice,
        shippingPrice,
        itemsPrice,
        isPaid,
        paymentMethod,
    } = req.body;
    const orderItemIds = Promise.all(
        orderItems.map(async (orderItem) => {
            let newOrderItem = new Orderitem({ quantity: orderItem.quantity, product: orderItem.product });
            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        })
    );
    const orderItemsIdsResolved = await orderItemIds;

    const newOrder = await Order.create({
        user,
        orderItems: orderItemsIdsResolved,
        shippingAddressOne,
        shippingAddressTwo,
        city,
        zipCode,
        country,
        phone,
        status,
        totalPrice,
        shippingPrice,
        itemsPrice,
        isPaid,
        paymentMethod,
    });

    return res.status(201).json({
        status: "success",
        data: {
            data: newOrder,
        },
    });
});

exports.getTotalSales = catchAsync(async (req, res, next) => {
    const totalSales = await Order.aggregate([{ $group: { _id: null, totalsales: { $sum: "$totalPrice" } } }]);
    if (!totalSales) {
        return next(new AppError("The order Sales Cannot be Generated", 400));
    }
    res.status(200).json({ status: "success", data: { data: totalSales.pop().totalsales } });
});

exports.getNumberOfOrders = catchAsync(async (req, res, next) => {
    const orderCount = await Order.countDocuments();
    if (!orderCount) return next(new AppError("There's No orders yet", 500));

    res.status(200).json({ status: "success", data: { data: orderCount } });
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
    const userOrderList = await Order.find({ user: req.params.id })
        .populate({ path: "orderItems", populate: { path: "product", populate: "category" } })
        .sort({ dateOrdered: -1 });

    if (userOrderList.length == 0) {
        return next(new AppError("There's No orders for this user", 500));
    }

    res.status(200).json({ status: "success", data: { data: userOrderList } });
});

exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
    const order = Order.findById(req.params.id);

    if (!order) {
        return next(new AppError("There's no order with this ID", 400));
    }

    order.isPaid = true;
    order.paidResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
});
