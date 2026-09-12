const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema(
    {
        posProductId: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        price: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        _id: false
    }
);

const saleSchema = new mongoose.Schema(
    {
        posSaleId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        posCustomerId: {
            type: String,
            required: true
        },

        items: {
            type: [saleItemSchema],
            required: true
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        paymentMethod: {
            type: String,
            required: true,
            enum: ["CASH", "CARD", "UPI"]
        },

        saleDate: {
            type: Date,
            required: true
        },

        migratedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Sale", saleSchema);