const express = require("express");

const {
    migrateData
} = require("../controllers/migrationController");

const router = express.Router();

router.post("/run", migrateData);

module.exports = router;