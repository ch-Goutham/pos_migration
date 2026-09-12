const {
    customers,
    products,
    sales
} = require("../mock-pos/mockData");

const getCustomers = async (req, res) => {
    res.status(200).json({
        success: true,
        source: "MOCK_POS",
        count: customers.length,
        data: customers
    });
};

const getProducts = async (req, res) => {
    res.status(200).json({
        success: true,
        source: "MOCK_POS",
        count: products.length,
        data: products
    });
};

const getSales = async (req, res) => {
    res.status(200).json({
        success: true,
        source: "MOCK_POS",
        count: sales.length,
        data: sales
    });
};

const getAllData = async (req, res) => {
    res.status(200).json({
        success: true,
        source: "MOCK_POS",

        summary: {
            customers: customers.length,
            products: products.length,
            sales: sales.length
        },

        data: {
            customers,
            products,
            sales
        }
    });
};

module.exports = {
    getCustomers,
    getProducts,
    getSales,
    getAllData
};