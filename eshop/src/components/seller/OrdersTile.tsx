import * as React from "react";
import { customColors } from "../util/Theme";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CountUp from "react-countup";

export const OrdersTile = (props: {
  orders: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        backgroundColor: customColors.sky,
        display: "flex",
        borderRadius: "35px 0 35px 0",
        height: 152,
        width: "100%",
        justifyContent: "center",
        gap: 32,
        alignItems: "center",
        ...props.style,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px 0 10px 0",
          backgroundColor: customColors.white,
        }}
      >
        <AssignmentOutlinedIcon />
      </div>
      <div>
        <h2 style={{ margin: 0 }}>
          <CountUp end={props.orders} duration={2} />
        </h2>
        <h4 style={{ color: customColors.primaryColor, margin: 0 }}>Orders</h4>
      </div>
    </div>
  );
};
