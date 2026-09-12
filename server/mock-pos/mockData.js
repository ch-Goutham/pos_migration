const customers = [
    {
        posCustomerId: "POS-CUST-001",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543210",
        city: "Hyderabad"
    },
    {
        posCustomerId: "POS-CUST-002",
        name: "Priya Reddy",
        email: "priya@example.com",
        phone: "9876543211",
        city: "Hyderabad"
    },
    {
        posCustomerId: "POS-CUST-003",
        name: "Arjun Kumar",
        email: "arjun@example.com",
        phone: "9876543212",
        city: "Bangalore"
    },
    {
        posCustomerId: "POS-CUST-004",
        name: "Sneha Rao",
        email: "sneha@example.com",
        phone: "9876543213",
        city: "Chennai"
    },
    {
        posCustomerId: "POS-CUST-005",
        name: "Vikram Singh",
        email: "vikram@example.com",
        phone: "9876543214",
        city: "Mumbai"
    },
    {
        customerId: "POS-CUST-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210"
    }

];

const products = [
    {
        posProductId: "POS-PROD-001",
        name: "Laptop",
        sku: "LAP-001",
        category: "Electronics",
        price: 65000,
        stock: 20
    },
    {
        posProductId: "POS-PROD-002",
        name: "Wireless Mouse",
        sku: "MOU-001",
        category: "Accessories",
        price: 1200,
        stock: 100
    },
    {
        posProductId: "POS-PROD-003",
        name: "Keyboard",
        sku: "KEY-001",
        category: "Accessories",
        price: 2500,
        stock: 80
    },
    {
        posProductId: "POS-PROD-004",
        name: "Monitor",
        sku: "MON-001",
        category: "Electronics",
        price: 15000,
        stock: 30
    },
    {
        posProductId: "POS-PROD-005",
        name: "USB Cable",
        sku: "USB-001",
        category: "Accessories",
        price: 500,
        stock: 200
    },
    {
        posProductId: "POS-PROD-006",
        name: "Headphones",
        sku: "HEAD-001",
        category: "Audio",
        price: 3500,
        stock: 50
    },
    {
        posProductId: "POS-PROD-007",
        name: "Webcam",
        sku: "WEB-001",
        category: "Electronics",
        price: 4500,
        stock: 40
    },
    {
        posProductId: "POS-PROD-008",
        name: "Printer",
        sku: "PRINT-001",
        category: "Office",
        price: 12000,
        stock: 15

    }
];

const sales = [
    {
        posSaleId: "POS-SALE-001",
        posCustomerId: "POS-CUST-001",
        items: [
            {
                posProductId: "POS-PROD-001",
                quantity: 1,
                price: 65000
            },
            {
                posProductId: "POS-PROD-002",
                quantity: 1,
                price: 1200
            }
        ],
        totalAmount: 66200,
        paymentMethod: "CARD",
        saleDate: "2026-09-01T10:30:00.000Z"
    },
    {
        posSaleId: "POS-SALE-002",
        posCustomerId: "POS-CUST-002",
        items: [
            {
                posProductId: "POS-PROD-003",
                quantity: 2,
                price: 2500
            }
        ],
        totalAmount: 5000,
        paymentMethod: "UPI",
        saleDate: "2026-09-02T11:15:00.000Z"
    },
    {
        posSaleId: "POS-SALE-003",
        posCustomerId: "POS-CUST-003",
        items: [
            {
                posProductId: "POS-PROD-004",
                quantity: 1,
                price: 15000
            },
            {
                posProductId: "POS-PROD-005",
                quantity: 2,
                price: 500
            }
        ],
        totalAmount: 16000,
        paymentMethod: "CASH",
        saleDate: "2026-09-03T12:00:00.000Z"
    },
    {
        posSaleId: "POS-SALE-004",
        posCustomerId: "POS-CUST-004",
        items: [
            {
                posProductId: "POS-PROD-006",
                quantity: 1,
                price: 3500
            }
        ],
        totalAmount: 3500,
        paymentMethod: "CARD",
        saleDate: "2026-09-04T13:45:00.000Z"
    },
    {
        posSaleId: "POS-SALE-005",
        posCustomerId: "POS-CUST-005",
        items: [
            {
                posProductId: "POS-PROD-007",
                quantity: 1,
                price: 4500
            }
        ],
        totalAmount: 4500,
        paymentMethod: "UPI",
        saleDate: "2026-09-05T14:20:00.000Z"
    },
    {
        posSaleId: "POS-SALE-006",
        posCustomerId: "POS-CUST-001",
        items: [
            {
                posProductId: "POS-PROD-008",
                quantity: 1,
                price: 12000
            }
        ],
        totalAmount: 12000,
        paymentMethod: "CARD",
        saleDate: "2026-09-06T15:10:00.000Z"
    }
];

module.exports = {
    customers,
    products,
    sales
};