import { Router } from "express";
import multer from "multer";
import path from "path";

export default ({ pool }) => {
  const route = Router();
  const upload = multer({ storage: multer.memoryStorage() });

  const __dirname = path.resolve(path.dirname(""));

  // post product picture
  route.post(
    "/:product_id/picture",
    upload.single("image"),
    async (req, res, next) => {
      const product_id = req.params.product_id;

      if (req.file === undefined) {
        res.status(400).json({ msg: "Empty file" });
      }
      if (
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpeg"
      ) {
        res.status(400).json({ msg: "Invalid file type" });
        return;
      }

      try {
        const conn = await pool.getConnection();
        try {
          const png = new Uint8Array(
            req.file.mimetype === "image/png" ? [1] : [0]
          );
          const buffer = req.file.buffer;
          const new_buffer = Buffer.concat([buffer, png]);
          const query_res = await conn.query(
            "UPDATE product SET picture = ? WHERE product_id = ?",
            [new_buffer, product_id]
          );
          if (query_res.affectedRows !== 1) {
            throw Error();
          }
          res.status(200).json({ msg: "success" });
        } catch (err) {
          res.status(400).json({
            msg: "Error uploading product picture",
          });
        } finally {
          conn.close();
        }
      } catch (err) {
        next(err);
      }
    }
  );

  // delete product picture
  route.delete("/:product_id/picture", async (req, res, next) => {
    const product_id = req.params.product_id;
    try {
      const conn = await pool.getConnection();
      try {
        const query_res = await conn.query(
          "UPDATE product SET picture = NULL WHERE product_id = ?",
          product_id
        );
        if (query_res.affectedRows < 1) {
          throw Error();
        }
        res.json({ msg: "success" });
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error deleting product picture" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // get product picture
  route.get("/:product_id/picture", async (req, res, next) => {
    const product_id = req.params.product_id;
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query(
          "SELECT picture FROM product WHERE product_id = ?",
          product_id
        );
        if (rows.length < 1) {
          throw Error();
        }
        if (rows.length > 0 && rows[0].picture !== null) {
          const buffer = rows[0].picture;
          const png = buffer[buffer.length - 1];
          const data = rows[0].picture.subarray(0, buffer.length - 1);
          res.contentType(png ? "image/png" : "image/jpeg").send(data);
        } else {
          res
            .contentType("image/png")
            .sendFile(`${__dirname}/img/product_placeholder.png`);
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error getting product picture" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // get all products
  route.get("/", (req, res, next) => {
    const user_id = req.query.user_id === undefined ? -1 : req.query.user_id;
    const seller_id = req.query.seller_id;
    pool
      .getConnection()
      .then((conn) => {
        if (seller_id !== undefined) {
          conn
            .query(
              "SELECT p.stock_quantity, p.description, p.product_id, p.name, p.price FROM product p WHERE p.s_uid = ?",
              seller_id
            )
            .then((rows) => {
              const res_rows = rows.map((row) => {
                return {
                  ...row,
                  AmountInBasket: Number(row.AmountInBasket),
                  ImageURL: "/api/products/" + row.product_id + "/picture",
                };
              });
              res.json({ msg: "success", data: res_rows });
            })
            .catch(() => {
              res
                .status(400)
                .json({ msg: "Error getting products for seller" });
            })
            .finally(() => conn.close());
        } else {
          const keyword =
            req.query.keyword === undefined ? "" : req.query.keyword;
          const k = "%" + keyword + "%"; // yes, we can inject wildcards
          conn
            .query(
              "SELECT p.s_uid, p.stock_quantity, p.description, p.product_id, COALESCE(SUM(CASE WHEN sib.c_uid = ? THEN sib.quantity ELSE 0 END), 0) AS AmountInBasket, p.name, p.price  FROM product p LEFT JOIN store_in_basket sib ON p.product_id = sib.product_id WHERE p.name LIKE ? OR p.description LIKE ? GROUP BY p.product_id",
              [user_id, k, k]
            )
            .then((rows) => {
              const res_rows = rows.map((row) => {
                return {
                  ...row,
                  AmountInBasket: Number(row.AmountInBasket),
                  ImageURL: "/api/products/" + row.product_id + "/picture",
                  SellerImageURL: "/api/users/" + row.s_uid + "/avatar",
                };
              });
              res.json({ msg: "success", data: res_rows });
            })
            .catch((err) => {
              res.status(400).json({ msg: "error getting products" });
              console.log(err);
            })
            .finally(() => conn.close());
        }
      })
      .catch(next);
  });

  // get product by id
  route.get("/:id", (req, res, next) => {
    const user_id = req.query.user_id !== undefined ? req.query.user_id : -1;
    const product_id = req.params.id;
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "SELECT p.s_uid, p.stock_quantity, p.description, p.product_id, COALESCE(SUM(CASE WHEN sib.c_uid = ? THEN sib.quantity ELSE 0 END), 0) AS AmountInBasket, p.name, p.price, s.store_name, s.store_address, s.store_email  FROM product p LEFT JOIN store_in_basket sib ON p.product_id = sib.product_id JOIN seller s ON p.s_uid = s.user_id JOIN users u ON s.user_id = u.user_id WHERE p.product_id = ? GROUP BY p.product_id",
            [user_id, product_id]
          )
          .then((rows) => {
            if (rows.length > 0) {
              const res_row = {
                ...rows[0],
                ImageURL: "/api/products/" + product_id + "/picture",
                AmountInBasket: Number(rows[0].AmountInBasket),
                SellerImageURL: "/api/users/" + rows[0].s_uid + "/avatar",
              };
              res.json({ msg: "success", data: res_row });
            } else {
              throw Error();
            }
          })
          .catch(() => res.status(404).json({ msg: "Product not found" }))
          .finally(() => conn.close());
      })
      .catch(next);
  });

  // create product
  route.post("/", (req, res, next) => {
    const seller_id = req.body.seller_id;
    const stock_quantity = req.body.stock_quantity;
    const price = req.body.price;
    const name = req.body.name;
    const available = req.body.available;
    const description = req.body.description;
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "INSERT INTO product VALUES (DEFAULT, NULL, ?, ?, ?, ?, NULL, ?, ?)",
            [seller_id, stock_quantity, price, name, available, description]
          )
          .then((rows) => {
            console.log(rows);
            res
              .status(201)
              .location("/products/" + rows.insertId)
              .json({ msg: "success" });
          })
          .catch(() => {
            res.status(400).json({ msg: "Error creating product" });
          })
          .finally(() => conn.close());
      })
      .catch(next);
  });

  // update product
  route.put("/:id", (req, res, next) => {
    const product_id = req.params.id;
    const stock_quantity = req.body.stock_quantity;
    const price = req.body.price;
    const name = req.body.name;
    const available = req.body.available;
    const description = req.body.description;
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "UPDATE product SET stock_quantity = ?, price = ?, name = ?, available = ?, description = ? WHERE product_id = ? ",
            [stock_quantity, price, name, available, description, product_id]
          )
          .then((rows) => {
            if (rows.affectedRows > 0) {
              res.status(200).send();
            } else {
              throw new Error("No product with id " + product_id);
            }
            console.log(rows);
            res.status(200).send();
          })
          .catch((err) => {
            console.log(err);
            if (err.text) {
              res.status(400).json({ msg: "Error updating product" });
            } else {
              res.status(400).json({ msg: err.message });
            }
          })
          .finally(() => {
            conn.close();
          });
      })
      .catch(next);
  });
  return route;
};
