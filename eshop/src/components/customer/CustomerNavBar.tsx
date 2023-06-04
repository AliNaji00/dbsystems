import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Avatar, Badge, Button, Menu, MenuItem } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { useGeneralStore } from "../../stores/GeneralStore";
import { BACKGROUND_BORDER_RADIUS } from "../ui/Components";
import {
  christopher_campbell_rDEOVtE7vOs_unsplash,
  logo_transparent,
} from "../util/Images";
import { customColors } from "../util/Theme";
import {
  CustomerRouteNames,
  customerPrefix,
} from "./router/CustomerRouteNames";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

type SiteType = "Search" | "Other";

export const CustomerNavBar = observer(
  (props: { style?: React.CSSProperties; siteType: SiteType }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

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

            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "start",
                maxWidth: 1000,
              }}
            >
              {props.siteType === "Search" && (
                <generalStore.SearchField
                  placeholder="Search for products..."
                  maxWidth
                />
              )}
              {props.siteType === "Other" && (
                <Link to={customerPrefix(CustomerRouteNames.HOME)}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ArrowBackIosIcon />}
                  >
                    Back Home
                  </Button>
                </Link>
              )}
            </div>

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
              <Avatar
                src={christopher_campbell_rDEOVtE7vOs_unsplash}
                onClick={(e) => handleClick(e)}
                sx={{ cursor: "pointer" }}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                {generalStore.userRoles.includes("seller") && (
                  <MenuItem onClick={handleClose}>Seller Dashboard</MenuItem>
                )}
                {generalStore.userRoles.includes("admin") && (
                  <MenuItem onClick={handleClose}>Admin Dashbaord</MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    handleClose();
                    generalStore.logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </>
    );
  }
);
