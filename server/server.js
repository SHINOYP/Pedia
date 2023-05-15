require("dotenv").config();
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

//database Config
connectDB();

//rest obj
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcon to e commerce</h1>");
});

//PORT
const PORT = process.env.PORT || 8000;

//run listern
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.bgBlack);
});
