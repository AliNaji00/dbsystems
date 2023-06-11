import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  // get coupon by id
  route.get("/:coupon_code", async (req, res, next) => {
    const coupon_code = req.params.coupon_code;
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query(
          "SELECT c.code, c.description, c.coupon_type, c.start_time, c.end_time, se.percentage AS se_percentage, sp.threshold, sc.percentage AS sc_percentage FROM coupon c LEFT JOIN seasonal_coupon sc ON c.code = sc.code LEFT JOIN special_event se ON c.code = se.code LEFT JOIN shipping_coupon sp ON c.code = sp.code WHERE c.code = ?",
          coupon_code
        );
        const {
          threshold,
          coupon_type,
          se_percentage,
          sc_percentage,
          ...rest
        } = rows[0];

        const coupon = () => {
          if (coupon_type === "seasonal") {
            return {
              ...rest,
              coupon_type: coupon_type,
              percentage: Number(sc_percentage),
            };
          } else if (coupon_type === "special_event") {
            return {
              ...rest,
              coupon_type: coupon_type,
              percentage: Number(se_percentage),
            };
          } else {
            return {
              ...rest,
              treshold: Number(threshold),
              coupon_type: coupon_type,
            };
          }
        };
        res.json({ data: coupon() });
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error getting coupon" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // get all coupons, pass seller_id to filter by seller
  route.get("/", async (req, res, next) => {
    const seller_id = req.query.seller_id;
    try {
      const conn = await pool.getConnection();
      try {
        const rows = await conn.query(
          "SELECT c.code, c.description, c.coupon_type, c.start_time, c.end_time, se.percentage AS se_percentage, sp.threshold, sc.percentage AS sc_percentage FROM coupon c LEFT JOIN seasonal_coupon sc ON c.code = sc.code LEFT JOIN special_event se ON c.code = se.code LEFT JOIN shipping_coupon sp ON c.code = sp.code WHERE s_uid = ?",
          seller_id
        );
        const coupons = rows.map((c) => {
          const {
            threshold,
            coupon_type,
            se_percentage,
            sc_percentage,
            ...rest
          } = c;

          const coupon = () => {
            if (coupon_type === "seasonal") {
              return {
                ...rest,
                coupon_type: coupon_type,
                percentage: Number(sc_percentage),
              };
            } else if (coupon_type === "special_event") {
              return {
                ...rest,
                coupon_type: coupon_type,
                percentage: Number(se_percentage),
              };
            } else {
              return {
                ...rest,
                treshold: Number(threshold),
                coupon_type: coupon_type,
              };
            }
          };
          return coupon();
        });
        res.json({ data: coupons });
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error getting coupon" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  // post coupon
  route.post("/", async (req, res, next) => {
    const description = req.body.description;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const coupon_type = req.body.coupon_type;
    const seller_id = req.body.seller_id;
    const percentage = req.body.percentage;
    try {
      const conn = await pool.getConnection();
      await conn.beginTransaction();
      try {
        if (coupon_type === "seasonal") {
          const rows = await conn.query(
            "INSERT INTO coupon VALUES (DEFAULT, ?, ?, ?, ?, ?)",
            [seller_id, description, start_time, coupon_type, end_time]
          );
          const coupon_code = rows.insertId;
          await conn.query("INSERT INTO seasonal_coupon VALUES (?, ?)", [
            coupon_code,
            percentage,
          ]);
          await conn.commit();
          res
            .status(201)
            .location(`/api/coupons/${coupon_code}`)
            .json({ msg: "success", data: { code: String(coupon_code) } });
        } else if (coupon_type === "special_event") {
          const product_ids = req.body.product_ids;
          if (product_ids === undefined || product_ids.length < 1) {
            throw Error();
          }
          const rows = await conn.query(
            "INSERT INTO coupon VALUES (DEFAULT, ?, ?, ?, ?, ?)",
            [seller_id, description, start_time, coupon_type, end_time]
          );
          const coupon_code = rows.insertId;
          await conn.query("INSERT INTO special_event VALUES (?, ?)", [
            coupon_code,
            percentage,
          ]);
          for (const product_id of product_ids) {
            await conn.query(
              "UPDATE product SET code = ? WHERE product_id = ?",
              [coupon_code, product_id]
            );
          }
          await conn.commit();
          res
            .status(201)
            .location(`/api/coupons/${coupon_code}`)
            .json({ msg: "success", data: { code: String(coupon_code) } });
        } else if (coupon_type === "shipping") {
          const threshold = req.body.threshold;
          const rows = await conn.query(
            "INSERT INTO coupon VALUES (DEFAULT, ?, ?, ?, ?, ?)",
            [seller_id, description, start_time, coupon_type, end_time]
          );
          const coupon_code = rows.insertId;
          await conn.query("INSERT INTO shipping_coupon VALUES (?, ?)", [
            coupon_code,
            threshold,
          ]);
          await conn.commit();
          res
            .status(201)
            .location(`/api/coupons/${coupon_code}`)
            .json({ msg: "success", data: { code: String(coupon_code) } });
        } else {
          res.status(400).json({ msg: "Coupon type incorrect" });
        }
      } catch (err) {
        console.log(err);
        await conn.rollback();
        res.status(400).json({ msg: "Error creating coupon" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  return route;
};
