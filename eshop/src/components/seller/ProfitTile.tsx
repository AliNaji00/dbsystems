import * as React from "react";
import { customColors } from "../util/Theme";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import CountUp from "react-countup";

export const ProfitTile = (props: {
  profit: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        backgroundColor: customColors.rose,
        display: "flex",
        borderRadius: "0 35px 0 35px",
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
          borderRadius: "0 10px 0 10px",
          backgroundColor: customColors.white,
        }}
      >
        <SavingsOutlinedIcon />
      </div>
      <div>
        <h2 style={{ margin: 0 }}>
          <CountUp
            prefix="$ "
            separator=" "
            decimals={2}
            end={props.profit}
            duration={2}
          />
        </h2>
        <h4 style={{ color: customColors.primaryColor, margin: 0 }}>
          Total Profit
        </h4>
      </div>
    </div>
  );
};
