import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Avatar, Badge, Button, Menu, MenuItem } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../stores/GeneralStore";
import { RouteNames } from "../app/router/RouteNames";
import { NavBarContainer } from "../ui/NavBarContainer";
import { getImagePath } from "../util/Helpers";
import { logo_transparent } from "../util/Images";
import { customColors } from "../util/Theme";
import {
  CustomerRouteNames,
  customerPrefix,
} from "./router/CustomerRouteNames";
import {
  SellerRouteNames,
  sellerPrefix,
} from "../seller/router/SellerRouteNames";

type SiteType = "Search" | "Other";

// TODO add routing for all the menu items

export const CustomerNavBar = observer(
  (props: {
    style?: React.CSSProperties;
    siteType: SiteType;
    title?: string;
  }) => {
    const navigate = useNavigate();

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
      <NavBarContainer style={props.style}>
        <img
          src={logo_transparent}
          alt="logo"
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
          }}
        />

        {props.siteType === "Search" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "start",
              maxWidth: 1000,
            }}
          >
            <generalStore.SearchField
              placeholder="Search for products..."
              maxWidth
            />
          </div>
        )}
        {props.siteType === "Other" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: 1000,
            }}
          >
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
            <h1>{props.title}</h1>
          </div>
        )}

        <div style={{ display: "flex", gap: 16 }}>
          <Link to={customerPrefix(CustomerRouteNames.ORDER_HISTORY)}>
            <Avatar sx={{ bgcolor: customColors.primaryColor }}>
              <div
                style={{
                  width: 27,
                  height: 27,
                  padding: "1px 0 0 0.5px",
                }}
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
            src={getImagePath(generalStore.userImage)}
            onClick={(e) => handleClick(e)}
            sx={{ cursor: "pointer", bgcolor: customColors.primaryColor }}
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
            <MenuItem
              onClick={() => {
                navigate(RouteNames.PROFILE);
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            {generalStore.userRoles.includes("seller") && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate(sellerPrefix(SellerRouteNames.DASHBOARD));
                }}
              >
                Seller Dashboard
              </MenuItem>
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
      </NavBarContainer>
    );
  }
);
