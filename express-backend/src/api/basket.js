import { Router } from "express";

export default ({ pool }) => {
  const router = Router();

  router.get("/:user_id", (req, res, next) => {
    const user_id = req.params.user_id;
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "SELECT p.stock_quantity, p.description, p.product_id, p.picture, sib.quantity, p.name, p.price FROM product p JOIN store_in_basket sib ON p.product_id = sib.product_id WHERE sib.c_uid = ?",
            user_id
          )
          .then((rows) => {
            if (rows.length > 0) {
              res.json({ msg: "success", data: rows });
            } else {
              res.json({ msg: "success", data: [] });
            }
          })
          .finally(() => conn.close());
      })
      .catch(next);
  });

  router.put("/:user_id", (req, res, next) => {
    const user_id = req.params.user_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    pool
      .getConnection()
      .then((conn) => {
        if (quantity <= 0) {
          conn
            .query(
              "DELETE FROM store_in_basket WHERE c_uid = ? AND product_id = ?",
              [user_id, product_id]
            )
            .then(() => {
              res.status(204).json({ msg: "success" });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ msg: "Invalid request" });
            })
            .finally(() => conn.close());
        } else {
          conn
            .query("REPLACE INTO store_in_basket VALUES (?, ?, ?)", [
              user_id,
              product_id,
              quantity,
            ])
            .then(() => {
              res.json({ msg: "success" }).status(204).end();
            })
            .catch((err) => {
              console.log(err);
              res
                .status(404)
                .json({ msg: "customer or product does not exist" });
            })
            .finally(() => conn.close());
        }
      })
      .catch(next);
  });

  return router;
};
