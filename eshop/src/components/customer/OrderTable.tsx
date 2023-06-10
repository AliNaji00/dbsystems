import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import { IOrder } from "../network/APITypes";
import { CustomTableCell } from "../ui/Components";
import { customColors } from "../util/Theme";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Row = ({ order, type }: { order: IOrder; type: string }) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeOrderStatus = (status: string) => {
    console.log("Status changed to: " + status);
    // TODO: Replace with actual functionality for changing status
    handleCloseMenu();
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <CustomTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </CustomTableCell>
        <CustomTableCell>{order.order_id}</CustomTableCell>
        <CustomTableCell>{order.order_date}</CustomTableCell>
        <CustomTableCell>{order.order_status}</CustomTableCell>
        <CustomTableCell tableCellProps={{ align: "right" }}>
          {order.order_total}
        </CustomTableCell>
      </TableRow>
      <TableRow>
        <CustomTableCell
          tableCellProps={{
            style: { padding: 0 },
            colSpan: 6,
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{ padding: 3, backgroundColor: customColors.backgroundColor }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  Order Items
                </Typography>

                {type === "seller" && (
                  <>
                    <Button variant="contained" onClick={handleOpenMenu}>
                      Change Status
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem
                        onClick={() => handleChangeOrderStatus("received")}
                      >
                        Submitted (Received)
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleChangeOrderStatus("processing")}
                      >
                        Processed (Processing)
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleChangeOrderStatus("shipping")}
                      >
                        Delivered (Shipping)
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleChangeOrderStatus("closed")}
                      >
                        Completed (Closed)
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </div>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Product ID</CustomTableCell>
                    <CustomTableCell>Product Name</CustomTableCell>
                    <CustomTableCell>Price</CustomTableCell>
                    <CustomTableCell>Quantity</CustomTableCell>
                    <CustomTableCell>Status</CustomTableCell>
                    <CustomTableCell>Shipping Cost</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item) => (
                    <TableRow key={item.product_id}>
                      <CustomTableCell>{item.product_id}</CustomTableCell>
                      <CustomTableCell>{item.name}</CustomTableCell>
                      <CustomTableCell>{item.price}</CustomTableCell>
                      <CustomTableCell>{item.quantity}</CustomTableCell>
                      <CustomTableCell>{item.status}</CustomTableCell>
                      <CustomTableCell>{item.shipping_cost}</CustomTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </CustomTableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const CollapsibleTable = (props: {
  orders: IOrder[];
  type: "customer" | "seller";
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: customColors.primaryColor }}>
          <TableRow>
            <CustomTableCell />
            <CustomTableCell
              tableCellProps={{ style: { color: customColors.white } }}
            >
              Order ID
            </CustomTableCell>
            <CustomTableCell
              tableCellProps={{ style: { color: customColors.white } }}
            >
              Order Date
            </CustomTableCell>
            <CustomTableCell
              tableCellProps={{ style: { color: customColors.white } }}
            >
              Order Status
            </CustomTableCell>
            <CustomTableCell
              tableCellProps={{
                align: "right",
                style: { color: customColors.white },
              }}
            >
              Order Total
            </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orders.map((order) => (
            <Row key={order.order_id} order={order} type={props.type} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
