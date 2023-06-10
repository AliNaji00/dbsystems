import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { AdminNavBar } from "../AdminNavBar";

export const AdminSite = () => {
  return (
    <>
      <Helmet>
        <title>{title("Admin")}</title>
      </Helmet>
      <AdminNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent></CenteredContent>
      </BackgroundContainer>
    </>
  );
};
