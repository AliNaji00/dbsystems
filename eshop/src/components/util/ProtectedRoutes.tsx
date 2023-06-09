import { observer } from "mobx-react";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { useGeneralStore } from "../../stores/GeneralStore";
import { RouteNames } from "../app/router/RouteNames";

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
      return <Navigate to={RouteNames.LOG_IN} />;
    }
    return <>{props.children}</>;
  }
);

export const ProtectedCustomerRoute = observer(
  (props: { children: React.ReactNode }) => {
    const generalStore = useGeneralStore();
    if (!generalStore.loggedIn) {
      // user is not authenticated
      return <Navigate to={RouteNames.LOG_IN} />;
    }
    if (!generalStore.userRoles.includes("customer")) {
      // user is not a customer
      return <Navigate to={RouteNames.LOG_IN} />;
    }
    return <>{props.children}</>;
  }
);
