import { Avatar, Menu, MenuItem } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../stores/GeneralStore";
import {
  CustomerRouteNames,
  customerPrefix,
} from "../customer/router/CustomerRouteNames";
import { NavBarContainer } from "../ui/NavBarContainer";
import { getImagePath } from "../util/Helpers";
import { logo_transparent } from "../util/Images";
import { customColors } from "../util/Theme";
import {
  SellerRouteNames,
  sellerPrefix,
} from "../seller/router/SellerRouteNames";
import { AdminRouteNames, adminPrefix } from "../admin/router/AdminRouteNames";

export const ProfileNavBar = observer(
  (props: { style?: React.CSSProperties }) => {
    const generalStore = useGeneralStore();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
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
        <Avatar
          key={generalStore.userImageChangeCounter}
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
          {generalStore.userRoles.includes("customer") && (
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(customerPrefix(CustomerRouteNames.HOME));
              }}
            >
              Shopping
            </MenuItem>
          )}
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
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(adminPrefix(AdminRouteNames.HOME));
              }}
            >
              Admin Dashbaord
            </MenuItem>
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
