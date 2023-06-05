import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  route.get("/", (req, res, next) => {
    const user_id = req.query.user_id;
    pool
      .getConnection()
      .then((conn) => {
        if (req.query.keyword === undefined) {
          conn
            .query(
              "SELECT p.stock_quantity, p.description, p.product_id, p.picture, COALESCE(SUM(CASE WHEN sib.c_uid = ? THEN sib.quantity ELSE 0 END), 0) AS AmountInBasket, p.name, p.price  FROM product p LEFT JOIN store_in_basket sib ON p.product_id = sib.product_id GROUP BY p.product_id",
              [user_id]
            )
            .then((rows) => {
              const res_rows = rows.map((row) => {
                return { ...row, AmountInBasket: Number(row.AmountInBasket) };
              }, rows);
              res.json({ msg: "success", data: res_rows });
            })
            .catch(() =>
              res.status(400).json({ msg: "error getting products" })
            )
            .finally(() => conn.close());
        } else {
          const k = "%" + req.query.keyword + "%"; // yes, we can inject wildcards
          conn
            .query(
              "SELECT p.stock_quantity, p.description, p.product_id, p.picture, COALESCE(SUM(CASE WHEN sib.c_uid = ? THEN sib.quantity ELSE 0 END), 0) AS AmountInBasket, p.name, p.price  FROM product p LEFT JOIN store_in_basket sib ON p.product_id = sib.product_id WHERE p.name LIKE ? OR p.description LIKE ? GROUP BY p.product_id",
              [user_id, k, k]
            )
            .then((rows) => res.json({ msg: "success", data: rows }))
            .catch((err) => {
              res.status(400).json({ msg: "error getting products" });
              console.log(err);
            })
            .finally(() => conn.close());
        }
      })
      .catch(next);
  });

  route.get("/:id", (req, res, next) => {
    const user_id = req.query.user_id !== undefined ? req.query.user_id : -1;
    const product_id = req.params.id;
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "SELECT p.stock_quantity, p.description, p.product_id, p.picture, COALESCE(SUM(CASE WHEN sib.c_uid = ? THEN sib.quantity ELSE 0 END), 0) AS AmountInBasket, p.name, p.price, u.profile_picture, s.store_name, s.store_address, s.store_email  FROM product p LEFT JOIN store_in_basket sib ON p.product_id = sib.product_id JOIN seller s ON p.s_uid = s.user_id JOIN users u ON s.user_id = u.user_id WHERE p.product_id = ? GROUP BY p.product_id",
            [user_id, product_id]
          )
          .then((rows) => {
            if (rows.length > 0) {
              const res_row = {
                ...rows[0],
                AmountInBasket: Number(rows[0].AmountInBasket),
              };
              res.json(res_row);
            } else {
              throw Error();
            }
          })
          .catch(() => res.status(404).json({ msg: "Product not found" }))
          .finally(() => conn.close());
      })
      .catch(next);
  });

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
          });
      })
      .catch(next);
  });
  return route;
};
