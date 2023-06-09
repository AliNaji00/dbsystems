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
          const query_res = await conn.query(
            "UPDATE users SET profile_picture = ? WHERE user_id = ?",
            [new_buffer, user_id]
          );
          if (query_res.affectedRows !== 1) {
            throw Error();
          }
          res.status(200).json({ msg: "success" });
        } catch (err) {
          res.status(400).json({
            msg: "Error uploading profile picture",
          });
        } finally {
          conn.close();
        }
      } catch (err) {
        next(err);
      }
    }
  );

  // delete avatar
  route.delete("/:user_id/avatar", async (req, res, next) => {
    const user_id = req.params.user_id;
    try {
      const conn = await pool.getConnection();
      try {
        const query_res = await conn.query(
          "UPDATE users SET profile_picture = NULL WHERE user_id = ?",
          user_id
        );
        if (query_res.affectedRows < 1) {
          throw Error();
        }
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
        if (rows.length < 1) {
          throw Error();
        }
        if (rows[0].profile_picture !== null) {
          const buffer = rows[0].profile_picture;
          const png = buffer[buffer.length - 1];
          const data = rows[0].profile_picture.subarray(0, buffer.length - 1);
          res.contentType(png ? "image/png" : "image/jpeg").send(data);
        } else {
          res
            .contentType("image/png")
            .sendFile(`${__dirname}/img/user_placeholder.png`);
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error getting profile picture" });
      } finally {
        conn.close();
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
          "SELECT u.user_id, u.name, u.email, u.address, u.password, NOT ISNULL(s.user_id) AS isSeller FROM users u LEFT JOIN seller s ON u.user_id = s.user_id WHERE u.user_id = ?",
          user_id
        );
        if (!(rows.length > 0)) {
          res.status(404).json({ msg: "No user found with id " + user_id });
          return;
        }
        const { isSeller, ...user } = rows[0];
        if (isSeller) {
          const seller_details = await conn.query(
            "SELECT store_name, store_address, phone_no, store_email FROM seller WHERE user_id = ?",
            user_id
          );
          res.json({
            msg: "success",
            data: {
              ...user,
              ImageURL: "/api/users/" + user_id + "/avatar",
              seller_details: seller_details[0],
            },
          });
        } else {
          res.json({
            msg: "success",
            data: {
              ...user,
              ImageURL: "/api/users/" + user_id + "/avatar",
            },
          });
        }
      } catch (err) {
        res.status(400).json({ msg: "Error getting user details" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // get all users
  route.get("/", async (req, res, next) => {
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query(
          "SELECT u.user_id, u.name, u.email, u.password, u.address, NOT ISNULL(s.user_id) AS isSeller, NOT ISNULL(a.user_id) AS isAdmin, NOT ISNULL(c.user_id) AS isCustomer FROM users u LEFT JOIN customer c ON u.user_id = c.user_id LEFT JOIN seller s ON u.user_id = s.user_id LEFT JOIN admin a ON u.user_id = a.user_id"
        );
        const users = rows.map((user) => {
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
          return {
            user_id: user.user_id,
            ImageURL: "/api/users/" + user.user_id + "/avatar",
            userroles: roles,
            name: user.name,
            email: user.email,
            password: user.password,
            address: user.address,
          };
        });
        res.json({ msg: "success", data: users });
      } catch (err) {
        res.status(400).json({ msg: "Error getting all users" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // post user, this creates an new user with customer role
  route.post("/", async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    try {
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        const rows = await conn.query(
          "INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, NULL)",
          [name, email, password, address]
        );
        const user_id = rows.insertId;
        await conn.query("INSERT INTO customer VALUES (?)", user_id);
        await conn.commit();
        res
          .status(201)
          .location("/users/" + user_id)
          .json({ msg: "success", data: { user_id: String(user_id) } });
      } catch (err) {
        conn.rollback();
        res.status(400).json({ msg: "Error creating user" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // put user, if user_type is not set the default user details are updated
  // if user_type is "admin", the user is added to the admin group, the other user details are not needed
  // if user_type is "seller", the user is added to the seller group, you have to include the seller details, the other user details are not needed
  route.put("/:user_id", async (req, res, next) => {
    const user_id = req.params.user_id;
    const user_type = req.body.user_type;
    try {
      const conn = await pool.getConnection();
      try {
        if (user_type === "seller") {
          const store_name = req.body.store_name;
          const store_address = req.body.store_address;
          const phone_no = req.body.phone_no;
          const store_email = req.body.store_email;
          await conn.query(
            "INSERT INTO seller (user_id, store_name, store_address, phone_no, store_email) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE store_name = ?, store_address = ?, phone_no = ?, store_email = ?",
            [
              user_id,
              store_name,
              store_address,
              phone_no,
              store_email,
              store_name,
              store_address,
              phone_no,
              store_email,
            ]
          );
        } else if (user_type === "admin") {
          await conn.query(
            "INSERT INTO admin (user_id) VALUES (?) ON DUPLICATE KEY UPDATE user_id=user_id",
            user_id
          );
        } else {
          const name = req.body.name;
          const email = req.body.email;
          const password = req.body.password;
          const address = req.body.address;
          await conn.query(
            "UPDATE users SET name = ?, email = ?, password = ?, address = ? WHERE user_id = ?",
            [name, email, password, address, user_id]
          );
        }
        res.json({ msg: "success" });
      } catch (err) {
        conn.rollback();
        console.log(err);
        res.status(400).json({ msg: "Error updating user" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  return route;
};
