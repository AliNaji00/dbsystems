import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { customColors } from "../../util/Theme";
import { OrdersTile } from "../OrdersTile";
import { getSalesStatisticMockData } from "../../network/APITypes";
import { ProfitTile } from "../ProfitTile";
import { SalesChartTile } from "../SalesChartTile";

export const SellerDashboardSite = () => {
  const generalStore = useGeneralStore();

  const salesStatistics = getSalesStatisticMockData;

  return (
    <>
      <Helmet>
        <title>{title("Dashboard")}</title>
      </Helmet>
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <h3 style={{ marginBottom: 16 }}>
            Welcome, <b>{generalStore.userName?.split(" ")[0]}</b>!
          </h3>
          <div style={{ height: "100%", display: "flex" }}>
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
                <SalesChartTile salesChartData={salesStatistics.data} />
              </div>
            </div>
            <div
              style={{ flex: 5, backgroundColor: customColors.primaryColor }}
            ></div>
          </div>
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
};
