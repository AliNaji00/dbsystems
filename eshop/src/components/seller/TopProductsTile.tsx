import * as React from "react";
import { ITopSalesProduct } from "../network/APITypes";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { customColors } from "../util/Theme";
import { useNavigate } from "react-router-dom";
import { SellerRouteNames, sellerPrefix } from "./router/SellerRouteNames";
import { getImagePath } from "../util/Helpers";

export const TopProductsTile = (props: {
  products: Array<ITopSalesProduct>;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <h2 style={{ fontSize: 22 }}>Top selling products</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: 8,
          }}
          onClick={() => {
            navigate(sellerPrefix(SellerRouteNames.PRODUCTS));
          }}
        >
          <p style={{ margin: 0, color: customColors.primaryColor }}>See all</p>
          <ArrowForwardIosIcon />
        </div>
      </div>
      {props.products.map((product, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: 64,
            marginBottom: 40,
            gap: 24,
          }}
          key={index}
        >
          <p style={{ color: customColors.primaryColor }}>{index + 1}</p>
          <img
            src={getImagePath(product.ImageURL)}
            alt={product.name}
            style={{
              borderRadius: "15px 0",
              height: 64,
              width: 64,
              backgroundColor: customColors.backgroundColor,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 16,
                color: customColors.primaryColor,
              }}
            >
              {product.name}
            </p>
            <h2 style={{ margin: 0, fontSize: 22 }}>
              {product.sales_volume} units sold
            </h2>
          </div>
        </div>
      ))}
    </>
  );
};
