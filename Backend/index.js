const express =  require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();

const path = require('path')

const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(express.json({limit:"25mb"}));
// app.use(express.urlencoded({limit:"25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const allowedOrigins = [
    "http://localhost:5173",
    // "https://your-frontend-domain.com",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));


// ramwarhekar04 
// 0gqMKc78VaJVkuhC

const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/reviews", reviewRoutes)

main()
    .then(() => console.log('Connected!'))
    .catch(err => console.log(err));

async function main() {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
        throw new Error("DB_URL is not defined in the environment variables.");
    }
    await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app.get("/", (req, res) => {
        res.send("Hello");
    });
}
app.listen(3000);