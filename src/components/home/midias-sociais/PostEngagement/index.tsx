import { windowWidth } from "@/utils/windowWidth";
import Image from "next/image";
import React, { PureComponent, useEffect, useState } from "react";
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

interface pageData {
  pageData: any;
}

export function PostEngagement({ pageData }: pageData) {
  const data = [
    {
      likes: 4000,
      comments: 2400,
      sentiment: 2400,
      shares: 1620,
    },
  ];

  const [barSize, setBarSize] = useState(25);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={pageData?.posts.slice(0, 10).map((post: any) => ({
          likes: post.like,
          comments: post.commentCount,
          sentiment: post.sentiment,
          shares: post.shares,
        }))}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <YAxis />
        <XAxis
          tick={
            <img src="/axionLogo" style={{ width: "25px", height: "25px" }} />
          }
        />
        <Tooltip />
        <Bar
          dataKey="shares"
          stackId="a"
          fill="#FFD712"
          barSize={windowWidth(768) ? 15 : 25}
        />
        <Bar dataKey="sentiment" stackId="a" fill="#2F5CFC" />
        <Bar dataKey="comments" stackId="a" fill="#DA3252" />
        <Bar dataKey="likes" stackId="a" fill="#22C24F" />
      </BarChart>
    </ResponsiveContainer>
  );
}
