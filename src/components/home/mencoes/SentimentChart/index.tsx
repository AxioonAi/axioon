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
    <SentimentContainer>
      <TitleWithBar
        content={title === undefined ? "Sentimentos" : title}
        barColor="#FC792F"
      />

      <ChartContainer>
        {total ? (
          <>
            <Positive percent={positivePercent} />
            <Negative percent={negativePercent} />
            <Neutral percent={neutralPercent} />
          </>
        ) : (
          <Positive percent="100%" />
        )}
      </ChartContainer>

      <div className="legends">
        <LegendContainer>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
          >
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                backgroundColor: "#22C24F",
                borderRadius: "50%",
              }}
            />
            <strong>{positive.toFixed(0)}</strong>
          </div>
          <span style={{ fontSize: "0.8rem", color: "#8790AB" }}>
            {legend1 === undefined ? "Positivos" : legend1}
          </span>
        </LegendContainer>
        <LegendContainer>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
          >
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                backgroundColor: "#EA2020",
                borderRadius: "50%",
              }}
            />
            <strong>{negative.toFixed(0)}</strong>
          </div>
          <span style={{ fontSize: "0.8rem", color: "#8790AB" }}>
            {legend2 === undefined ? "Negativos" : legend2}
          </span>
        </LegendContainer>
        <LegendContainer>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
          >
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                backgroundColor: "#FFB043",
                borderRadius: "50%",
              }}
            />
            <strong>{neutral.toFixed(0)}</strong>
          </div>
          <span style={{ fontSize: "0.8rem", color: "#8790AB" }}>
            {legend3 === undefined ? "Neutros" : legend3}
          </span>
        </LegendContainer>
      </div>
    </SentimentContainer>
  );
}
