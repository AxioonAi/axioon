import { useId } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {}[];
  conf: {
    dataKey: string;
    color: string;
  }[];
}

export function AgeGroupByGender({ data, conf }: Props) {
  const chartId = useId();

  return (
    <ResponsiveContainer>
      <BarChart
        id={chartId}
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="auto" />
        <Tooltip />
        {conf.map((item) => {
          return <Bar dataKey={item.dataKey} barSize={10} fill={item.color} />;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
