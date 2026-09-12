const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const mockPosRoutes = require("./routes/mockPosRoutes");
const migrationRoutes = require("./routes/migrationRoutes");
const dataRoutes = require("./routes/dataRoutes");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "POS Migration PoC API is running"
    });
});

/*
|--------------------------------------------------------------------------
| Mock POS APIs
|--------------------------------------------------------------------------
*/

app.use("/api/mock-pos", mockPosRoutes);

/*
|--------------------------------------------------------------------------
| Migration APIs
|--------------------------------------------------------------------------
*/

app.use("/api/migration", migrationRoutes);

/*
|--------------------------------------------------------------------------
| MongoDB Data APIs
|--------------------------------------------------------------------------
*/

app.use("/api/data", dataRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use((error, req, res, next) => {
    console.error(error);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});