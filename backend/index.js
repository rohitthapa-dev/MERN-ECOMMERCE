import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://mern-ecommerce-yc64.onrender.com", // backend
      "https://mernecommerce-website.vercel.app", // frontend
    ],
    credentials: true,
  })
);

app.use(express.static("uploads"));

app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

app.set("query parser", "extended");

app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
