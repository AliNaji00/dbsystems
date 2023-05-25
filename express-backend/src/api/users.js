import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  route.get("/:id", (req, res) => {
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query("SELECT Name, Email FROM Users WHERE ID = ?", req.params.id)
          .then((rows) => {
            res.json(rows[0]);
          })
          .catch(() => res.status(403).end())
          .finally(() => conn.end());
      })
      .catch(() => res.status(500).end());
  });

  route.post("/", (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    const name = req.body.Name;
    const birthday = req.body.Birthday;
    const phone = req.body.Phone_No;
    const gender = req.body.Gender;
    pool
      .getConnection()
      .then((conn) => {
        conn
          .query("INSERT INTO Users VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", [
            email,
            password,
            name,
            birthday,
            phone,
            gender,
          ])
          .then((rows) => {
            res.status(201).location("users" + rows[0].ID);
          })
          .catch((err) => {
            res.status(403).end();
            console.log(err);
          })
          .finally(() => conn.end());
      })
      .catch(() => res.status(500).end());
  });

  return route;
};
