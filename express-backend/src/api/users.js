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

  route.post("/", async (req, res, next) => {
    const user_type = req.body.user_type;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    try {
      const conn = await pool.getConnection();
      await conn.beginTransaction();
      try {
        const rows = await conn.query(
          "INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, NULL)",
          [name, email, password, address]
        );
        const user_id = rows.insertId;
        if (user_type === "seller") {
          const store_name = req.body.store_name;
          const store_address = req.body.store_address;
          const phone_no = req.body.phone_no;
          const store_email = req.body.store_email;
          await conn.query("INSERT INTO seller VALUES (?, ?, ?, ?, ?)", [
            user_id,
            store_name,
            store_address,
            phone_no,
            store_email,
          ]);
        }
        await conn.commit();
        res
          .status(201)
          .location("/users/" + user_id)
          .send();
      } catch (err) {
        conn.rollback();
        console.log(err);
        res
          .status(400)
          .json({ msg: "error creating user: " + err.text.split("\n")[0] });
      }
      conn.close();
    } catch (err) {
      next(err);
    }
  });

  route.put("/:user_id", async (req, res, next) => {
    const user_id = req.params.user_id;
    console.log(user_id);
    // if user_type is not "seller", we can still update the "users" entry of a seller
    const user_type = req.body.user_type;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    try {
      const conn = await pool.getConnection();
      await conn.beginTransaction();
      try {
        await conn.query(
          "UPDATE users SET name = ?, email = ?, password = ?, address = ? WHERE user_id = ?",
          [name, email, password, address, user_id]
        );
        if (user_type === "seller") {
          const store_name = req.body.store_name;
          const store_address = req.body.store_address;
          const phone_no = req.body.phone_no;
          const store_email = req.body.store_email;
          await conn.query(
            "UPDATE seller SET store_name = ?, store_address = ?, phone_no = ?, store_email = ? WHERE user_id = ?",
            [store_name, store_address, phone_no, store_email, user_id]
          );
        }
        await conn.commit();
        res.status(200).send();
      } catch (err) {
        conn.rollback();
        console.log(err);
        res
          .status(400)
          .json({ msg: "error updating user: " + err.text.split("\n")[0] });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  return route;
};
