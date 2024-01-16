import { TitleWithBar } from "@/components/Global/TitleWithBar";
import { Container } from "./styles";

interface Props {
  title?: string;
  value?: number | string;
  firstDate?: string;
  lastDate?: string;
  type?: string;
}

export function TotalQuotes({
  title,
  value,
  firstDate,
  lastDate,
  type,
}: Props) {
  return (
    <Container>
      <TitleWithBar
        content={title === undefined ? "Citações Totais" : title}
        barColor="#8FC96A"
      />
      <div style={{ marginLeft: "1.1rem", fontSize: "2.75rem" }}>
        <strong>
          {value === undefined || value === null ? "340.120" : value}
        </strong>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
          padding: "0 0.5rem",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "#8790AB" }}>
          {firstDate === undefined || firstDate === null
            ? "30/09/2022"
            : firstDate}
          - {!lastDate ? "Indefinido" : lastDate}
        </span>
        {type === "metaAds" ? (
          <></>
        ) : (
          <span style={{ fontSize: "0.7rem", color: "#8790AB" }}>
            <img src="/dashboard/arrow-up.svg" alt="" />
            <em style={{ color: "#22C24F", fontStyle: "normal" }}>+6.5%</em> de
            aumento desde o mês passado
          </span>
        )}
      </div>
    </Container>
  );
}
