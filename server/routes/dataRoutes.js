const express = require("express");

const {
    getCustomers,
    getProducts,
    getSales,
    getMigrationSummary
} = require("../controllers/dataController");

const router = express.Router();

router.get("/customers", getCustomers);

router.get("/products", getProducts);

router.get("/sales", getSales);

router.get("/summary", getMigrationSummary);

module.exports = router;