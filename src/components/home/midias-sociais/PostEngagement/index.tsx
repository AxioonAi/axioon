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
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={pageData?.posts.slice(0, 10).map((post: any) => ({
          Curtidas: post.like,
          Comentários: post.commentCount,
          Sentimento: Number(post.sentiment.toFixed(2)),
          Compartilhamentos: post.shares,
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
        <Bar dataKey="Curtidas" stackId="a" fill="#22C24F" />
        <Bar dataKey="Comentários" stackId="a" fill="#DA3252" />
        <Bar dataKey="Sentimento" stackId="a" fill="#2F5CFC" />
        <Bar
          dataKey="Compartilhamentos"
          stackId="a"
          fill="#FFD712"
          barSize={windowWidth(768) ? 15 : 25}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
