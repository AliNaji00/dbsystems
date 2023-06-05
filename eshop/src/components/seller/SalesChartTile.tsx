import * as React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ISalesStatistics } from "../network/APITypes";
import { customColors } from "../util/Theme";
import _ from "lodash";

export const SalesChartTile = (props: {
  salesChartData: Array<ISalesStatistics>;
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
              props.salesChartData.map((data) => data.salesVolume)
            ) as number) - 100,
            (_.max(
              props.salesChartData.map((data) => data.salesVolume)
            ) as number) + 100,
          ]}
          tickMargin={12}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="salesVolume"
          stroke={customColors.primaryColor}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
