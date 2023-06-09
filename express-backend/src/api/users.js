import { Router } from "express";
import multer from "multer";
import path from "path";

export default ({ pool }) => {
  const route = Router();
  const upload = multer({ storage: multer.memoryStorage() });

  const __dirname = path.resolve(path.dirname(""));

  // post avatar
  route.post(
    "/:user_id/avatar",
    upload.single("image"),
    async (req, res, next) => {
      const user_id = req.params.user_id;

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
          conn.query("UPDATE users SET profile_picture = ? WHERE user_id = ?", [
            new_buffer,
            user_id,
          ]);
          res.status(200).json({ msg: "success" });
        } catch (err) {
          res.status(400).json({
            msg: "Error uploading profile picture",
          });
        }
      } catch (err) {
        next(err);
      }
      res.status(200).send();
    }
  );

  // delete avatar
  route.delete("/:user_id/avatar", async (req, res, next) => {
    const user_id = req.params.user_id;
    try {
      const conn = await pool.getConnection();
      try {
        await conn.query(
          "UPDATE users SET profile_picture = NULL WHERE user_id = ?",
          user_id
        );
        res.json({ msg: "success" });
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error deleting profile picture" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // get avatar
  route.get("/:user_id/avatar", async (req, res, next) => {
    const user_id = req.params.user_id;
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query(
          "SELECT profile_picture FROM users WHERE user_id = ?",
          user_id
        );
        if (rows.length > 0 && rows[0].profile_picture !== null) {
          const buffer = rows[0].profile_picture;
          const png = buffer[buffer.length - 1];
          const data = rows[0].profile_picture.subarray(0, buffer.length - 1);
          res.contentType(png ? "image/png" : "image/jpeg").send(data);
        } else {
          res
            .contentType("image/png")
            .sendFile(`${__dirname}/img/placeholder.png`);
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error getting profile picture" });
      }
    } catch (err) {
      next(err);
    }
  });

  // get user
  route.get("/:user_id", async (req, res, next) => {
    const user_id = req.params.user_id;
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query(
          "SELECT u.user_id, u.name, NOT ISNULL(s.user_id) AS isSeller, NOT ISNULL(a.user_id) AS isAdmin, NOT ISNULL(c.user_id) AS isCustomer FROM users u LEFT JOIN customer c ON u.user_id = c.user_id LEFT JOIN seller s ON u.user_id = s.user_id LEFT JOIN admin a ON u.user_id = a.user_id WHERE u.user_id = ?",
          user_id
        );
        if (!(rows.length > 0)) {
          res.status(404).json({ msg: "No user found with id " + user_id });
          return;
        }
        const user = rows[0];
        let roles = [];
        if (user.isSeller) {
          roles.push("seller");
        }
        if (user.isAdmin) {
          roles.push("admin");
        }
        if (user.isCustomer) {
          roles.push("customer");
        }
        res.json({
          msg: "success",
          data: {
            ...user,
            ImageURL: "/api/users/" + user_id + "/avatar",
            userroles: roles,
          },
        });
      } catch (err) {
        console.log(err);
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // post user
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
        } else {
          await conn.query("INSERT INTO customer VALUES (?)", user_id);
        }
        await conn.commit();
        res
          .status(201)
          .location("/users/" + user_id)
          .send();
      } catch (err) {
        conn.rollback();
        console.log(err);
        res.status(400).json({ msg: "Error creating user" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // put user
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
          .json({ msg: "Error updating user: " + err.text.split("\n")[0] });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  return route;
};
