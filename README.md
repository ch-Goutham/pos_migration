# POS to MongoDB Migration - Proof of Concept (POC)

A Node.js/Express backend Proof of Concept for migrating data from an external **POS system** into our own **MongoDB** database. The POS source is simulated with in-memory mock data so the full migration pipeline can be tested end-to-end without a real POS integration.

---

## Tech Stack

- **Node.js** + **Express 5**
- **MongoDB** with **Mongoose 9** (ODM)
- **Axios** (HTTP client, ready for real POS API integration)
- **Nodemon** (dev auto-reload)

---

## Architecture

```
[ Mock POS API (Source) ]
   Simulated POS endpoints serving customers, products & sales
              │
              │ 1. Extract - mocked in-memory data
              ▼
[ Migration Service (ETL) ]
   Schema transformation (POS format -> Mongo Models)
   Upload with duplicate detection on pos IDs
              │
              │ 2. Load
              ▼
[ MongoDB Database ]
   Collections: customers, products, sales
              │
              │ 3. Query, Search & Audit
              ▼
[ Local Data APIs & Postman Collection ]
```

Data is migrated entity-by-entity. Each record is checked against the target
collection by its `pos<Entity>Id`, so re-running the migration **skips** records
that already exist (idempotent-with-skips):

- `Customer` -> checked against `posCustomerId`
- `Product`  -> checked against `posProductId`
- `Sale`     -> checked against `posSaleId`

---

## Project Structure

```
pos_migration/
├── server/
│   ├── server.js                 # Express app entry point
│   ├── config/db.js              # MongoDB connection
│   ├── mock-pos/mockData.js      # Simulated POS source data
│   ├── routes/
│   │   ├── mockPosRoutes.js      # Source POS endpoints
│   │   ├── migrationRoutes.js    # ETL pipeline endpoint
│   │   └── dataRoutes.js         # Migrated data endpoints
│   ├── controllers/
│   │   ├── mockPosController.js
│   │   ├── migrationController.js
│   │   └── dataController.js
│   ├── services/
│   │   ├── mockPosService.js
│   │   └── migrationService.js   # CORE ETL logic
│   └── models/
│       ├── Customer.js
│       ├── Product.js
│       └── Sale.js
├── Zoho_POS_Migration_POC.postman_collection.json
├── .env                          # PORT & MONGODB_URI
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js (>= 18)
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a remote URI

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env from the template below
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/pos_migration_poc

# 3. Start the server (development - auto reload)
npm run dev

# or production
npm start
```

Server runs at `http://localhost:5000`. A health check is available at `GET /`.

---

## API Endpoints

### 1. Mock POS API (Source System)

| Method | Endpoint                       | Description                       |
| :----- | :----------------------------- | :-------------------------------- |
| `GET`  | `/api/mock-pos/customers`      | Fetch POS customers               |
| `GET`  | `/api/mock-pos/products`       | Fetch POS products                |
| `GET`  | `/api/mock-pos/sales`          | Fetch POS sales                   |
| `GET`  | `/api/mock-pos/all`            | Fetch all POS data with summary   |

All responses include `success: true`, `source: "MOCK_POS"`, and a `count` of records.

### 2. Migration Pipeline (ETL)

| Method | Endpoint            | Description                                          |
| :----- | :------------------ | :--------------------------------------------------- |
| `POST` | `/api/migration/run`| Migrates all POS data into MongoDB                   |

Response contains a `summary` (`totalRecords`, `migrated`, `skipped`, `failed`)
plus a per-entity `details` breakdown (`total`, `migrated`, `skipped`, `failed`) and
the total `durationMs`. Records missing required fields are counted as `failed` and
logged in `details.<entity>.errors`.

### 3. Migrated Data (MongoDB Verification)

| Method | Endpoint              | Description                                  |
| :----- | :-------------------- | :------------------------------------------- |
| `GET`  | `/api/data/customers` | List migrated customers                      |
| `GET`  | `/api/data/products`  | List migrated products                       |
| `GET`  | `/api/data/sales`     | List migrated sales                          |
| `GET`  | `/api/data/summary`   | Record counts per collection + total records |

---

## Data Models

**Customer** - `posCustomerId` (unique), `name`, `email`, `phone`, `city`, `migratedAt`

**Product** - `posProductId` (unique), `name`, `sku` (unique), `category`, `price`, `stock`, `migratedAt`

**Sale** - `posSaleId` (unique), `posCustomerId`, `items[]` (`posProductId`, `quantity`, `price`), `totalAmount`, `paymentMethod` (`CASH` | `CARD` | `UPI`), `saleDate`, `migratedAt`

Each model also has automatic `createdAt` / `updatedAt` timestamps.

---

## Testing with Postman

An importable collection is included: `Zoho_POS_Migration_POC.postman_collection.json`

1. Open **Postman** and **Import** the collection file.
2. It defines a `baseUrl` variable set to `http://localhost:5000`.
3. Start the backend (`npm run dev`) and run the requests in order:

   - **1. Health Check** - `GET /` -> confirm API is running.
   - **2. Mock POS** - browse the simulated source data
     (`/api/mock-pos/customers`, `/products`, `/sales`, `/all`).
   - **3. Migration: Run Migration - First Run** - `POST /api/migration/run`
     -> expect `migrated` === total records.
   - **3. Migration: Run Migration - Duplicate Test** - run it again
     -> expect `migrated: 0`, `skipped` === total records (proves deduplication / idempotency).
   - **4. MongoDB Verification** - confirm migrated data via
     `/api/data/customers`, `/api/data/products`, `/api/data/sales`, and
     `/api/data/summary`.

> Note: Mock data intentionally includes one customer record with a
> `customerId` field instead of `posCustomerId`; it is counted as `failed`
> during migration to demonstrate error handling.