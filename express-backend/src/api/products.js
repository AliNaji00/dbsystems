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
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "SELECT * FROM product WHERE product.product_id = ?",
            req.params.id
          )
          .then((rows) => {
            if (rows.length > 0) {
              res.json(rows[0]);
            } else {
              throw Error();
            }
          })
          .catch(() => res.status(404).json({ msg: "Product not found" }))
          .finally(() => conn.close());
      })
      .catch(next);
  });

  return route;
};
