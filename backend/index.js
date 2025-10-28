import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const port = 5050;

mongoose
  .connect(
    "mongodb+srv://rohitthapa_dev:Mindrisers@cluster0.evuswdl.mongodb.net/myEcommerceDB"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("database connect and server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5050"],

    credentials: true,
  })
);

app.use(express.static("uploads"));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

//Using the Extended Parser (qs) library.
// Converts bracket syntax in query strings into actual objects.
// eg., 'rating[gt]': '3' to rating: { gt: '3'}
app.set("query parser", "extended");

app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

// app.get('/numberCheck', (req, res) => {
//   const { n } = req.query
//   const num = Number(n);
//   if (Number.isFinite(num)) {
//     const sq = num * num
//     return res.status(200).json({ square: sq });
//   }
//   return res.status(422).json({ message: 'Invalid Input' })

// });

// app.use('/', (req, res, next) => {
//   const { c } = req.query;
//   if (Number.isNaN(Number(c))) {
//     return res.status(400).json({ message: 'please provide valid number' });
//   }
//   next();
// })

// app.post('/', (req, res) => {
//   const { numbers } = req.body
//   function sumArray(arr) {
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//       sum += arr[i];
//     }
//     return sum;
//   }
//   const total = sumArray(numbers);
//   return res.status(200).json({ sum: total });
// })

// app.get('/', (req, res) => {
//   return res.status(200).json({ message: 'hello' });
// });

// middleware number validate

// const products = [
//   { id: 1, name: 'ram', age: 90 },
//   { id: 2, name: 'sita', age: 70 },
//   { id: 3, name: 'gita', age: 60 },
// ];

// app.use('/product/:id', (req, res, next) => {
//   const c = req.params;
//   if (Number.isNaN(Number(c))) {
//     return res.status(400).json({ message: 'please provide valid id' });
//   }
//   next();
// });

// app.get('/products/:id', (req, res) => {
//   const id = Number(req.params.id)
//   const product = products.find((a) => {
//     return a.id === id

//   });
//   if (product) { return res.status(200).json({ name: product.name }); }
//   return res.status(404).json({ message: 'Product not found' });

// });

// app.listen(port, () => {
//   console.log('server is running');
// });
