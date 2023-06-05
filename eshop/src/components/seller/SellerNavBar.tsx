import { Avatar, Menu, MenuItem } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../stores/GeneralStore";
import {
  CustomerRouteNames,
  customerPrefix,
} from "../customer/router/CustomerRouteNames";
import { NavBarContainer } from "../ui/NavBarContainer";
import { getImagePath } from "../util/Helpers";
import { logo_transparent } from "../util/Images";
import { customColors } from "../util/Theme";
import { SellerRouteNames, sellerPrefix } from "./router/SellerRouteNames";
import { RouteNames } from "../app/router/RouteNames";

// TODO add routing for all the menu items

type NavigationItem = {
  label: string;
  route: string;
};

export const SellerNavBar = observer(
  (props: { style?: React.CSSProperties }) => {
    const generalStore = useGeneralStore();
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const navigationItemsRef = React.useRef<Array<HTMLDivElement | null>>([]);

    const navigtionItems: Array<NavigationItem> = [
      { label: "Dashboard", route: sellerPrefix(SellerRouteNames.DASHBOARD) },
      { label: "Orders", route: sellerPrefix(SellerRouteNames.ORDERS) },
      { label: "Products", route: sellerPrefix(SellerRouteNames.PRODUCTS) },
      { label: "Coupons", route: sellerPrefix(SellerRouteNames.COUPONS) },
    ];

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: 16,
          }}
        >
          <ActiveIndicator
            items={navigtionItems}
            itemsRef={navigationItemsRef}
            pathname={location.pathname}
          />
          {navigtionItems.map((item, index) => (
            <h4
              ref={(el) => (navigationItemsRef.current[index] = el)} // This line is updated
              onClick={() => navigate(item.route)}
              key={item.label}
              style={{
                color: location.pathname.includes(item.route)
                  ? customColors.white
                  : customColors.primaryColor,

                borderRadius: "5px",
                padding: "16px",
                marginBottom: "0px",
                fontSize: 20,
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              {item.label}
            </h4>
          ))}
        </div>
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
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(customerPrefix(CustomerRouteNames.HOME));
            }}
          >
            Shopping
          </MenuItem>
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
      </NavBarContainer>
    );
  }
);

type ActiveStyle = {
  left?: number;
  width?: number;
};

const ActiveIndicator = observer(
  (props: {
    items: NavigationItem[];
    itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
    pathname: string;
  }) => {
    // Initialize with null values
    const [activeStyle, setActiveStyle] = React.useState<ActiveStyle>({});

    React.useEffect(() => {
      const activeItemIndex = props.items.findIndex((item) =>
        props.pathname.includes(item.route)
      );
      const activeElement = props.itemsRef.current[activeItemIndex];

      if (activeElement) {
        // This timeout ensures that the transition happens after the element has been rendered
        // with its initial position.
        setTimeout(() => {
          setActiveStyle({
            left: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
          });
        }, 0);
      }
    }, [props.items, props.itemsRef, props.pathname]);

    return (
      <div
        style={{
          position: "absolute",
          height: 50,
          left: activeStyle.left,
          width: activeStyle.width,
          backgroundColor: customColors.primaryColor,
          transition: "left 0.3s, width 0.3s",
          borderRadius: "5px",
          zIndex: 1,
        }}
      />
    );
  }
);
