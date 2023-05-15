import * as React from "react";
import { useGeneralStore } from "../../stores/GeneralStore";
import {
  christopher_campbell_rDEOVtE7vOs_unsplash,
  logo_transparent,
} from "../util/Images";
import { Avatar, Badge } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { customColors } from "../util/Theme";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
  CustomerRouteNames,
  customerPrefix,
} from "./router/CustomerRouteNames";
import { BACKGROUND_BORDER_RADIUS } from "../ui/Components";
import { RouteNames } from "../app/router/RouteNames";

export const CustomerNavBar = observer(
  (props: { style?: React.CSSProperties }) => {
    const generalStore = useGeneralStore();

    const badgeStyle = {
      "& .MuiBadge-badge": {
        color: customColors.white,
      },
    };

    return (
      <>
        <div
          style={{
            height: 32,
            width: "100%",
            backgroundColor: customColors.backgroundColor,
            position: "fixed",
            top: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            backgroundColor: customColors.backgroundColor,
            left: 32,
            top: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "calc(100vw - 64px)",
              padding: "16px 32px",
              borderRadius: `${BACKGROUND_BORDER_RADIUS}px ${BACKGROUND_BORDER_RADIUS}px 0 0`,
              justifyContent: "space-between",
              backgroundColor: customColors.white,
              ...props.style,
            }}
          >
            <img
              src={logo_transparent}
              alt="logo"
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
              }}
            />
            <generalStore.SearchField
              placeholder="Search for products..."
              maxWidth
            />

            <div style={{ display: "flex", gap: 16 }}>
              <Link to={customerPrefix(CustomerRouteNames.ORDER_HISTORY)}>
                <Avatar sx={{ bgcolor: customColors.primaryColor }}>
                  <div
                    style={{ width: 27, height: 27, padding: "1px 0 0 0.5px" }}
                  >
                    <HistoryIcon />
                  </div>
                </Avatar>
              </Link>
              <Link to={customerPrefix(CustomerRouteNames.SHOPPING_CART)}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={generalStore.basketItems}
                  color="warning"
                  sx={badgeStyle}
                >
                  <Avatar sx={{ bgcolor: customColors.primaryColor }}>
                    <ShoppingCartOutlinedIcon />
                  </Avatar>
                </Badge>
              </Link>
              <Link to={RouteNames.LOG_IN}>
                <Avatar src={christopher_campbell_rDEOVtE7vOs_unsplash} />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
);
