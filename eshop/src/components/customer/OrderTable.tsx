import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as React from "react";
import { IOrder, getOrdersResponseMockData } from "../network/APITypes";
import { CustomTableCell } from "../ui/Components";
import { customColors } from "../util/Theme";

const Row = ({ order }: { order: IOrder }) => {
  const [open, setOpen] = React.useState(false);

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
              <Typography variant="h6" gutterBottom component="div">
                Order Items
              </Typography>
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

export const CollapsibleTable = () => {
  const orders = getOrdersResponseMockData.data;

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
          {orders.map((order) => (
            <Row key={order.order_id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
