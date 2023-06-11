import * as React from "react";
import { Helmet } from "react-helmet";
import { title } from "../../app/router/RouteNames";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useCoupons } from "../../../stores/useCoupons";
import { SellerRouteNames, sellerPrefix } from "../router/SellerRouteNames";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const SellerCouponsSite = () => {
  const generalStore = useGeneralStore();

  const coupons = useCoupons(generalStore.userId);

  return (
    <>
      <Helmet>
        <title>{title("Coupons")}</title>
      </Helmet>
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <div style={{ display: "flex", width: "100%" }}>
            <Link to={sellerPrefix(SellerRouteNames.CREATE_COUPON)}>
              <AddCircleOutlineIcon
                color="primary"
                sx={{ width: 48, height: 48, marginBottom: 2 }}
              />
            </Link>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Percentage</TableCell>
                  <TableCell>Threshold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.code}>
                    <TableCell>{coupon.code}</TableCell>
                    <TableCell>
                      {new Date(coupon.start_time).toLocaleDateString("zh-TW", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(coupon.end_time).toLocaleDateString("zh-TW", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{coupon.description}</TableCell>
                    <TableCell>{coupon.coupon_type}</TableCell>
                    <TableCell>
                      {coupon.percentage ? `${coupon.percentage}%` : "-"}
                    </TableCell>
                    <TableCell>
                      {coupon.threshold ? `$ ${coupon.threshold}` : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
};
