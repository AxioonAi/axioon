import React, { PureComponent, useEffect, useState, useId } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "16:00",
    Quantidade: 4000,
  },
  {
    name: "17:00",
    Quantidade: 3000,
  },
  {
    name: "21:00",
    Quantidade: 2000,
  },
  {
    name: "08:00",
    Quantidade: 2780,
  },
  {
    name: "10:00",
    Quantidade: 1890,
  },
];

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
        <Bar dataKey="Quantidade" barSize={14} fill="#22C24F" />
      </BarChart>
    </ResponsiveContainer>
  );
}
