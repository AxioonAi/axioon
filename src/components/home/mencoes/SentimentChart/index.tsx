import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { formatNumberWithDot } from "@/utils/numberFormat";
import { useEffect, useState } from "react";
import {
  ChartContainer,
  LegendContainer,
  Negative,
  Neutral,
  Positive,
  SentimentContainer,
} from "./styles";

interface Props {
  positive: number;
  neutral: number;
  negative: number;
  title?: string;
  legend1?: string;
  legend2?: string;
  legend3?: string;
}

export function SentimentChart({
  positive,
  neutral,
  negative,
  title,
  legend1,
  legend2,
  legend3,
}: Props) {
  const [total, setTotal] = useState(0);
  const [positivePercent, setPositivePercent] = useState("");
  const [neutralPercent, setNeutralPercent] = useState("");
  const [negativePercent, setNegativePercent] = useState("");

  useEffect(() => {
    setTotal(positive + neutral + negative);
    setPositivePercent(((positive / total) * 100).toString() + "%");
    setNeutralPercent(((neutral / total) * 100).toString() + "%");
    setNegativePercent(((negative / total) * 100).toString() + "%");
  }, [total, positive, neutral, negative]);

  return (
    <div className="Container flex flex-col w-full p-2 rounded-lg bg-white">
      <TitleWithBar
        content={title === undefined ? "Sentimentos" : title}
        barColor="#FC792F"
      />

      <div className="chartContainer flex h-6 w-full mt-2 pl-4">
        {total ? (
          <>
            <div
              className="Positive bg-[#22C24F] rounded-l-md transition duration-500"
              style={{ width: positivePercent }}
            />
            <div
              className="Negative bg-[#EA2020] transition duration-500"
              style={{ width: negativePercent }}
            />
            <div
              className="Neutral bg-[#FFB043] rounded-r-md transition duration-500"
              style={{ width: neutralPercent }}
            />
          </>
        ) : (
          <Positive percent="100%" />
        )}
      </div>

      <div className="legends flex gap-12 m-2 self-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22C24F]" />
            <strong>{positive && positive.toFixed(0)}</strong>
          </div>
          <span className="text-sm text-[#8790AB]">
            {legend1 === undefined ? "Positivos" : legend1}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#EA2020]" />
            <strong>{negative && negative.toFixed(0)}</strong>
          </div>
          <span className="text-sm text-[#8790AB]">
            {legend2 === undefined ? "Negativos" : legend2}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FFB043]" />
            <strong>{neutral && neutral.toFixed(0)}</strong>
          </div>
          <span className="text-sm text-[#8790AB]">
            {legend3 === undefined ? "Neutros" : legend3}
          </span>
        </div>
      </div>
    </div>
  );
}
