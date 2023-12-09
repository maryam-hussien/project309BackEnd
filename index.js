const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutrs");
const ItemRouters = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const CartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewsRoutes");
const searchRoutes = require("./controllers/searchController")
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRoutes);
app.use("/item", ItemRouters);
app.use("/order", orderRoutes);
app.use("/cart", CartRoutes);
app.use("/details", reviewRoutes);

app.listen(port, () => console.log(`nodejs server started on port ${port}`));
