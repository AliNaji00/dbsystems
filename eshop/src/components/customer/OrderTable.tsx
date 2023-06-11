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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { ISellerOrder, IUserOrder } from "../network/APITypes";
import { CustomTableCell } from "../ui/Components";
import { customColors } from "../util/Theme";
import { API } from "../network/API";
import { useGeneralStore } from "../../stores/GeneralStore";

const UserRow = ({ order }: { order: IUserOrder }) => {
  const [open, setOpen] = React.useState(false);
  const [openSellerLines, setOpenSellerLines] = React.useState<string[]>([]);

  const handleClick = (id: string) => {
    if (openSellerLines.includes(id)) {
      setOpenSellerLines(openSellerLines.filter((orderId) => orderId !== id));
    } else {
      setOpenSellerLines([...openSellerLines, id]);
    }
  };

  let orderStatus = "";

  if (
    order.order_items
      .map((item) => item.status)
      .every((val, i, arr) => val === arr[0])
  ) {
    orderStatus = order.order_items[0].status;
  } else {
    orderStatus = "processing";
  }

  // calculate total shipping cost
  const totalShippingCost = order.order_items.reduce((acc: number, item) => {
    return acc + item.shipping_cost;
  }, 0);

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
        <CustomTableCell>
          {new Date(order.time).toLocaleDateString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </CustomTableCell>
        <CustomTableCell>{orderStatus}</CustomTableCell>
        <CustomTableCell>{totalShippingCost}</CustomTableCell>
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
              </div>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <CustomTableCell />
                    <CustomTableCell>Seller ID</CustomTableCell>
                    <CustomTableCell>Seller Name</CustomTableCell>
                    <CustomTableCell>Status</CustomTableCell>
                    <CustomTableCell>Shipping Cost</CustomTableCell>
                    <CustomTableCell>Total Price</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item) => (
                    <React.Fragment key={item.seller_id}>
                      <TableRow>
                        <CustomTableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleClick(item.seller_id)}
                          >
                            {openSellerLines.includes(item.seller_id) ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </CustomTableCell>
                        <CustomTableCell>{item.seller_id}</CustomTableCell>
                        <CustomTableCell>{item.store_name}</CustomTableCell>
                        <CustomTableCell>{item.status}</CustomTableCell>
                        <CustomTableCell>{item.shipping_cost}</CustomTableCell>
                        <CustomTableCell>{item.total_price}</CustomTableCell>
                      </TableRow>
                      <TableRow>
                        <CustomTableCell
                          tableCellProps={{
                            style: { padding: 0 },
                            colSpan: 6,
                          }}
                        >
                          <Collapse
                            in={openSellerLines.includes(item.seller_id)}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box
                              sx={{
                                padding: 3,
                                backgroundColor: customColors.white,
                                borderRadius: 2,
                              }}
                            >
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <CustomTableCell>
                                      Product ID
                                    </CustomTableCell>
                                    <CustomTableCell>
                                      Product Name
                                    </CustomTableCell>
                                    <CustomTableCell>
                                      Prize per piece
                                    </CustomTableCell>
                                    <CustomTableCell>Quantity</CustomTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {item.products.map((product) => (
                                    <TableRow key={product.product_id}>
                                      <CustomTableCell>
                                        {product.product_id}
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        {product.name}
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        {product.price_per_piece}
                                      </CustomTableCell>
                                      <CustomTableCell>
                                        {product.quantity}
                                      </CustomTableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </CustomTableCell>
                      </TableRow>
                    </React.Fragment>
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

const SellerRow = ({ order }: { order: ISellerOrder }) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const generalStore = useGeneralStore();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeOrderStatus = async (status: string) => {
    try {
      await API.putOrder(status, generalStore.userId, order.order_id);
      generalStore.toggleOrdersChangeFlag();
      handleCloseMenu();
    } catch (err) {
      console.log(err);
    }
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
        <CustomTableCell>
          {new Date(order.time).toLocaleDateString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </CustomTableCell>
        <CustomTableCell>{order.status}</CustomTableCell>
        <CustomTableCell>{order.shipping_cost}</CustomTableCell>
        <CustomTableCell tableCellProps={{ align: "right" }}>
          {order.total_price}
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
                  <MenuItem onClick={() => handleChangeOrderStatus("received")}>
                    Submitted (Received)
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleChangeOrderStatus("processing")}
                  >
                    Processed (Processing)
                  </MenuItem>
                  <MenuItem onClick={() => handleChangeOrderStatus("shipping")}>
                    Delivered (Shipping)
                  </MenuItem>
                  <MenuItem onClick={() => handleChangeOrderStatus("closed")}>
                    Completed (Closed)
                  </MenuItem>
                </Menu>
              </div>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Product ID</CustomTableCell>
                    <CustomTableCell>Product Name</CustomTableCell>
                    <CustomTableCell>Price</CustomTableCell>
                    <CustomTableCell>Quantity</CustomTableCell>
                    <CustomTableCell>Status</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((product) => (
                    <TableRow key={product.product_id}>
                      <CustomTableCell>{product.product_id}</CustomTableCell>
                      <CustomTableCell>{product.name}</CustomTableCell>
                      <CustomTableCell>
                        {product.price_per_piece}
                      </CustomTableCell>
                      <CustomTableCell>{product.quantity}</CustomTableCell>
                      <CustomTableCell>{order.status}</CustomTableCell>
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
  userOrders?: IUserOrder[];
  sellerOrders?: ISellerOrder[];
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
              tableCellProps={{ style: { color: customColors.white } }}
            >
              Shipping Cost
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
          {props.sellerOrders &&
            props.sellerOrders.map((order) => (
              <SellerRow key={order.order_id} order={order} />
            ))}
          {props.userOrders &&
            props.userOrders.map((order) => (
              <UserRow key={order.order_id} order={order} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
