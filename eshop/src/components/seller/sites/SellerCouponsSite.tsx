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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
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
                    <TableCell>{coupon.start_time}</TableCell>
                    <TableCell>{coupon.end_time}</TableCell>
                    <TableCell>{coupon.description}</TableCell>
                    <TableCell>{coupon.type}</TableCell>
                    <TableCell>
                      {coupon.percentage ? coupon.percentage : "-"}
                    </TableCell>
                    <TableCell>
                      {coupon.threshold ? coupon.threshold : "-"}
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
