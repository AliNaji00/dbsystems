import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  route.get("/:id", (req, res, next) => {
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "SELECT name, email FROM users WHERE user_id = ?",
            req.params.id
          )
          .then((rows) => {
            if (rows.length > 0) {
              res.json(rows[0]);
            } else {
              throw Error();
            }
          })
          .catch(() => res.status(404).end())
          .finally(() => conn.end());
      })
      .catch(next);
  });

  return route;
};
