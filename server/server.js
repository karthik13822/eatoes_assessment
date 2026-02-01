require('dotenv').config();
console.log("MONGO URI:", process.env.MONGODB_URI);
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app=express();
app.use(express.json());
app.use(cors());
const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));
app.use("/api/menu",menuRoutes);
app.use("/api/orders",orderRoutes);
app.listen(port,()=>console.log(`Server running on port ${port}`));
