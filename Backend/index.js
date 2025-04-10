const express =  require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();

const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(express.json({limit:"25mb"}));
// app.use(express.urlencoded({limit:"25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin: "https://univaries-ecom-web-frontend.vercel.app/",
    credentials: true,
}))


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
  await mongoose.connect('mongodb+srv://ramwarhekar04:0gqMKc78VaJVkuhC@univaries.0popb.mongodb.net/univaries?retryWrites=true&w=majority&appName=univaries');
 
  app.get("/", (req, res)=> {
      res.send("Hello")
  })
}


app.listen(3000)
