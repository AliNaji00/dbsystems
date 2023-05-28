import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  route.post("/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query(
            "SELECT u.user_id, u.name, NOT ISNULL(s.user_id) AS isSeller, NOT ISNULL(a.user_id) AS isAdmin FROM users u LEFT JOIN seller s ON u.user_id = s.user_id LEFT JOIN admin a ON u.user_id = a.user_id WHERE email = ? AND password = ?",
            [email, password]
          )
          .then((rows) => {
            const user = rows[0]; // throws error if not existing
            let roles = [];
            if (user.isSeller) {
              roles.push("seller");
            }
            if (user.isAdmin) {
              roles.push("admin");
            }
            const loginResponseData = {
              user_id: user.user_id,
              ImageURL: "/img/placeholder.png",
              userroles: roles,
              name: user.name,
            };
            const loginResponse = {
              msg: "success",
              data: loginResponseData,
            };
            res.json(loginResponse);
          })
          .catch(() => res.status(403).json({ msg: "Email or password wrong" }))
          .finally(conn.close());
      })
      .catch(next);
  });

  return route;
};
