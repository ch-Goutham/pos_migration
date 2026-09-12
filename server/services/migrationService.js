const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Sale = require("../models/Sale");

const {
    customers,
    products,
    sales
} = require("../mock-pos/mockData");

/**
 * Migrate customers
 */
const migrateCustomers = async () => {
    const result = {
        total: customers.length,
        migrated: 0,
        skipped: 0,
        failed: 0,
        errors: []
    };

    for (const customer of customers) {
        try {
            if (
                !customer.posCustomerId ||
                !customer.name ||
                !customer.email
            ) {
                result.failed++;

                result.errors.push({
                    type: "CUSTOMER",
                    id: customer.posCustomerId || "UNKNOWN",
                    reason: "Required fields are missing"
                });

                continue;
            }

            const existingCustomer = await Customer.findOne({
                posCustomerId: customer.posCustomerId
            });

            if (existingCustomer) {
                result.skipped++;
                continue;
            }

            await Customer.create({
                posCustomerId: customer.posCustomerId,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                city: customer.city
            });

            result.migrated++;
        } catch (error) {
            result.failed++;

            result.errors.push({
                type: "CUSTOMER",
                id: customer.posCustomerId,
                reason: error.message
            });
        }
    }

    return result;
};

/**
 * Migrate products
 */
const migrateProducts = async () => {
    const result = {
        total: products.length,
        migrated: 0,
        skipped: 0,
        failed: 0,
        errors: []
    };

    for (const product of products) {
        try {
            if (
                !product.posProductId ||
                !product.name ||
                !product.sku ||
                product.price === undefined
            ) {
                result.failed++;

                result.errors.push({
                    type: "PRODUCT",
                    id: product.posProductId || "UNKNOWN",
                    reason: "Required fields are missing"
                });

                continue;
            }

            const existingProduct = await Product.findOne({
                posProductId: product.posProductId
            });

            if (existingProduct) {
                result.skipped++;
                continue;
            }

            await Product.create({
                posProductId: product.posProductId,
                name: product.name,
                sku: product.sku,
                category: product.category,
                price: product.price,
                stock: product.stock
            });

            result.migrated++;
        } catch (error) {
            result.failed++;

            result.errors.push({
                type: "PRODUCT",
                id: product.posProductId,
                reason: error.message
            });
        }
    }

    return result;
};

/**
 * Migrate sales
 */
const migrateSales = async () => {
    const result = {
        total: sales.length,
        migrated: 0,
        skipped: 0,
        failed: 0,
        errors: []
    };

    for (const sale of sales) {
        try {
            if (
                !sale.posSaleId ||
                !sale.posCustomerId ||
                !sale.items ||
                !sale.totalAmount ||
                !sale.paymentMethod ||
                !sale.saleDate
            ) {
                result.failed++;

                result.errors.push({
                    type: "SALE",
                    id: sale.posSaleId || "UNKNOWN",
                    reason: "Required fields are missing"
                });

                continue;
            }

            const existingSale = await Sale.findOne({
                posSaleId: sale.posSaleId
            });

            if (existingSale) {
                result.skipped++;
                continue;
            }

            await Sale.create({
                posSaleId: sale.posSaleId,
                posCustomerId: sale.posCustomerId,
                items: sale.items,
                totalAmount: sale.totalAmount,
                paymentMethod: sale.paymentMethod,
                saleDate: sale.saleDate
            });

            result.migrated++;
        } catch (error) {
            result.failed++;

            result.errors.push({
                type: "SALE",
                id: sale.posSaleId,
                reason: error.message
            });
        }
    }

    return result;
};

/**
 * Run complete migration
 */
const runMigration = async () => {
    console.log("Starting migration...");

    const startTime = Date.now();

    const customerResult = await migrateCustomers();

    const productResult = await migrateProducts();

    const saleResult = await migrateSales();

    const endTime = Date.now();

    const duration = endTime - startTime;

    return {
        customers: customerResult,
        products: productResult,
        sales: saleResult,

        durationMs: duration
    };
};

module.exports = {
    runMigration
};