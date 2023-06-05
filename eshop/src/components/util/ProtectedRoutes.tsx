import { Navigate } from "react-router-dom";
import * as React from "react";
import { useGeneralStore } from "../../stores/GeneralStore";
import { RouteNames } from "../app/router/RouteNames";
import { observer } from "mobx-react";
import {
  CustomerRouteNames,
  customerPrefix,
} from "../customer/router/CustomerRouteNames";

export const ProtectedRoute = observer(
  (props: { children: React.ReactNode }) => {
    const generalStore = useGeneralStore();
    if (!generalStore.loggedIn) {
      // user is not authenticated
      return <Navigate to={RouteNames.LOG_IN} />;
    }
    return <>{props.children}</>;
  }
);

export const ProtectedSellerRoute = observer(
  (props: { children: React.ReactNode }) => {
    const generalStore = useGeneralStore();
    if (!generalStore.loggedIn) {
      // user is not authenticated
      return <Navigate to={RouteNames.LOG_IN} />;
    }
    if (!generalStore.userRoles.includes("seller")) {
      // user is not a seller
      return <Navigate to={customerPrefix(CustomerRouteNames.HOME)} />;
    }
    return <>{props.children}</>;
  }
);
