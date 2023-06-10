import { Avatar, Menu, MenuItem } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../stores/GeneralStore";
import { RouteNames } from "../app/router/RouteNames";
import {
  CustomerRouteNames,
  customerPrefix,
} from "../customer/router/CustomerRouteNames";
import {
  SellerRouteNames,
  sellerPrefix,
} from "../seller/router/SellerRouteNames";
import { NavBarContainer } from "../ui/NavBarContainer";
import { getImagePath } from "../util/Helpers";
import { logo_transparent } from "../util/Images";
import { customColors } from "../util/Theme";

export const AdminNavBar = observer(
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
        <h1>Admin Page</h1>
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
          <MenuItem
            onClick={() => {
              navigate(RouteNames.PROFILE);
              handleClose();
            }}
          >
            Profile
          </MenuItem>
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
              Seller Dashbaord
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
