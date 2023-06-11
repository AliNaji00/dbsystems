import { Paper } from "@mui/material";
import _ from "lodash";
import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ITimeSalesStatistics } from "../network/APITypes";
import { customColors } from "../util/Theme";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={6}
        sx={{ backgroundColor: customColors.primaryColor, padding: 2 }}
      >
        <p style={{ color: customColors.white, margin: 0 }}>{`${new Date(
          payload[0].payload.startDate
        ).toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })} - ${new Date(payload[0].payload.endDate).toLocaleDateString(
          "zh-TW",
          {
            month: "2-digit",
            day: "2-digit",
          }
        )}`}</p>
        <h4
          style={{
            color: customColors.white,
            fontSize: 22,
            margin: 0,
          }}
        >{`$ ${payload[0].payload.salesProfit}`}</h4>
      </Paper>
    );
  }

  return null;
};

export const SalesChartTile = (props: {
  salesChartData: Array<ITimeSalesStatistics>;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={600}
        height={350}
        data={props.salesChartData}
        margin={{
          left: 16,
          right: 16,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickMargin={12} />
        <YAxis
          domain={[
            (_.min(
              props.salesChartData.map((data) => data.salesProfit)
            ) as number) - 100,
            (_.max(
              props.salesChartData.map((data) => data.salesProfit)
            ) as number) + 100,
          ]}
          tickMargin={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="salesProfit"
          stroke={customColors.primaryColor}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
