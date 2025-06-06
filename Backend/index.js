const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
    "http://localhost:5173",
    "https://univaries-ecom-web.vercel.app",
    "https://univaries-ecom-web.onrender.com"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}));

app.options('*', cors());

const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.send("Univaries E-commerce API is running");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("DB_URL is not defined in the environment variables.");
        }

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
}

startServer();
