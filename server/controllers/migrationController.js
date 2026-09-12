const {
    runMigration
} = require("../services/migrationService");

const migrateData = async (req, res) => {
    try {
        const result = await runMigration();

        const total =
            result.customers.total +
            result.products.total +
            result.sales.total;

        const migrated =
            result.customers.migrated +
            result.products.migrated +
            result.sales.migrated;

        const skipped =
            result.customers.skipped +
            result.products.skipped +
            result.sales.skipped;

        const failed =
            result.customers.failed +
            result.products.failed +
            result.sales.failed;

        res.status(200).json({
            success: true,

            message: "POS data migration completed",

            summary: {
                totalRecords: total,
                migrated,
                skipped,
                failed
            },

            durationMs: result.durationMs,

            details: {
                customers: result.customers,
                products: result.products,
                sales: result.sales
            }
        });
    } catch (error) {
        console.error("Migration failed:", error);

        res.status(500).json({
            success: false,
            message: "Migration failed",
            error: error.message
        });
    }
};

module.exports = {
    migrateData
};