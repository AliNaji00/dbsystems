import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../router/RouteNames";
import { BackgroundContainer } from "../../ui/Components";
import { CenteredContent } from "../../ui/CenteredContent";
import { ProfileNavBar } from "../ProfileNavBar";

export const ProfileSite = () => {
  return (
    <>
      <Helmet>
        <title>{title("Profile")}</title>
      </Helmet>
      <ProfileNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent></CenteredContent>
      </BackgroundContainer>
    </>
  );
};
