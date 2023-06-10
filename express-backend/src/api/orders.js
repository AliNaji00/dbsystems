import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  // get one order
  route.get("/:order_id", (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  });

  // check new order
  route.post("/check", async (req, res, next) => {
    const user_id = req.body.user_id;
    const coupon_ids =
      req.body.coupon_ids === undefined ? [] : req.body.coupon_ids;
    try {
      const conn = await pool.getConnection();
      try {
        const data = await calculateOrder(user_id, coupon_ids, conn);
        res.json({
          msg: "success",
          data: data,
        });
      } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Error checking order" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  route.post("/", async (req, res, next) => {
    const user_id = req.body.user_id;
    const coupon_ids =
      req.body.coupon_ids === undefined ? [] : req.body.coupon_ids;
    try {
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();

        const data = await calculateOrder(user_id, coupon_ids, conn);
        const order_items = data.items_by_seller;
        // Use transaction to make sure cleanup works in case of an error
        if (order_items.length < 1) {
          res.status(400).json({ msg: "No items in order" });
          return;
        }
        try {
          const rows = await conn.query(
            "INSERT INTO orders VALUES (DEFAULT, ?, CURDATE())",
            user_id
          );
          const order_id = rows.insertId;
          for (const seller_items of order_items) {
            const seller_id = seller_items.seller_id;
            console.log(seller_items);
            for (const item of seller_items.items) {
              if (item.toomany) {
                throw new Error();
              }
              await conn.query("INSERT INTO contains VALUES (?, ?, ?, ?)", [
                order_id,
                item.product_id,
                item.quantity,
                item.price_per_piece,
              ]);
              await conn.query(
                "UPDATE product SET stock_quantity = stock_quantity - ? WHERE product_id = ?",
                [item.quantity, item.product_id]
              );
            }
            await conn.query("INSERT INTO manage VALUES (?, ?, ?)", [
              order_id,
              "open",
              seller_id,
            ]);
          }
          await conn.commit();
          res
            .status(201)
            .location("/api/orders/" + order_id)
            .json({ msg: "success", data: { order_id: String(order_id) } });
        } catch (err) {
          conn.rollback();
          res.status(400).json({ msg: "Error processing order" });
        } finally {
          conn.close();
        }
      } catch (err) {
        res.status(400).json({ msg: "Error processing order" });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  const calculateOrder = async (user_id, coupon_ids, conn) => {
    // To make an order, we take all the items in the basket of one user
    // Then, we first can apply the special event coupons to each product, which is our price_per_piece
    // After this, we calculate the total price of the order for each seller using a seasonal coupon (if existing)
    // intermediate_price[seller] = (price_per_piece * quantity) * 100/(100 - seasonal_coupon_percentage)
    // If we have a shipping coupon for this seller, we check if our calculated price is above the threshold
    // If it is above the treshold, we don't add shipping costs, else we add the shipping costs (to be determined what they are)
    const basket_items = await conn.query(
      "SELECT sib.product_id, sib.quantity, p.stock_quantity, p.price AS original_price, CASE WHEN CURDATE() BETWEEN c.start_time AND c.end_time THEN CAST((100 - se.percentage)/ 100 * p.price AS INT) ELSE NULL END AS ReducedPrice, p.s_uid FROM store_in_basket sib JOIN product p ON sib.product_id = p.product_id LEFT JOIN special_event se ON p.code = se.code LEFT JOIN coupon c ON se.code = c.code WHERE c_uid = ? ORDER BY p.s_uid",
      user_id
    );
    const placeholders = coupon_ids.map(() => "?").join(",");
    const seasonal_coupons =
      coupon_ids.length < 1
        ? []
        : await conn.query(
            `SELECT c.code, c.s_uid, sc.percentage FROM coupon c JOIN seasonal_coupon sc ON c.code = sc.code WHERE (CURDATE() BETWEEN c.start_time AND c.end_time) AND c.code IN (${placeholders})`,
            coupon_ids
          );
    const shipping_coupons =
      coupon_ids.length < 1
        ? []
        : await conn.query(
            `SELECT c.code, c.s_uid, sc.threshold FROM coupon c JOIN shipping_coupon sc ON c.code = sc.code WHERE (CURDATE() BETWEEN c.start_time AND c.end_time) AND c.code IN (${placeholders})`,
            coupon_ids
          );
    const seller_ids = basket_items.map((item) => item.s_uid);
    const items_by_seller = seller_ids.map((id) => {
      const items = basket_items
        .filter((item) => item.s_uid == id)
        .map((item) => {
          const {
            stock_quantity,
            s_uid,
            original_price,
            ReducedPrice,
            ...rest
          } = item;
          if (ReducedPrice !== null) {
            return {
              ...rest,
              price_per_piece: Number(ReducedPrice),
              total_price: Number(ReducedPrice) * Number(rest.quantity),
              original_price: Number(original_price),
              toomany: Number(stock_quantity) - Number(rest.quantity) < 0,
            };
          } else {
            return {
              ...rest,
              price_per_piece: original_price,
              total_price: Number(original_price * rest.quantity),
              toomany: Number(stock_quantity) - Number(rest.quantity) < 0,
            };
          }
        });
      return {
        seller_id: id,
        items: items,
      };
    });
    const checkout = items_by_seller.map((seller) => {
      const seller_id = seller.seller_id;
      const seasonal_coupon = seasonal_coupons.find(
        (x) => x.s_uid === seller_id
      );
      const shipping_coupon = shipping_coupons.find(
        (x) => x.s_uid === seller_id
      );
      const percentage =
        seasonal_coupon === undefined ? 0 : seasonal_coupon.percentage;
      const treshold =
        shipping_coupon === undefined ? 0 : shipping_coupon.treshold;
      const intermediate_price = seller.items.reduce(
        (price, item) => price + item.total_price,
        0
      );
      const seasonal_discount_price =
        intermediate_price * ((100 - percentage) / 100);
      const total_price =
        seasonal_discount_price > treshold
          ? seasonal_discount_price * 1.1 // Add 10% shipping cost here
          : seasonal_discount_price;
      return {
        ...seller,
        total_price: total_price,
      };
    });
    const summed_price = checkout.reduce(
      (price, seller) => price + seller.total_price,
      0
    );
    return { summed_price: summed_price, items_by_seller: checkout };
  };

  // modify existing order
  route.put("/:order_id", (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  });

  // get multiple orders, all, by user id or by seller id
  route.get("/", (req, res, next) => {
    const user_id = req.query.user_id;
    const seller_id = req.query.seller_id;
    // etc
    try {
    } catch (err) {
      next(err);
    }
  });

  return route;
};