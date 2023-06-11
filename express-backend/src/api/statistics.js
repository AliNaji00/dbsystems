import { Router } from "express";

export default ({ pool }) => {
  const route = Router();

  route.get("/:seller_id", async (req, res, next) => {
    const seller_id = req.params.seller_id;
    try {
      const conn = await pool.getConnection();
      try {
        const p = await getProfit(conn, seller_id);
        const products = await getProducts(conn, seller_id);
        const salesStatistics = await getSalesStatistics(conn, seller_id);
        const total_sales = products.reduce(
          (sales, product) => sales + Number(product.sales_volume),
          0
        );
        res.json({
          msg: "success",
          data: {
            profit: Number(p[0].profit),
            total_sales: total_sales,
            sales_data: salesStatistics,
            top_products: products.slice(0, 5),
          },
        });
      } catch (err) {
        res.status(400).json({ msg: "Could not generate sales statistics." });
      } finally {
        conn.close();
      }
    } catch (err) {
      next(err);
    }
  });

  const getProducts = async (conn, seller_id) => {
    const products = await conn.query(
      "SELECT p.name, p.product_id, SUM(c.quantity) AS sales_volume FROM product p JOIN `contains` c ON c.product_id = p.product_id WHERE p.s_uid = ? AND p.available = 1 GROUP BY (p.product_id) ORDER BY sales_volume DESC",
      seller_id
    );
    return products.map((product) => ({
      ...product,
      ImageUrl: `/api/products/${product.product_id}/picture`,
    }));
  };

  const getProfit = async (conn, seller_id) =>
    await conn.query(
      "SELECT SUM(total_price) AS profit FROM manage m WHERE s_uid = ?",
      seller_id
    );

  const getSalesStatistics = async (conn, seller_id) => {
    const rows = await conn.query(
      "SELECT DATEDIFF(CURDATE(), MIN(o.time)) AS days_from_start, MIN(o.time) AS total_start FROM manage m JOIN orders o ON m.order_id = o.order_id WHERE m.s_uid = ?",
      seller_id
    );
    const { days_from_start, total_start } = rows[0];
    if (days_from_start === null) {
      return [];
    }
    const weeks = Math.ceil(days_from_start / 7);
    const dates = await conn.query(
      `SELECT ? + INTERVAL seq WEEK AS date FROM seq_0_to_${weeks} AS date`,
      total_start
    );
    const salesStatistics = [];
    for (let i = 1; i < dates.length; i++) {
      const start_date = dates[i - 1].date;
      const end_date = dates[i].date;
      const name = `Week ${i}`;
      const week_total = await conn.query(
        "SELECT CAST(SUM(m.total_price) AS INT) AS salesProfit FROM manage m JOIN orders o ON m.order_id = o.order_id WHERE (o.`time` BETWEEN ? AND ?) AND m.s_uid = ?",
        [start_date, end_date, seller_id]
      );
      salesStatistics.push({
        salesProfit: Number(week_total[0].salesProfit),
        startDate: start_date,
        endDate: end_date,
        name: name,
      });
    }
    return salesStatistics;
  };

  return route;
};
