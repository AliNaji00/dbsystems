import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  route.get("/:id", (req, res) => {
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query("SELECT * FROM Users WHERE ID = ?", req.params.id)
          .then((rows) => {
            res.json(rows[0]);
          })
          .catch(() => res.status(403).end())
          .finally(() => conn.end());
      })
      .catch(() => res.status(500).end());
  });

  route.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "SELECT u.ID, u.Name, NOT ISNULL(s.ID) AS isSeller, NOT ISNULL(b.ID) AS isBuyer FROM Users u LEFT JOIN Seller s ON u.ID = s.ID LEFT JOIN Buyer b ON u.ID = b.ID WHERE Email = ? AND Password = ?",
            [email, password]
          )
          .then((rows) => {
            const user = rows[0]; // throws error if not existing
            let roles = [];
            if (user.isSeller) {
              roles.push("seller");
            }
            if (user.isBuyer) {
              roles.push("buyer");
            }
            const loginResponseData = {
              user_id: user.ID,
              ImageURL: "",
              userroles: roles,
              name: user.Name,
            };
            const loginResponse = {
              msg: "success",
              data: loginResponseData,
            };
            res.json(loginResponse);
          })
          .catch(() =>
            res.status(403).json({ msg: "Email or password wrong" }).end()
          )
          .finally(conn.close());
      })
      .catch(() => res.status(500).end());
  });

  return route;
};
