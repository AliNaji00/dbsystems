import * as React from "react";
import { CenteredContent } from "../../ui/CenteredContent";
import { RouteNames } from "../router/RouteNames";
import { Link } from "react-router-dom";

export const NotFoundSite = () => (
  <CenteredContent>
    <Link to={RouteNames.LOG_IN}>Test</Link>
  </CenteredContent>
);
