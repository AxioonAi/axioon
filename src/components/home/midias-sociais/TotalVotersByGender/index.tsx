import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export function VotersByGender() {
  const data = [
    {
      gender: "Mulheres",
      value: 9000,
      color: "#B526B5",
    },
    {
      gender: "Homens",
      value: 3000,
      color: "#0075FF",
    },
  ];

  function maxValue() {
    let max = 0;
    data.forEach((item) => {
      if (item.value > max) {
        max = item.value;
      }
    });
    return max;
  }

  function nextDivisibleBy1000(value: number) {
    let quociente = Math.ceil(value / 1000);

    let proximoDivisivel = quociente * 1000;

    if (proximoDivisivel === value) {
      return proximoDivisivel + 1000;
    }

    return proximoDivisivel;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Cell />
        <XAxis dataKey="gender" />
        <YAxis
          AxisComp={Label}
          dataKey="value"
          type="number"
          domain={[0, nextDivisibleBy1000(maxValue())]}
        />
        <Tooltip formatter={(value, name) => [value, "Valor"]} />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
