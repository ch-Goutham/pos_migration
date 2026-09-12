const express = require("express");

const {
    getCustomers,
    getProducts,
    getSales,
    getAllData
} = require("../controllers/mockPosController");

const router = express.Router();

router.get("/customers", getCustomers);

router.get("/products", getProducts);

router.get("/sales", getSales);

router.get("/all", getAllData);

module.exports = router;