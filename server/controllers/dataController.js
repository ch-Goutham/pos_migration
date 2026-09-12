const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Sale = require("../models/Sale");

const getCustomers = async (req, res) => {
    try {
        const data = await Customer.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const data = await Product.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSales = async (req, res) => {
    try {
        const data = await Sale.find().sort({
            saleDate: -1
        });

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMigrationSummary = async (req, res) => {
    try {
        const customers = await Customer.countDocuments();
        const products = await Product.countDocuments();
        const sales = await Sale.countDocuments();

        res.status(200).json({
            success: true,

            database: "MongoDB",

            collections: {
                customers,
                products,
                sales
            },

            totalRecords: customers + products + sales
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getCustomers,
    getProducts,
    getSales,
    getMigrationSummary
};