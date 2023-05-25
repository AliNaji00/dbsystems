import express, { json } from "express";
import cors from "cors";
import { createPool } from "mariadb";
import user from "./api/user.js";
import users from "./api/users.js"
import products from "./api/products.js";

const port = 3000;
const pool = createPool({
  host: "localhost",
  user: "admin",
  password: "test",
  database: "bssdb",
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

app.use("/user", user({ pool }));
app.use("/users", users({pool}))
app.use("/products", products({ pool }));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
