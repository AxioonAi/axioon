import React, { useId } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  pageData: any;
}

export function VotersActive({ pageData }: Props) {
  const chartId = useId();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        id={chartId}
        layout="vertical"
        data={pageData?.commentsStatistics.commentTime.map((item: any) => ({
          name: item.name,
          Quantidade: item.value,
        }))}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="auto" />
        <Tooltip />
        <Bar dataKey="Quantidade" barSize={14} fill="#323452" />
      </BarChart>
    </ResponsiveContainer>
  );
}
