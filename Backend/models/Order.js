const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderItem",
                required: true,
            },
        ],

        shippingAddressOne: {
            type: String,
            required: true,
        },

        shippingAddressTwo: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
        },

        country: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "Pending",
        },
        totalPrice: {
            type: Number,
        },
        shippingPrice: {
            type: Number,
            default: 0,
        },
        itemsPrice: {
            type: Number,
            default: 0,
        },
        paymentMethod: {
            type: String,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
    },
    { timestamps: true }
);

OrderSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

OrderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Order", OrderSchema);
