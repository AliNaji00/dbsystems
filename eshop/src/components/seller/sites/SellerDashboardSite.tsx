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
          <h3 style={{ marginBottom: 32 }}>
            Welcome, <b>{generalStore.userName?.split(" ")[0]}</b>!
          </h3>
          <div style={{ height: "100%", display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 8,
                gap: 32,
                height: 650,
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
              <div
                style={{ height: "100%", backgroundColor: customColors.tomato }}
              ></div>
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
