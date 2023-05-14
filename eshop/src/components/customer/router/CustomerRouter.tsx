import { observer } from "mobx-react";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { CustomerHomeSite } from "../sites/CustomerHomeSite";
import { CustomerRouteNames } from "./CustomerRouteNames";
import { NotFoundSite } from "../../app/sites/NotFoundSite";

export const CustomerRouter = observer(() => (
  <Routes>
    <Route path={CustomerRouteNames.HOME} element={<CustomerHomeSite />} />
    <Route path="*" element={<NotFoundSite />} />
  </Routes>
));
