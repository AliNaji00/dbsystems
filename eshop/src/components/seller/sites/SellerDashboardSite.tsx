import * as React from "react";
import { Helmet } from "react-helmet";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { title } from "../../app/router/RouteNames";
import { ProfileNavBar } from "../../app/ProfileNavBar";

export const SellerDashboardSite = () => {
  return (
    <>
      <Helmet>
        <title>{title("Dashboard")}</title>
      </Helmet>
      <ProfileNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent></CenteredContent>
      </BackgroundContainer>
    </>
  );
};
