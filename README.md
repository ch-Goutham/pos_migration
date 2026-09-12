# POS to MongoDB Data Migration - Proof of Concept (POC)

A complete MERN stack backend Proof of Concept (POC) for testing and verifying data migration from an external **POS API** to **our own Database (MongoDB)**.

---

## 🏗️ Architecture

```
[ External POS API ]
  (Simulates POS endpoints: GET /api/pos/items)
         │
         │ 1. Extraction (Fetch POS catalog & stock)
         ▼
[ Migration Pipeline (ETL) ]
   ├── Schema Transformation (POS format -> DB Model)
   └── Atomic High-Performance Bulk Upsert (`bulkWrite`)
         │
         │ 2. Load into Database
         ▼
[ Our Local MongoDB Database ]
         │
         │ 3. Query, Search & Audit
         ▼
[ Local Database APIs & Postman Collection ]
```

---

## 📡 API Endpoints Reference

### 1. External POS API (Source System)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `http://localhost:5000/api/pos/items?page=1&limit=10` | Fetch items from POS API (Paginated) |
| `GET` | `http://localhost:5000/api/pos/items?category=Beverages` | Filter POS items by category |
| `GET` | `http://localhost:5000/api/pos/items?search=Coffee` | Search POS items by keyword, barcode, or SKU |
| `GET` | `http://localhost:5000/api/pos/items/POS-1001` | Get single POS item by ID |

### 2. Migration Pipeline (ETL Engine)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `http://localhost:5000/api/migration/run` | **Triggers data migration** from POS API into MongoDB |
| `DELETE`| `http://localhost:5000/api/migration/reset` | Resets MongoDB records to test fresh migration |

### 3. Our Own Database (Verification & Analytics)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `http://localhost:5000/api/local/items?page=1&limit=10` | List migrated items from MongoDB with pagination |
| `GET` | `http://localhost:5000/api/local/items?search=Sourdough` | Search migrated items in MongoDB |
| `GET` | `http://localhost:5000/api/local/items/POS-1001` | Inspect migrated item details by POS ID or Mongo ID |
| `GET` | `http://localhost:5000/api/local/stats` | View migration statistics, category distribution & inventory valuation |

---

## 🧪 Testing in Postman (Quick Start)

The project includes an importable Postman Collection:
📁 `Zoho_POS_Migration_POC.postman_collection.json`

### Step-by-Step Testing Flow:
1. Open **Postman**.
2. Click **Import** (top left) and choose `Zoho_POS_Migration_POC.postman_collection.json`.
3. Make sure the backend server is running:
   ```bash
   npm run dev
   ```
4. Execute the requests in sequence:
   - **Step 1**: Send `0. System Health Check` (`GET http://localhost:5000/`)
   - **Step 2**: Send `1.1 Fetch All Items from POS API` to view source POS items
   - **Step 3**: Send `2.1 Trigger Migration` (`POST http://localhost:5000/api/migration/run`)
     - *Response will show: `totalExtractedFromPOS`, `totalNewInserted`, `durationMs`*
   - **Step 4**: Send `3.1 List All Migrated Items from MongoDB` to see the migrated data inside your database
   - **Step 5**: Send `3.4 View Migration Analytics & Stock Valuation` to view total units, financial stock value, and category breakdown
   - **Step 6**: Send `2.1 Trigger Migration` again to verify **idempotency** (`totalNewInserted: 0`, `totalUpdatedExisting: 10`, zero duplicates!)
