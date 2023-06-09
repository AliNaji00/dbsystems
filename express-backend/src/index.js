import express, { json } from "express";
import cors from "cors";
import { createPool } from "mariadb";
import user from "./api/user.js";
import users from "./api/users.js";
import products from "./api/products.js";
import basket from "./api/basket.js";
import orders from "./api/orders.js";
import coupons from "./api/coupons.js";
import statistics from "./api/statistics.js";

const port = 8080;
const pool = createPool({
  host: "localhost",
  user: "admin",
  password: "test",
  database: "eshop",
  connectionLimit: 5,
});

const app = express();

// Same headers as PHP example
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["X-Requested-With", "Content-Type", "Accept", "Cookie"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options(cors(corsOptions));
app.use(json());
app.set("env", "production");
app.set("json escape", true);

app.use((err, req, res, next) => {
  res.status(400).json({ msg: "Invalid request" });
});

const router = express.Router();

router.use("/img", express.static("img"));
router.use("/user", user({ pool }));
router.use("/users", users({ pool }));
router.use("/products", products({ pool }));
router.use("/basket", basket({ pool }));
router.use("/orders", orders({ pool }));
router.use("/coupons", coupons({ pool }));
router.use("/statistics", statistics({ pool }));

app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
