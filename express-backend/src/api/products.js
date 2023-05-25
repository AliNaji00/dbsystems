import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  route.get("/", (req, res) => {
    pool
      .getConnection()
      .then((conn) => {
        if (req.query.keyword === undefined) {
          conn
            .query("SELECT * FROM Products")
            .then((rows) => res.json({ msg: "success", data: rows }))
            .catch(() => res.status(403).json({ msg: "error getting products " }).end())
            .finally(() => conn.close());
        } else {
          const k = "%" + req.query.keyword + "%"; // yes, we can inject wildcards
          conn
            .query(
              "SELECT * FROM Products WHERE Name LIKE ? OR Description LIKE ?",
              [k, k]
            )
            .then((rows) => res.json({ msg: "success", data: rows }))
            .catch(() => res.status(403).json({msg: "error getting products"}).end())
            .finally(() => conn.close());
        }
      })
      .catch(() => res.status(500).end());
  });

  route.get("/:id", (req, res) => {
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query("SELECT * FROM Products WHERE ID = ?", req.params.id)
          .then((rows) => res.json(rows[0]))
          .catch(() => res.status(403).end())
          .finally(() => conn.close());
      })
      .catch(() => res.status(500).end());
  });

  route.post("/", (req, res) => {
    res.json(req.body.abc);
  });
  return route;
};
