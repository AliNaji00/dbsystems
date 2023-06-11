import * as React from "react";
import { Helmet } from "react-helmet";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useSalesStatistics } from "../../../stores/useSalesStatistics";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { OrdersTile } from "../OrdersTile";
import { ProfitTile } from "../ProfitTile";
import { SalesChartTile } from "../SalesChartTile";
import { TopProductsTile } from "../TopProductsTile";

export const SellerDashboardSite = () => {
  const generalStore = useGeneralStore();

  const salesStatistics = useSalesStatistics(generalStore.userId);

  return (
    <>
      <Helmet>
        <title>{title("Dashboard")}</title>
      </Helmet>
      <BackgroundContainer style={{ minHeight: 200 }}>
        {salesStatistics && (
          <CenteredContent>
            <h3 style={{ marginBottom: 16 }}>
              Welcome, <b>{generalStore.userName?.split(" ")[0]}</b>!
            </h3>
            <div style={{ height: "100%", display: "flex", gap: 32 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 8,
                  height: 600,
                }}
              >
                <div
                  style={{
                    margin: 16,
                    display: "flex",
                    gap: 32,
                  }}
                >
                  <OrdersTile
                    orders={salesStatistics.total_sales}
                    style={{ flex: 3 }}
                  />
                  <ProfitTile
                    profit={salesStatistics.profit}
                    style={{ flex: 4 }}
                  />
                </div>
                <div style={{ margin: 16, maxHeight: "60%" }}>
                  <h2 style={{ marginBottom: 32, fontSize: 22 }}>
                    Sales statistics
                  </h2>
                  <SalesChartTile salesChartData={salesStatistics.sales_data} />
                </div>
              </div>
              <div
                style={{
                  flex: 5,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TopProductsTile products={salesStatistics.top_products} />
              </div>
            </div>
          </CenteredContent>
        )}
      </BackgroundContainer>
    </>
  );
};
